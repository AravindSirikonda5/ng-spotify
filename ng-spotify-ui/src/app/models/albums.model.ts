export interface Albums {
  href: string;
  items: AlbumItem[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface AlbumItem {
  album_group: string;
  album_type: string;
  artists: AlbumArtist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: AlbumImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface AlbumArtist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface AlbumImage {
  height: number;
  url: string;
  width: number;
}
