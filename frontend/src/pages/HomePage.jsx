import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import SweetSlider from "../components/Carousel";

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
          x: (img.offsetLeft - imagesRef.current.offsetWidth / 2) * 0.2,
          y: (img.offsetTop - imagesRef.current.offsetHeight / 2) * 0.2,
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
    <motion.div className="bg-orange-100/10 "
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    >
      {/* header section */}
      <header className=" pt-16 relative min-h-screen flex flex-col items-center justify-center text-center ">
        {/* floating sweets */}
        <div
          ref={imagesRef}
          className="absolute inset-0 pointer-events-none z-0 overflow-y-hidden"
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
        <motion.div
          className="relative z-10 px-4 josefin -translate-y-20"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
        >
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
        </motion.div>
      </header>

      <SweetSlider />

     
    </motion.div>
  );
}

export default Home;
