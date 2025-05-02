import { gsap } from "gsap";
import { Howl } from "howler";
import {
  AnimatedSprite,
  Application,
  Assets,
  Container,
  Graphics,
  Sprite,
  Spritesheet,
  Text,
  TextStyle,
} from "pixi.js";
import { useEffect, useRef, useState } from "react";

export const CanvasLineAndCow = () => {
  const [scaleAnimations, setScaleAnimations] = useState<number>(0);
  const appRef = useRef<Application | null>(null);

  let app: Application;
  let spriteLine: Sprite | AnimatedSprite;
  let spriteCow: Sprite | AnimatedSprite;

  //Создание контейнера для canvas
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedText = useRef(false);
  const textContainerRef = useRef<Container | null>(null);

  const soundLine = new Howl({
    src: ["/assets/music/lion_roar.mp3"],
    volume: 0.5,
  });

  const soundCow = new Howl({
    src: ["/assets/music/cow-chmyac.mp3"],
    volume: 0.5,
  });

  const isMobile = window.innerWidth <= 740;
  const bigSize = window.innerWidth > 1500;
  const smallHeight = window.innerHeight <= 600;

  // Текстовая анимация
  const animateText = (app: Application) => {
    const message = "Будешь рычать от энергии или жевать от скуки?";
    const maxLineWidth = app.screen.width * 0.6;

    // Удаляем предыдущий контейнер, если он есть
    if (textContainerRef.current) {
      app.stage.removeChild(textContainerRef.current);
      textContainerRef.current.destroy({ children: true });
      textContainerRef.current = null;
    }

    const containerText = new Container();
    app.stage.addChild(containerText);
    textContainerRef.current = containerText;

    const style = new TextStyle({
      fontFamily: "Manege",
      fontSize: isMobile ? 20 : 44,
      fill: "#FFE373",
    });

    const words = message.split(" ");
    let lines: string[] = [];
    let currentLine = "";

    const tempText = new Text({ text: "", style });

    for (let word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      tempText.text = testLine;

      if (tempText.width < maxLineWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);

    let startY = 22;
    let delay = 0;

    lines.forEach((line) => {
      let x = app.screen.width / 2 - (line.length * (isMobile ? 10 : 20)) / 2;

      line.split("").forEach((char) => {
        const letter = new Text({ text: char, style });
        letter.alpha = 0;
        letter.x = x;
        letter.y = startY;
        containerText.addChild(letter);

        gsap.to(letter, {
          alpha: 1,
          delay,
          duration: 0.6,
        });

        delay += 0.05;
        x += letter.width;
      });

      startY += style.fontSize + 10;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if(window.innerHeight >= 600){
        if (window.innerWidth <= 1500 && window.innerWidth > 740) {
          setScaleAnimations(0.7);
        } else if (window.innerWidth <= 740 && window.innerWidth > 400) {
          setScaleAnimations(0.5);
        } else if (window.innerWidth <= 400) {
          setScaleAnimations(0.4);
        } else {
          setScaleAnimations(1);
        }
      } else {
        setScaleAnimations(0.3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          appRef.current &&
          !hasAnimatedText.current
        ) {
          animateText(appRef.current);
          hasAnimatedText.current = true;
        } else if (!entries[0].isIntersecting) {
          hasAnimatedText.current = false;
        }
      },
      { threshold: 0.1 }
    );

    if (canvasContainerRef.current) {
      observer.observe(canvasContainerRef.current);
    }

    const initApp = async () => {
      app = new Application();
      await app.init({
        width: window.innerWidth,
        height: bigSize && !smallHeight ? window.innerHeight - 270 : window.innerHeight / 2,
        backgroundAlpha: 0,
      });

      app.canvas.style.position = "absolute";
      app.canvas.style.top = isMobile ? "80px" : "54px";
      app.canvas.style.left = "0px";
      app.canvas.style.overflow = "auto";
      app.canvas.style.borderRadius = "12px";

      if (canvasContainerRef.current) {
        canvasContainerRef.current
          .querySelectorAll("canvas")
          .forEach((el) => el.remove());
        canvasContainerRef.current.appendChild(app.canvas);
      }
      appRef.current = app;

      // Львица

      const firstTexture = await Assets.load("/icons/line-01.png");
      spriteLine = new Sprite(firstTexture);
      spriteLine.scale.set(scaleAnimations);

      // Общие координаты
      const xLine = (app.screen.width / 2 - spriteLine.width) / 2;
      const yLine = (app.screen.height - spriteLine.height) / 2;

      spriteLine.x = xLine;
      spriteLine.y = yLine;

      app.stage.addChild(spriteLine);

      const jsonUrlLine = "/assets/lineSport.json";
      const jsonAtlasLine = await (await fetch(jsonUrlLine)).json();
      const textureAtlasLine = await Assets.load(jsonAtlasLine.meta.image);
      const spritesheetLine = new Spritesheet(textureAtlasLine, jsonAtlasLine);
      await spritesheetLine.parse();

      const animatedSpriteLine = new AnimatedSprite(
        spritesheetLine.animations.run
      );
      animatedSpriteLine.animationSpeed = 0.3;
      animatedSpriteLine.scale.set(scaleAnimations);
      animatedSpriteLine.x = xLine;
      animatedSpriteLine.y = yLine;
      animatedSpriteLine.play();

      app.stage.removeChild(spriteLine);
      spriteLine.destroy();
      spriteLine = animatedSpriteLine;

      app.stage.addChild(spriteLine);

      spriteLine.eventMode = "static";
      spriteLine.x = xLine;
      spriteLine.y = yLine;

      spriteLine.on("pointerover", () => {
        soundLine.play();
      });

      //Корова

      const firstTextureCow = await Assets.load("/icons/cow-01.png");
      spriteCow = new Sprite(firstTextureCow);
      spriteCow.scale.set(scaleAnimations);
      const spriteWidthCow = spriteCow.width;
      const spriteHeightCow = spriteCow.height;
      spriteLine.interactive = true;

      // Общие координаты
      let xCow =
        (app.screen.width - (app.screen.width / 2 + spriteWidthCow)) / 2 +
        app.screen.width / 2;
      let yCow = (app.screen.height - spriteHeightCow) / 2;

      spriteCow.x = xCow;
      spriteCow.y = yCow;
      app.stage.addChild(spriteCow);

      //Маска для коровы
      let mask = new Graphics()
        .roundRect(xCow, yCow, spriteWidthCow * 0.8, spriteHeightCow * 0.94, 50)
        .fill(0xffffff);
      spriteCow.mask = mask;

      const jsonUrlCow = "/assets/cowEat.json";
      const jsonAtlasCow = await (await fetch(jsonUrlCow)).json();
      const textureAtlasCow = await Assets.load(jsonAtlasCow.meta.image);
      const spritesheetCow = new Spritesheet(textureAtlasCow, jsonAtlasCow);
      await spritesheetCow.parse();

      const animatedSpriteCow = new AnimatedSprite(
        spritesheetCow.animations.eat
      );
      animatedSpriteCow.animationSpeed = 0.2;
      animatedSpriteCow.scale.set(scaleAnimations);
      animatedSpriteCow.x = xCow;
      animatedSpriteCow.y = yCow;
      animatedSpriteCow.play();

      app.stage.removeChild(spriteCow);
      spriteCow.destroy();
      spriteCow = animatedSpriteCow;

      app.stage.addChild(spriteCow);
      spriteCow.mask = mask;

      spriteCow.eventMode = "static";

      spriteCow.on("pointerover", () => {
        soundCow.play();
      });
    };
    initApp();

    return () => {
      observer.disconnect();
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        const oldCanvas = canvasContainerRef.current?.querySelector("canvas");
        oldCanvas?.remove();
        appRef.current = null;
      }
    };
  }, [scaleAnimations]);

  return <div className="canvas-animation" ref={canvasContainerRef} />;
};
