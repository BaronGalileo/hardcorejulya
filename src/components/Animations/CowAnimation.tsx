import { Howl } from "howler";
import {
  AnimatedSprite,
  Application,
  Assets,
  Graphics,
  Sprite,
  Spritesheet,
} from "pixi.js";
import { useEffect } from "react";

export const CowAnimation = () => {
  useEffect(() => {
    let app: Application;
    let sprite: Sprite | AnimatedSprite;
    let mask: Graphics;

    const sound = new Howl({
      src: ["/assets/music/cow-chmyac.mp3"],
      volume: 0.5,
    });

    const initApp = async () => {
      const isMobile = window.innerWidth <= 740;

      app = new Application();
      await app.init({
        width: isMobile ? 200 : 400,
        height: isMobile ? 200 : 400,
        backgroundAlpha: 0,
      });

      if (isMobile) {
        app.stage.scale.set(0.8);
      }

      app.canvas.style.position = "absolute";
      app.canvas.style.top = "60px";
      app.canvas.style.left = "5%";
      app.canvas.style.borderRadius = "12px";
      app.canvas.style.boxShadow = "1px  4px 14px #9b8aec";

      const container = document.querySelector(".animation-cow");
      if (container) {
        container.appendChild(app.canvas);
      } else {
        console.error("Элемент с классом .logo-canvas не найден");
      }

      // ЗАГРУЗКА ПЕРВОГО КАДРА
      const firstTexture = await Assets.load("/icons/cow-01.png");
      sprite = new Sprite(firstTexture);
      app.stage.addChild(sprite);

      mask = new Graphics().roundRect(
        100,
        100,
        200,
        200,
        // firstTexture.width * 0.1,
        // firstTexture.height * 0.1,
        25
      ).fill(0xffffff)

      // app.stage.addChild(mask);

      updateLayout();
      const loadAllFrames = async () => {
        const jsonUrl = "/assets/cowEat.json";
        const jsonAtlas = await (await fetch(jsonUrl)).json();

        const textureAtlas = await Assets.load(jsonAtlas.meta.image);
        const spritesheet = new Spritesheet(textureAtlas, jsonAtlas);
        await spritesheet.parse();

        const animatedSpriteCow = new AnimatedSprite(
          spritesheet.animations.eat
        );
        animatedSpriteCow.animationSpeed = 0.2;
        animatedSpriteCow.play();

        app.stage.addChild(animatedSpriteCow);
        animatedSpriteCow.mask = mask;
        sprite = animatedSpriteCow;
        sprite.eventMode = "static";
        sprite.on("pointerover", () => {
          sound.play();
        });

        updateLayout();
      };

      loadAllFrames();
      window.addEventListener("resize", updateLayout);
    };

    const updateLayout = () => {
      if (!app || !sprite || !mask) return;

      const isMobile = window.innerWidth <= 740;
      const width = isMobile ? 200 : 400;
      const height = isMobile ? 200 : 400;

      app.renderer.resize(width, height);
      app.stage.scale.set(isMobile ? 1 : 1);

      const scale =
        sprite instanceof AnimatedSprite
          ? isMobile
            ? 0.5
            : 0.5
          : isMobile
          ? 0.5
          : 0.5;

      // sprite.scale.set(scale);
      sprite.scale.set(0.7, 0.7);
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
