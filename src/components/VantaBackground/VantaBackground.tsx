import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CELLS from "vanta/dist/vanta.cells.min"; // ВАЖНО: импортируем нужный эффект напрямую

export const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      const effect = CELLS({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        color1: "#3016B0",
        color2: "#A68500",
        scale: 1.0,
        size: 2.0,
        speed: 2.0,
      });
      setVantaEffect(effect);
    }

    return () => {
      vantaEffect?.destroy?.();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="vanta-background"/>
  );
};