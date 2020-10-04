export interface TopTracks {
  tracks: TopTrack[];
}

export interface TopTrack {
  album: {
    album_type: string;
    artists: TopTrackArtist[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: TopTrackImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: TopTrackArtist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface TopTrackArtist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface TopTrackImage {
  height: number;
  url: string;
  width: number;
}
