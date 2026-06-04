import { loadPicture, loadResource } from "./photoloader";
import { displayPicture, displayCategorie, displayComments } from "./ui";
import { displayGallery } from "./gallery_ui";
import { load, next, prev, last, first } from "./gallery";
import { PhotoData } from "./types/photo";
import { CategorieData } from "./types/categorie";
import { CommentData } from "./types/commentaire";


// ─── Fonctions utilitaires de chargement de ressources liées ─────────────────

function loadCategory(photo: PhotoData): Promise<CategorieData> {
  return loadResource<CategorieData>(photo.links.categorie.href);
}

function loadComments(photo: PhotoData): Promise<CommentData> {
  return loadResource<CommentData>(photo.links.comments.href);
}

export function getPicture(id: number): void {
  let pictureData: PhotoData;
  loadPicture(id)
    .then((data: PhotoData): PhotoData => {
      pictureData = data;
      //console.log("Titre :", data.photo.titre);
      //console.log("Type  :", data.photo.type);
      //console.log("URL   :", data.photo.url.href);
      displayPicture(data);
      return data;
    })
    .then((data: PhotoData): Promise<CategorieData> => {
      return loadCategory(data);
    })
    .then((category: CategorieData): PhotoData => {
      displayCategorie(category);
      return pictureData;
    })
    .then((data: PhotoData): Promise<CommentData> => {
      return loadComments(data);
    })
    .then((comments: CommentData): void => {
      displayComments(comments);
    })
    .catch((err: unknown): void => {
      if (err instanceof Error) {
        console.log("Erreur : " + err.message);
      }
    });
}

const hash = window.location.hash.replace("#", "");
const id = hash ? parseInt(hash) : 105;
getPicture(id);

function showGallery(): void {
  load().then(displayGallery).catch((error)=>{console.error(error)});
}

const loadButton = document.querySelector("#charger_gallery");
if (loadButton) {
  loadButton.addEventListener("click", showGallery);
}

const nextButton = document.querySelector("#next");
if (nextButton) {
  nextButton.addEventListener("click", (): void => {
    next().then(displayGallery).catch((error)=>{console.error(error)});
  });
}

const prevButton = document.querySelector("#prev");
if (prevButton) {
  prevButton.addEventListener("click", (): void => {
    prev().then(displayGallery).catch((error)=>{console.error(error)});
  });
}

const firstButton = document.querySelector("#first");
if (firstButton) {
  firstButton.addEventListener("click", (): void => {
    first().then(displayGallery).catch((error)=>{console.error(error)});
  });
}

const lastButton = document.querySelector("#last");
if (lastButton) {
  lastButton.addEventListener("click", (): void => {
    last().then(displayGallery).catch((error)=>{console.error(error)});
  });
}
