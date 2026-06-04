import { PhotoData } from "./types/photo";
import { GallerieData } from "./types/gallerie";
import { API } from "./config";

export function loadResource<T>(uri: string): Promise<T> {
  const url = API + uri;

  return fetch(url, { credentials: "include" })
    .then((response: Response): Promise<T> => {
      if (!response.ok) {
        return Promise.reject(new Error(response.statusText));
      }
      return response.json() as Promise<T>;
    })
    .catch((err: unknown): Promise<T> => {
      if (err instanceof Error) {
        console.log("Erreur fetch : " + err.message);
      }
      return Promise.reject(err);
    });
}

export function loadPicture(id: number): Promise<PhotoData> {
  return loadResource<PhotoData>(`/www/canals5/phox/api/photos/${id}`);
}

export function loadGallery(): Promise<GallerieData> {
  return loadResource<GallerieData>("/www/canals5/phox/api/photos");
}
