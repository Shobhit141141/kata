import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import SweetSlider from "../components/Carousel";
import { PiMouseScroll } from "react-icons/pi";
import { CiGrid41 } from "react-icons/ci";
import { MdInventory2 } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { FiArrowRightCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


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
      className: "absolute top-14 right-10 w-60",
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
      className: "absolute bottom-10 right-36 w-60",
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

  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-orange-100/10 "
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
          {images.map((img) => (
            <motion.img
              key={img.alt}
              src={img.src}
              alt={img.alt}
              className={img.className}
            />
          ))}
        </div>

        <PiMouseScroll className="absolute bottom-6 right-6 -translate-x-1/2 w-10 h-10 text-orange-500 animate-bounce text-xl " />
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

          <button className="mt-2 px-6 py-3 bg-orange-500 text-white rounded-full text-lg font-bold hover:bg-orange-600 transition cursor-pointer" onClick={() => navigate('/sweets')}>
            Try Now <FiArrowRightCircle className="inline-block ml-2 text-2xl -mt-1 -rotate-45" />
          </button>
        </motion.div>
      </header>

      <SweetSlider />

      <AnimatePresence>
        <div className="w-[90%] mx-auto my-20 text-center py-20 px-10 bg-white rounded-2xl shadow-lg">
          <h2 className="text-4xl font-bold mb-6">Features of platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "See, select, sort and filter",
                desc: "Explore an extensive selection of traditional and contemporary sweets from various regions.",
                icon: <CiGrid41 className="text-[50px]" />,
              },
              {
                title: "Inventory for Admin only",
                desc: "We use only the finest ingredients to ensure every bite is a delightful experience.",
                icon: <MdInventory2 className="text-[50px]" />,
              },
              {
                title: "Purchase using tokens",
                desc: "Personalize your sweet boxes for special occasions with our custom order options.",
                icon: <BiSolidPurchaseTag className="text-[50px]" />,
              },
              {
                title: "Sweets personalized quiz",
                desc: "Enjoy prompt delivery services to have your favorite sweets delivered fresh to your doorstep.",
                icon: <BsFillPatchQuestionFill className="text-[50px]" />,
              },
            ].map((feature, idx) => (
              <div
                key={feature.title}
                className="p-6 bg-orange-500 text-white rounded-lg shadow-sm hover:shadow-md transition"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
              <div className="mb-4 flex justify-center">
                  {feature.icon}
              </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatePresence>



      <div className="try-quiz mb-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Not sure what to choose?</h2>
        <p className="text-lg mb-6">
          Take our fun and interactive quiz to find your perfect sweet match!
        </p>

        <button className="px-6 py-3 bg-orange-500 text-white rounded-full text-lg font-semibold hover:bg-orange-600 transition cursor-pointer" onClick={() => navigate('/quiz')}>
          Take the Quiz <FiArrowRightCircle className="inline-block ml-2 text-2xl -mt-1 -rotate-45" />
        </button>
      </div>
    </motion.div>



  );
}

export default Home;
