import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const imagesRef = useRef(null);
  const images = [
    {
      src: "/sweets/laddoos.png",
      alt: "laddu",
      className: "absolute top-20 left-12 w-60",
      from: { x: -200, y: 0 }, // from left
    },
    {
      src: "/sweets/barfi.png",
      alt: "barfi",
      className: "absolute top-10 right-10 w-68",
      from: { x: 200, y: 0 }, // from right
    },
    {
      src: "/sweets/jalebi.png",
      alt: "jalebi",
      className: "absolute bottom-10 left-36 w-60",
      from: { x: -200, y: 0 }, // from left
    },
    {
      src: "/sweets/rasgulla.png",
      alt: "rasgulla",
      className: "absolute bottom-10 right-36 w-72",
      from: { x: 200, y: 0 }, // from right
    },
    {
      src: "/sweets/kaju_katli.png",
      alt: "kaju_katli",
      className: "absolute -bottom-10 left-1/2 w-60 -translate-x-1/2",
      from: { y: 200 }, // from bottom
    },
  ];
  useEffect(() => {
    // Smooth scroll
    const lenis = new Lenis({ smooth: true, lerp: 0.08 });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Animate sweets
    if (imagesRef.current) {
      const images = imagesRef.current.querySelectorAll("img");
      images.forEach((img) => {
        gsap.to(img, {
          x: (img.offsetLeft - imagesRef.current.offsetWidth / 2) * 0.4,
          y: (img.offsetTop - imagesRef.current.offsetHeight / 2) * 0.4,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: imagesRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="bg-orange-100/10 ">
      {/* header section */}
      <header className=" pt-16 relative min-h-screen flex flex-col items-center justify-center text-center">
        {/* floating sweets */}
        <div
          ref={imagesRef}
          className="absolute inset-0 pointer-events-none z-0"
        >
          {images.map((img, i) => (
            <motion.img
              key={img.alt}
              src={img.src}
              alt={img.alt}
              className={img.className}
              
            />
          ))}
        </div>

        {/* main text */}
        <div className="relative z-10 px-4 josefin -translate-y-20">
          <h1 className="text-8xl  font-bold relative z-10 ">
            Welcome to
            <br />
            <p className="text-orange-500"> Kata Sweets</p>
          </h1>
          <p className="mt-4 text-2xl text-gray-600 relative z-10 ">
            Adding sweetness to your moments.
          </p>

          <button className="mt-2 px-6 py-3 bg-orange-500 text-white rounded-full text-lg font-semibold hover:bg-orange-600 transition cursor-pointer">
            Try Now
          </button>
        </div>
      </header>

      {/* content below to test scroll */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-lg leading-relaxed text-gray-700">
        <h2 className="text-3xl font-semibold mb-6">More Content</h2>
        <p className="mb-6">
          Scroll down to see the sweets slightly move & scale while you leave
          the header section.
        </p>
        {[...Array(8)].map((_, i) => (
          <p key={i} className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
            pariatur facilis facere mollitia delectus?
          </p>
        ))}
      </section>
    </div>
  );
}

export default Home;
