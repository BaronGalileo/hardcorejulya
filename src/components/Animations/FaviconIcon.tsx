
import { Application } from "pixi.js";

export const FaviconIcon = async () => {
  const app = new Application();

  await app.init({
    width: 32,
    height: 32,
    backgroundColor: 0x000000,
  });

  const link = document.head.querySelector("link[rel~='icon']")


console.log(app.canvas, link);

};