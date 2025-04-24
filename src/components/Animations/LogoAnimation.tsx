import {
  AnimatedSprite,
  Application,
  Assets,
  Graphics,
  Sprite,
  Spritesheet,
} from "pixi.js";
import { useEffect } from "react";

export const LogoAnimation = () => {
  useEffect(() => {
    let app: Application;
    let sprite: Sprite | AnimatedSprite;
    let mask: Graphics;

    const initApp = async () => {
      const isMobile = window.innerWidth <= 740;

      app = new Application();
      await app.init({
        width: isMobile ? 52 : 78,
        height: isMobile ? 52 : 78,
        backgroundAlpha: 0,
      });

      if (isMobile) {
        app.stage.scale.set(0.8);
      }

      app.canvas.style.position = "absolute";
      app.canvas.style.top = "2px";
      app.canvas.style.left = "5%";
      app.canvas.style.borderRadius = "12px";
      app.canvas.style.boxShadow = "1px  4px 14px #9b8aec";

      const container = document.querySelector(".logo-canvas");
      if (container) {
        container.appendChild(app.canvas);
      } else {
        console.error("Элемент с классом .logo-canvas не найден");
      }

      // ЗАГРУЗКА ПЕРВОГО КАДРА
      const firstTexture = await Assets.load("/icons/icon1.png");
      sprite = new Sprite(firstTexture);
      app.stage.addChild(sprite);

      // Маска
      mask = new Graphics()
        .fill(0xffffff)
        .roundRect(
          0,
          0,
          firstTexture.width * 0.1,
          firstTexture.height * 0.1,
          25
        );

      app.stage.addChild(mask);
      updateLayout();
      const loadAllFrames = async () => {
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

        app.stage.addChild(animatedSpriteLogo);
        sprite.visible = false; // вместо removeChild
        sprite = animatedSpriteLogo;
        updateLayout();
      };

      loadAllFrames()
      window.addEventListener("resize", updateLayout);
    };

    const updateLayout = () => {
      if (!app || !sprite || !mask) return;

      const isMobile = window.innerWidth <= 740;
      const width = isMobile ? 52 : 78;
      const height = isMobile ? 52 : 78;

      app.renderer.resize(width, height);
      app.stage.scale.set(isMobile ? 0.8 : 1);

      const scale =
        sprite instanceof AnimatedSprite
          ? isMobile
            ? 0.12
            : 0.13
          : isMobile
          ? 0.11
          : 0.12;

      sprite.scale.set(scale);
      sprite.x = isMobile
        ? (app.renderer.width - sprite.width) / 5
        : (app.renderer.width - sprite.width) / 2;
      sprite.y = isMobile
        ? (app.renderer.height - sprite.height) / 5
        : (app.renderer.height - sprite.height) / 2;

      mask.x = sprite.x - sprite.width / 2;
      mask.y = sprite.y - sprite.height / 2;
    };

    initApp();

    return () => {
      window.removeEventListener("resize", updateLayout);
      app?.destroy(true, { children: true });
    };
  }, []);

  return null;
};
