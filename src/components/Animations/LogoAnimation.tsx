import {
  AnimatedSprite,
  Application,
  Assets,
  Container,
  Spritesheet,
  Text,
  TextStyle
} from "pixi.js";
import { useEffect } from "react";

export const LogoAnimation = () => {

  let app: Application;
  let sprite: AnimatedSprite;
  let text: Text;
  let textContainer: Container;
  let tickerFn: () => void;


  useEffect(() => {


    const initApp = async () => {
      const isMobile = window.innerWidth <= 740;

      app = new Application();
      await app.init({
        width: isMobile ? 150 : 280,
        height: isMobile ? 54 : 80,
        backgroundAlpha: 0,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      });

      app.canvas.style.position = "absolute";
      app.canvas.style.top = "2px";
      app.canvas.style.left = "5%";
      app.canvas.style.borderRadius = "12px";


      const container = document.querySelector(".logo-canvas");
      if (container) {
        container.appendChild(app.canvas);
      } else {
        console.error("Элемент с классом .logo-canvas не найден");
      }

      //Logotip
      const jsonUrl = "/assets/spriteLogo.json";
      const jsonAtlas = await (await fetch(jsonUrl)).json();

      const textureAtlas = await Assets.load(jsonAtlas.meta.image);
      const spritesheet = new Spritesheet(textureAtlas, jsonAtlas);
      await spritesheet.parse();

      const animatedSpriteLogo = new AnimatedSprite(
        spritesheet.animations.icon
      );
      animatedSpriteLogo.animationSpeed = 0.6;
      animatedSpriteLogo.play();
      animatedSpriteLogo.setSize(isMobile? 52 : 78, isMobile? 52 : 78);
      app.stage.addChild(animatedSpriteLogo);

      //ТЕКСТ JULYA 
      const style = new TextStyle({
        fontFamily: "Brush Script MT, cursive",
        fontSize: isMobile ? 28 : 36,
        fill: "#FF69B4",
        align: "center",
        dropShadow: {
          color: "#000000",
          blur: 4,
          distance: 2,
        },
      });

      const text = new Text({
        text:"Julya",
        style
      });

      text.anchor.set(0.5);
      text.x = isMobile? 100 : 180;
      text.y = isMobile? 27 : 40;
      app.stage.addChild(text);

      let t = 0;

      textContainer = new Container();
      textContainer.addChild(text);
      app.stage.addChild(textContainer);

      tickerFn = () => {
        t += 0.1;
        const scale = 1 + Math.sin(t) * 0.05;
        textContainer.scale.set(scale, 1 / scale);
      };
      app.ticker.add(tickerFn);


    };
    initApp();
  }, []);
  return null;
};
