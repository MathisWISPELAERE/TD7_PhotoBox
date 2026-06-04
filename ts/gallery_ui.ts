import Handlebars from "handlebars";
import { GallerieData } from "./types/gallerie";
import { getPicture } from "./index";

const gallerySource = document.querySelector("#galleryTemplate")?.innerHTML ?? "";
const galleryTemplate = Handlebars.compile(gallerySource);

export function displayGallery(data: GallerieData): void {
  const zone = document.querySelector("#la_galerie");
  if (zone) {
    zone.innerHTML = galleryTemplate(data);
    zone.querySelectorAll("[data-photoid]").forEach((img) => {
      
      img.addEventListener("click", () => {
        const photoId = Number((img as HTMLElement).dataset.photoid);
        if (photoId) {
          getPicture(photoId)
        }
      });
    });
  }
}


