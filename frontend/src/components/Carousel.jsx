import Slider from "react-infinite-logo-slider";
import { GiDandelionFlower } from "react-icons/gi";

const SweetSlider = () => {
  const sweetNames = [
    "Ladoo",
    "Barfi",
    "Jalebi",
    "Rasgulla",
    "Gulab Jamun",
    "Kaju Katli",
    "Peda",
    "Halwa",
    "Ras Malai",
    "Sandesh",
  ];

  
  const sweetsWithSeparators = sweetNames.flatMap((sweet, idx) =>
    idx === sweetNames.length
      ? [sweet] 
      : [sweet, <GiDandelionFlower key={`flower-${idx}`} className="mx-6 text-white" />]
  );

  return (
    <div className="w-full bg-orange-500 text-black h-[100px] flex items-center justify-between z-20">
      <Slider
        width="120px"
        duration={40}
        pauseOnHover={true}
        blurBorders={false}
        blurBorderColor={"#fff"}
      >
        {sweetsWithSeparators.map((item, index) => (
          <Slider.Slide key={index}>
            <div className="flex items-center justify-center text-white text-2xl md:text-md font-semibold">
              {item}
            </div>
          </Slider.Slide>
        ))}
      </Slider>
    </div>
  );
};

export default SweetSlider;
