import { AlbumArtist, AlbumImage } from './albums.model';

export interface Album {
  album_type: string;
  artists: AlbumArtist[];
  available_markets: string[];
  copyrights: AlbumCopyRights[];
  external_ids: {
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
  genres: string[];
  href: string;
  id: string;
  images: AlbumImage[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  tracks: {
    href: string;
    items: TrackItems[];
    limit: number;
    next: null;
    offset: number;
    previous: null;
    total: number;
  };
  type: string;
  uri: string;
}

interface AlbumCopyRights {
  text: string;
  type: string;
}

interface TrackItems {
  artists: TrackArtists[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface TrackArtists {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
