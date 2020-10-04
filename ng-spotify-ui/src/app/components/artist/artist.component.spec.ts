import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ArtistComponent } from './artist.component';
import { SpotifyService } from 'src/app/services/spotify.service';

const mockArtistId = '12345';

const mockArtistInfo: any = {
  external_urls: {
    spotify: 'https://open.spotify.com/artist/12345'
  },
  followers: {
    href: null,
    total: 100
  },
  genres: ['rock'],
  href: 'https://api.spotify.com/v1/artists/12345',
  id: '12345',
  images: [
    {
      height: 640,
      url: 'https://i.scdn.co/image/abc',
      width: 640
    }
  ],
  name: 'Some Artist',
  popularity: 1,
  type: 'artist',
  uri: 'spotify:artist:12345'
};

const mockAlbums: any = {
  href: 'https://api.spotify.com/v1/artists/12345',
  items: [
    {
      album_group: 'album',
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/12345'
          },
          href: 'https://api.spotify.com/v1/artists/12345',
          id: '12345',
          name: 'Some Artist',
          type: 'artist',
          uri: 'spotify:artist:12345'
        }
      ],
      available_markets: [],
      external_urls: {
        spotify: 'https://open.spotify.com/album/10001'
      },
      href: 'https://api.spotify.com/v1/albums/10001',
      id: '10001',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/abc',
          width: 640
        }
      ],
      name: 'Album 1',
      release_date: '2020-08-28',
      release_date_precision: 'day',
      total_tracks: 10,
      type: 'album',
      uri: 'spotify:album:10001'
    }
  ]
};

const mockMoreAlbums: any = {
  href: 'https://api.spotify.com/v1/artists/12345',
  items: [
    {
      album_group: 'album',
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/12345'
          },
          href: 'https://api.spotify.com/v1/artists/12345',
          id: '12345',
          name: 'Some Artist',
          type: 'artist',
          uri: 'spotify:artist:12345'
        }
      ],
      available_markets: [],
      external_urls: {
        spotify: 'https://open.spotify.com/album/10001'
      },
      href: 'https://api.spotify.com/v1/albums/10001',
      id: '10001',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/abc',
          width: 640
        }
      ],
      name: 'Album 2',
      release_date: '2018-02-10',
      release_date_precision: 'day',
      total_tracks: 11,
      type: 'album',
      uri: 'spotify:album:10001'
    }
  ]
};

const mockTopTracks: any = {
  tracks: [
    {
      album: {
        album_type: 'album',
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/12345'
            },
            href: 'https://api.spotify.com/v1/artists/12345',
            id: '12345',
            name: 'Some Artist',
            type: 'artist',
            uri: 'spotify:artist:12345'
          }
        ],
        external_urls: {
          spotify: 'https://open.spotify.com/album/12345'
        },
        href: 'https://api.spotify.com/v1/albums/12345',
        id: '12345',
        images: [
          {
            height: 640,
            url: 'https://i.scdn.co/image/abc',
            width: 640
          }
        ],
        name: 'Some Artist',
        release_date: '1991-08-12',
        release_date_precision: 'day',
        total_tracks: 12,
        type: 'album',
        uri: 'spotify:album:12345'
      },
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/12345'
          },
          href: 'https://api.spotify.com/v1/artists/12345',
          id: '12345',
          name: 'Some Artist',
          type: 'artist',
          uri: 'spotify:artist:12345'
        }
      ],
      disc_number: 1,
      duration_ms: 388733,
      explicit: false,
      external_ids: {
        isrc: 'USEE10001111'
      },
      external_urls: {
        spotify: 'https://open.spotify.com/track/238420932043'
      },
      href: 'https://api.spotify.com/v1/tracks/238420932043',
      id: '238420932043',
      is_local: false,
      is_playable: true,
      name: 'Top Track 1',
      popularity: 10,
      preview_url: 'https://p.scdn.co/mp3-preview/031093i2ieowmd',
      track_number: 1,
      type: 'track',
      uri: 'spotify:track:238420932043'
    }
  ]
};

const mockRelatedArtists: any = {
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/98765'
      },
      followers: {
        href: null,
        total: 50
      },
      genres: ['rock'],
      href: 'https://api.spotify.com/v1/artists/98765',
      id: '98765',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/abc',
          width: 640
        }
      ],
      name: 'Related Artist 1',
      popularity: 2,
      type: 'artist',
      uri: 'spotify:artist:98765'
    }
  ]
};

class MockSpotifyService {
  getArtistDetails = jasmine.createSpy();
  getAlbums = jasmine.createSpy();
}

class MockActivatedRoute {
  get paramMap() {
    return of({
      get: () => {
        return mockArtistId;
      }
    });
  }
}

describe('ArtistComponent', () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;
  let mockSpotifyService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: SpotifyService, useClass: MockSpotifyService }
      ]
    }).compileComponents();

    mockSpotifyService = TestBed.inject(SpotifyService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should get artist details', () => {
      mockSpotifyService.getArtistDetails.and.returnValue(
        of([mockArtistInfo, mockAlbums, mockTopTracks, mockRelatedArtists])
      );

      fixture.detectChanges();

      expect(component.artistId).toEqual(mockArtistId);
      expect(component.artistInfo).toEqual(mockArtistInfo);
      expect(component.albums).toEqual(mockAlbums.items);
      expect(component.topTracks).toEqual(mockTopTracks.tracks);
      expect(component.relatedArtists).toEqual(mockRelatedArtists.artists);
    });

    it('should show error', () => {
      mockSpotifyService.getArtistDetails.and.returnValue(throwError('Error getting details'));

      fixture.detectChanges();

      const paraEl: HTMLParagraphElement = fixture.debugElement.query(By.css('.alert-danger')).nativeElement;
      expect(paraEl.textContent).toContain('An error occurred while getting data');
    });
  });

  describe('viewMoreAlums', () => {
    it('should get and show more albums once', () => {
      mockSpotifyService.getAlbums.and.returnValue(of(mockMoreAlbums));

      component.viewMoreAlbums();
      component.viewMoreAlbums();

      expect(component.moreAlbums).toEqual(mockMoreAlbums.items);
      expect(component.showMoreAlbums).toBe(true);
      expect(mockSpotifyService.getAlbums).toHaveBeenCalledTimes(1);
    });

    it('should show error', () => {
      mockSpotifyService.getArtistDetails.and.returnValue(
        of([mockArtistInfo, mockAlbums, mockTopTracks, mockRelatedArtists])
      );
      mockSpotifyService.getAlbums.and.returnValue(throwError('Error getting albums'));

      component.viewMoreAlbums();
      fixture.detectChanges();

      const paraEl: HTMLParagraphElement = fixture.debugElement.query(By.css('.alert-danger')).nativeElement;
      expect(paraEl.textContent).toContain('An error occurred while getting data');
    });
  });

  describe('viewLessAlums', () => {
    it('should not show more albums', () => {
      mockSpotifyService.getAlbums.and.returnValue(of(mockMoreAlbums));

      component.viewMoreAlbums();
      component.viewLessAlbums();

      expect(component.moreAlbums).toEqual(mockMoreAlbums.items);
      expect(component.showMoreAlbums).toBe(false);
    });
  });
});
