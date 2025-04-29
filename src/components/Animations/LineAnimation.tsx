import {
  AnimatedSprite,
  Application,
  Assets,
  Graphics,
  Spritesheet,
  Texture,
  TilingSprite,
} from "pixi.js";
import { useEffect } from "react";

export const LineAnimation = () => {
  useEffect(() => {
    let app: Application;
    let sprite: AnimatedSprite;
    let groundTexture: Texture;
    let groundSprite: TilingSprite;
    let maskShape: Graphics;

    let targetSpeed = 0.5;
    let speed = 0.3;
    const baseSpeed = 0.3;
    const fastSpeed = 0.66;
    const smoothing = 0.01;

    const sound = new Howl({
      src: ["/assets/music/lion_roar.mp3"],
      volume: 0.5,
    });

    const initApp = async () => {
      const app = new Application();
      await app.init({
        width: 300,
        height: 300,
        backgroundAlpha: 0,
      });
      app.canvas.style.position = "absolute";
      app.canvas.style.top = "55px";
      app.canvas.style.right = "5%";
      app.canvas.style.borderRadius = "12px";

      const container = document.querySelector(".animation-line");
      if (container) {
        container.appendChild(app.canvas);
      } else {
        console.error("Элемент с классом .animation-line не найден");
      }

      // Земля
      groundTexture = await Assets.load("/icons/road.png");
      groundSprite = TilingSprite.from(groundTexture, {
        width: app.screen.width,
        height: app.screen.height / 2,
      });
      app.stage.addChild(groundSprite);

      groundSprite.y = 200;
      const r = 10; 

      const maskShape = new Graphics()
        .moveTo(130 + r, 50)                                // старт чуть правее
        .quadraticCurveTo(200, 30, 270 - r, 50)             // верхняя дуга
      
        .quadraticCurveTo(270, 50, 270, 50 + r)             // правый верхний угол
        .lineTo(270, 180 - r)                               // правая боковая
        .quadraticCurveTo(300, 180, 300 - r, 180)           // правый нижний угол
      
        .quadraticCurveTo(200, 170, 100 + r, 180)           // нижняя дуга
      
        .quadraticCurveTo(130, 180, 130, 180 - r)           // левый нижний угол
        .lineTo(100, 50 + r)                                // левая боковая
        .quadraticCurveTo(130, 50, 130 + r, 50)             // левый верхний угол
      
        .fill(0xffffff);
      // const maskShape = new Graphics()
      //   .moveTo(130, 50)
      //   .quadraticCurveTo(200, 30, 270, 50) // верхняя линия с закруглением
      //   .lineTo(300, 180)
      //   .quadraticCurveTo(200, 170, 100, 180) // нижняя линия с закруглением
      //   .closePath()
      //   .fill(0xffffff);

      maskShape.y = 220;
      app.stage.addChild(maskShape);
      groundSprite.mask = maskShape;

      // анимация
      const jsonUrl = "/assets/lineSport.json";
      const jsonAtlas = await (await fetch(jsonUrl)).json();
      const textureAtlas = await Assets.load(jsonAtlas.meta.image);
      const spritesheet = new Spritesheet(textureAtlas, jsonAtlas);
      await spritesheet.parse();
      const animatedSpriteLine = new AnimatedSprite(spritesheet.animations.run);
      animatedSpriteLine.animationSpeed = 0.3;
      animatedSpriteLine.play();
      app.stage.addChild(animatedSpriteLine);

      animatedSpriteLine.scale.set(0.5);
      animatedSpriteLine.x = 80;
      animatedSpriteLine.y = 0;
      animatedSpriteLine.eventMode = "static";

      animatedSpriteLine.on("pointerover", () => {
        sound.play();
        targetSpeed = fastSpeed;
      });

      animatedSpriteLine.on("pointerout", () => {
        targetSpeed = baseSpeed;
      });

      app.ticker.add(() => {
        if (groundSprite) {
          // Плавное приближение
          speed += (targetSpeed - speed) * smoothing;

          groundSprite.tilePosition.y -= speed;
          groundSprite.tileScale.y = 0.13;
        }

        if (animatedSpriteLine) {
          animatedSpriteLine.animationSpeed = speed;
        }
      });
    };

    initApp();
  }, []);

  return null;
};
