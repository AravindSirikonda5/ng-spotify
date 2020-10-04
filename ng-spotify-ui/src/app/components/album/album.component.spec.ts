import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AlbumComponent } from './album.component';
import { SpotifyService } from 'src/app/services/spotify.service';

const mockAlbumId = 'albumId123';

const mockAlbum: any = {
  album_type: 'album',
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/111'
      },
      href: 'https://api.spotify.com/v1/artists/111',
      id: '111',
      name: 'Some Artist',
      type: 'artist',
      uri: 'spotify:artist:111'
    }
  ],
  available_markets: [],
  copyrights: [
    {
      text: 'Copyrights.',
      type: 'P'
    }
  ],
  external_ids: {
    upc: '123456'
  },
  external_urls: {
    spotify: 'https://open.spotify.com/album/123456'
  },
  genres: [],
  href: 'https://api.spotify.com/v1/albums/123456',
  id: '123456',
  images: [
    {
      height: 640,
      url: 'https://i.scdn.co/image/abc',
      width: 640
    }
  ],
  label: 'Label 1',
  name: 'Album 1',
  popularity: 10,
  release_date: '2014-11-28',
  release_date_precision: 'day',
  total_tracks: 1,
  tracks: {
    href: 'https://api.spotify.com/v1/albums/023eodwwmmdl/tracks?offset=0&limit=50',
    items: [
      {
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/444'
            },
            href: 'https://api.spotify.com/v1/artists/444',
            id: '444',
            name: 'Some Artist',
            type: 'artist',
            uri: 'spotify:artist:444'
          }
        ],
        available_markets: [],
        disc_number: 1,
        duration_ms: 1153,
        explicit: false,
        external_urls: {
          spotify: 'https://open.spotify.com/track/111'
        },
        href: 'https://api.spotify.com/v1/tracks/111',
        id: '111',
        is_local: false,
        name: 'Song 1',
        preview_url: 'https://p.scdn.co/mp3-preview/123',
        track_number: 1,
        type: 'track',
        uri: 'spotify:track:111'
      }
    ]
  }
};

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: () => {
        return mockAlbumId;
      }
    }
  };
}

class MockSpotifyService {
  getAlbum = jasmine.createSpy();
}

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let mockSpotifyService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: SpotifyService, useClass: MockSpotifyService }
      ]
    }).compileComponents();

    mockSpotifyService = TestBed.inject(SpotifyService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
  });

  it('should get album', () => {
    mockSpotifyService.getAlbum.and.returnValue(of(mockAlbum));

    fixture.detectChanges();

    expect(component.album).toEqual(mockAlbum);
  });

  it('should show error', () => {
    mockSpotifyService.getAlbum.and.returnValue(throwError('Error getting album'));

    fixture.detectChanges();

    const paraEl: HTMLParagraphElement = fixture.debugElement.query(By.css('.alert-danger')).nativeElement;
    expect(paraEl.textContent).toContain('An error occurred while getting album data');
  });
});
