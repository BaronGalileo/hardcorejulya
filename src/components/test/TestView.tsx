import {
  AnimatedSprite,
  Application,
  Assets,
  Graphics,
  Texture
} from "pixi.js";
import { useEffect } from "react";

export const TestView = () => {
  useEffect(() => {
    const initApp = async () => {
      const app = new Application();
      await app.init({
        width: 78,
        height: 78,
        backgroundAlpha: 0,
      });

      // Стили канваса
      app.canvas.style.position = "absolute";
      app.canvas.style.top = "1px";
      app.canvas.style.left = "5%";
      app.canvas.style.borderRadius = "12px";
      app.canvas.style.boxShadow ="1px  4px 14px #9b8aec";

      const container = document.querySelector(".logo-canvas");
      if (container) {
        container.appendChild(app.canvas);
      } else {
        console.error("Элемент с классом .header-wrapper не найден");
      }

      // Загружаем текстуры
      const frameCount = 88;
      const textures: Texture[] = [];
      for (let i = 1; i <= frameCount; i++) {
        const url = `./icons/icon${i}.png`;
        const texture = await Assets.load(url);
        textures.push(texture);
      }

      const frameWidth = textures[0].width;
      const frameHeight = textures[0].height;

      const sprite = new AnimatedSprite(textures);
      sprite.scale.set(0.13); 
      sprite.x = (app.renderer.width - sprite.width) / 2;
      sprite.y = (app.renderer.height - sprite.height) / 2;

      const mask = new Graphics()
        .fill(0xffffff)
        .roundRect(0, 0, frameWidth * 0.1, frameHeight * 0.1, 25);

      mask.x = sprite.x - sprite.width / 2;
      mask.y = sprite.y - sprite.height / 2;


      app.stage.addChild(mask);
      app.stage.addChild(sprite);
      sprite.animationSpeed = 0.6;
      sprite.play();
    };

    initApp();
  }, []);

  return null;;
};
