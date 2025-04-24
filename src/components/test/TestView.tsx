
export const TestView = () => {
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

  return null;
};