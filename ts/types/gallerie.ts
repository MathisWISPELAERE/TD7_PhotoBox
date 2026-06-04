export interface GallerieData {
  type: string;
  count: number;
  size: number;
  links: {
    next?: { href: string };
    prev?: { href: string };
    first?: { href: string };
    last?: { href: string };
  };
  photos: Array<{
    photo: {
      id: number;
      titre: string;
      file: string;
      thumbnail: { href: string };
      original: { href: string };
    };
    links: {
      self: { href: string };
    };
  }>;
}
