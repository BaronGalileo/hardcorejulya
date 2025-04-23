// import { motion } from "framer-motion";
// import React, { useEffect, useState } from "react";

// type Slide = {
//   image: string;
//   text: string;
//   context: string;
// };

// type SliderProps = {
//   slides: Slide[];
//   interval?: number;
// };

// const ImageSlider: React.FC<SliderProps> = ({ slides, interval = 5000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? slides.length - 1 : prev - 1
//     );
//   };

//   useEffect(() => {
//     const timer = setInterval(nextSlide, interval);
//     return () => clearInterval(timer);
//   }, [currentIndex, interval]);

//   return (
//     <div className="image-slider-wrapper">
//     <motion.div
//       key={slides[currentIndex].image}
//       className="slide-background"
//       style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
//       // initial={{ 
//       //   opacity: 0,
//       //   scale: 0.3,
//       //  }}
//       // animate={{ 
//       //   opacity: 1,
//       //   scale: 1,
//       //  }}
//       // transition={{ duration: 0.1 }}
//     />
//   {/* </AnimatePresence> */}

//   <div className="text-wrapper"
//     key={slides[currentIndex].text}>
//       <motion.h1
//         className="slide-label"
//         initial={{
//           scale: 0.3,
//           y: "-200%",
//           opacity: 0,
//         }}
//         animate={{
//           scale: 1,
//           y: "0%",
//           opacity: 1,
//         }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//       >
//         {slides[currentIndex].text}
//       </motion.h1>
//       <motion.p
//         className="slide-text"
//           initial={{
//             scale: 0.3,
//             y: "200%",
//             opacity: 0,
//           }}
//           animate={{
//             scale: 1,
//             y: "0%",
//             opacity: 1,
//           }}
//           transition={{ duration: 0.8, delay: 0.8 }}
//         >{slides[currentIndex].context}
//       </motion.p>
//   </div>

//   <button onClick={prevSlide} className="slider-btn slider-btn-left">
//     &lt;
//   </button>
//   <button onClick={nextSlide} className="slider-btn slider-btn-right">
//     &gt;
//   </button>
// </div>
// );
// };

// export default ImageSlider;

import { Application, Graphics } from "pixi.js";
import { useEffect, useRef } from "react";

const ElectricLines = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new Application();

    app
      .init({
        resizeTo: canvasRef.current,
        backgroundAlpha: 0,
      })
      .then(() => {
        canvasRef.current?.appendChild(app.canvas);

        const center = {
          x: app.screen.width / 2,
          y: app.screen.height / 2,
        };

        for (let i = 0; i < 20; i++) {
          const line = new Graphics();

          line.stroke({
            width: 2,
            color: 0x00ffff,
            alpha: 0.6,
          });

          line.moveTo(center.x, center.y);

          const angle = Math.random() * Math.PI * 2;
          const radius = 150 + Math.random() * 50;
          const endX = center.x + Math.cos(angle) * radius;
          const endY = center.y + Math.sin(angle) * radius;

          line.lineTo(endX, endY);

          app.stage.addChild(line);
        }
      })
      .catch((err) => {
        console.error("Pixi init failed:", err);
      });

    return () => {
      app.destroy(true);
    };
  }, []);

  return <div ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
};

export default ElectricLines;