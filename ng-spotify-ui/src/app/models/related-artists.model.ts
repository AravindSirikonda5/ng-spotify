export interface RelatedArtists {
  artists: RelatedArtist[];
}

export interface RelatedArtist {
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
  images: RelatedArtistImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface RelatedArtistImage {
  height: number;
  url: string;
  width: number;
}
