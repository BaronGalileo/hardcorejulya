import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

type Slide = {
  image: string;
  text: string;
  context: string;
};

type SliderProps = {
  slides: Slide[];
  interval?: number;
};

export const SliderWithBackground: React.FC<SliderProps> = ({
  slides,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [currentIndex, interval]);

  return (
    <div className="image-slider-wrapper">
      <motion.div
        key={slides[currentIndex].image}
        className="slide-background"
        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
      />
      <div className="text-wrapper" key={slides[currentIndex].text}>
        <motion.h1
          className="slide-label"
          initial={{
            scale: 0.3,
            y: "-200%",
            opacity: 0,
          }}
          animate={{
            scale: 1,
            y: "0%",
            opacity: 1,
          }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {slides[currentIndex].text}
        </motion.h1>
        <motion.p
          className="slide-text"
          initial={{
            scale: 0.3,
            y: "200%",
            opacity: 0,
          }}
          animate={{
            scale: 1,
            y: "0%",
            opacity: 1,
          }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {slides[currentIndex].context}
        </motion.p>
      </div>

      <button onClick={prevSlide} className="slider-btn slider-btn-left"><span className="symbol">&lt;</span></button>
      <button onClick={nextSlide} className="slider-btn slider-btn-right"><span className="symbol">&gt;</span></button>
    </div>
  );
};
