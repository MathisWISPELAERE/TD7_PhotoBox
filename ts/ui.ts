import Handlebars from "handlebars";
import { PhotoData } from "./types/photo";
import { CategorieData } from "./types/categorie";
import { CommentData } from "./types/commentaire";

const pictureSource = document.querySelector("#pictureTemplate")?.innerHTML ?? "";
const pictureTemplate = Handlebars.compile(pictureSource);

export function displayPicture(data: PhotoData): void {
  const zone = document.querySelector("#la_photo");
  if (zone) {
    zone.innerHTML = pictureTemplate(data);
  }
}

export function displayCategorie(data: CategorieData): void {
  const zone = document.querySelector("#la_categorie");
  if (zone) {
    zone.innerHTML = `<h3>Catégorie</h3><p>${data.categorie.nom}</p>`;
  }
}

export function displayComments(data: CommentData): void {
  const ul = document.querySelector("#les_commentaires");
  if (!ul) return;
  ul.innerHTML = "";
  data.comments.forEach((comment) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${comment.pseudo}</strong> : ${comment.content}`;
    ul.appendChild(li);
  });
}
