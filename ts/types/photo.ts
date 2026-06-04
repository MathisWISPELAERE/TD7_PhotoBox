export interface PhotoData {
  type: string;
  photo: {
    id: number;
    titre: string;
    file: string;
    descr: string;
    format: string;
    type: string;
    size: number;
    width: number;
    height: number;
    url: {
      href: string;
    };
  };
  links: {
    categorie: {
      href: string;
    };
    comments: {
      href: string;
    };
  };
}
