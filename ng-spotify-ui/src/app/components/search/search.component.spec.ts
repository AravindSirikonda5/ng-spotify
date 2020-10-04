import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SearchComponent } from './search.component';
import { SpotifyService } from './../../services/spotify.service';

const mockArtists: any = {
  artists: {
    href: 'https://api.spotify.com/v1/search?query=SomeArtist&type=artist&offset=0&limit=1',
    items: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/abcdef'
        },
        followers: {
          href: null,
          total: 1
        },
        genres: ['rock'],
        href: 'https://api.spotify.com/v1/artists/abcdef',
        id: 'abcdef',
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
        uri: 'spotify:artist:abcdef'
      }
    ],
    limit: 1,
    next: 'https://api.spotify.com/v1/search?query=SomeArtist&type=artist&offset=1&limit=1',
    offset: 0,
    previous: null,
    total: 1
  }
};

class MockSpotifyService {
  getArtists = jasmine.createSpy().and.returnValue(of(mockArtists));
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockSpotifyService: SpotifyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [{ provide: SpotifyService, useClass: MockSpotifyService }]
    }).compileComponents();

    mockSpotifyService = TestBed.inject(SpotifyService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get artists', () => {
    component.artistName = 'Some Artist';

    component.onSearch();

    expect(mockSpotifyService.getArtists).toHaveBeenCalledWith('Some Artist');
    expect(component.artists).toEqual(mockArtists.artists);
  });

  it('should not get artists', () => {
    component.onSearch();

    expect(mockSpotifyService.getArtists).toHaveBeenCalledTimes(0);
    expect(component.artists).toBeUndefined();
  });
});
