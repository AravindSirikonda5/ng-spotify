export interface Artists {
  artists: Artist;
}

export interface Artist {
  href: string;
  items: ArtistInfo[];
  limit: number;
  next: string;
  offset: number;
  previous: number;
  total: number;
}

export interface ArtistInfo {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: ArtistImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface ArtistImage {
  height: number;
  url: string;
  width: number;
}
