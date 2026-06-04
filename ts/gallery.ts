import { GallerieData } from "./types/gallerie";
import { loadGallery, loadResource } from "./photoloader";

let actuel: GallerieData;

function storeGallery(data: GallerieData): GallerieData {
  actuel = data;
  return data;
}

export function load(): Promise<GallerieData> {
  return loadGallery().then(storeGallery);
}

export function next(): Promise<GallerieData> {
  if (!actuel.links.next) {
    return Promise.reject(new Error("Pas de page suivante"));
  }
  return loadResource<GallerieData>(actuel.links.next.href).then(storeGallery);
}

export function prev(): Promise<GallerieData> {
  if (!actuel.links.prev) {
    return Promise.reject(new Error("Pas de page précédente"));
  }
  return loadResource<GallerieData>(actuel.links.prev.href).then(storeGallery);
}

export function first(): Promise<GallerieData> {
  if (!actuel.links.first) {
    return Promise.reject(new Error("Pas de première page"));
  }
  return loadResource<GallerieData>(actuel.links.first.href).then(storeGallery);
}

export function last(): Promise<GallerieData> {
  if (!actuel.links.last) {
    return Promise.reject(new Error("Pas de dernière page"));
  }
  return loadResource<GallerieData>(actuel.links.last.href).then(storeGallery);
}

export function current(): GallerieData {
  return actuel;
}
