import { Howl } from "howler";
import {
  AnimatedSprite,
  Application,
  Assets,
  Graphics,
  Sprite,
  Spritesheet,
  Texture,
  TilingSprite,
} from "pixi.js";
import { useEffect } from "react";

export const LineAnimation = () => {
  useEffect(() => {
    let app: Application;
    let sprite: Sprite | AnimatedSprite;
    let mask: Graphics;
    let maskRoad: Graphics;

    let groundTexture: Texture;
    let groundSprite: TilingSprite;

    const sound = new Howl({
      src: ["/assets/music/lion_roar.mp3"],
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
      app.canvas.style.right = "5%";
      app.canvas.style.borderRadius = "12px";
      app.canvas.style.boxShadow = "1px  4px 14px #9b8aec";

      const container = document.querySelector(".animation-line");
      if (container) {
        container.appendChild(app.canvas);
      } else {
        console.error("Элемент с классом .logo-canvas не найден");
      }

      groundTexture = await Assets.load("/icons/road.png"); // сюда путь к текстуре земли
      groundSprite = TilingSprite.from(groundTexture, {
        width: app.screen.width,
        height: app.screen.height,
      });
      app.stage.addChild(groundSprite);

      // ЗАГРУЗКА ПЕРВОГО КАДРА
      const firstTexture = await Assets.load("/icons/line-01.png");
      sprite = new Sprite(firstTexture);
      app.stage.addChild(sprite);


      mask = new Graphics()
        .fill(0x808080)
        .roundRect(
          0,
          0,
          firstTexture.width * 0.1,
          firstTexture.height * 0.1,
          25
        );

      const maskRoad = new Graphics();
      app.stage.addChild(maskRoad);

      app.stage.addChild(mask);
      updateLayout();
      const loadAllFrames = async () => {
        const jsonUrl = "/assets/LineTex.json";
        const jsonAtlas = await (await fetch(jsonUrl)).json();

        const textureAtlas = await Assets.load(jsonAtlas.meta.image);
        const spritesheet = new Spritesheet(textureAtlas, jsonAtlas);
        await spritesheet.parse();

        const animatedSpriteLogo = new AnimatedSprite(
          spritesheet.animations.run
        );
        animatedSpriteLogo.animationSpeed = 0.25;
        animatedSpriteLogo.play();

        app.stage.addChild(animatedSpriteLogo);
        sprite = animatedSpriteLogo;
        sprite.eventMode = "static";
        sprite.on("pointerover", () => {
          sound.play();
        });

        updateLayout();
      };

      loadAllFrames();

      app.ticker.add(() => {
        if (groundSprite) {
          groundSprite.tilePosition.y += 2; // скорость движения земли (подбирай под львицу)
          updateMask(); // обновляем маску с каждым тиком
        }
      });

      const updateMask = () => {
        if (!groundSprite || !maskRoad) return;
  
        const screenHeight = app.screen.height;
        const screenWidth = app.screen.width;
        const perspectiveFactor = groundSprite.tilePosition.y / screenHeight;
        groundSprite.mask = maskRoad;
  
        // Очищаем старую маску
        maskRoad.clear();
  
        // Рисуем трапецию, которая будет сужаться к горизонту
        // maskRoad.fill(0x808080);
        maskRoad.fillStyle = 0x808080;
        // Левый нижний угол
        maskRoad.moveTo(0, screenHeight);
        // Левый верхний угол (будет сужаться)
        maskRoad.lineTo(screenWidth * 0.1, screenHeight * (1 - perspectiveFactor));
        // Правый верхний угол (будет сужаться)
        maskRoad.lineTo(screenWidth * 0.9, screenHeight * (1 - perspectiveFactor));
        // Правый нижний угол
        maskRoad.lineTo(screenWidth, screenHeight);
  
        maskRoad.closePath();
  
        // Применяем маску к спрайту дороги
    
      };
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

// export const TestView = () => {
// useEffect(() => {
//   let app: Application;
//   let sprite: AnimatedSprite;
//   let mask: Graphics;

//   const initApp = async () => {
//     const isMobile = window.innerWidth <= 740;

//     app = new Application();
//     await app.init({
//       width: isMobile ? 52 : 78,
//       height: isMobile ? 52 : 78,
//       backgroundAlpha: 0,
//     });

//     if (isMobile) {
//       app.stage.scale.set(0.8);
//     }

//     app.canvas.style.position = "absolute";
//     app.canvas.style.top = "2px";
//     app.canvas.style.left = "5%";
//     app.canvas.style.borderRadius = "12px";
//     app.canvas.style.boxShadow = "1px  4px 14px #9b8aec";

//     const container = document.querySelector(".logo-canvas");
//     if (container) {
//       container.appendChild(app.canvas);
//     } else {
//       console.error("Элемент с классом .logo-canvas не найден");
//     }

//     const frameCount = 88;
//     const textures: Texture[] = [];
//     for (let i = 1; i <= frameCount; i++) {
//       const url = `./icons/icon${i}.png`;
//       const texture = await Assets.load(url);
//       textures.push(texture);
//     }

//     sprite = new AnimatedSprite(textures);
//     sprite.animationSpeed = 0.6;
//     sprite.play();

//     mask = new Graphics().fill(0xffffff).roundRect(0, 0, textures[0].width * 0.1, textures[0].height * 0.1, 25);

//     app.stage.addChild(mask);
//     app.stage.addChild(sprite);

//     updateLayout();

//     window.addEventListener("resize", updateLayout);
//   };

//   const updateLayout = () => {
//     const isMobile = window.innerWidth <= 768;

//     const width = isMobile ? 52 : 78;
//     const height = isMobile ? 52 : 78;

//     app.renderer.resize(width, height);
//     app.stage.scale.set(isMobile ? 0.8 : 1);

//     sprite.scale.set(isMobile ? 0.12 : 0.13);
//     sprite.x = isMobile ? (app.renderer.width - sprite.width) / 5 : (app.renderer.width - sprite.width) / 2;
//     sprite.y = isMobile ? (app.renderer.height - sprite.height) / 5 : (app.renderer.height - sprite.height) / 2;

//     mask.x = sprite.x - sprite.width / 2;
//     mask.y = sprite.y - sprite.height / 2;
//   };

//   initApp();

//   return () => {
//     window.removeEventListener("resize", updateLayout);
//     app?.destroy(true, { children: true });
//   };
// }, []);

//   return null;
// };
