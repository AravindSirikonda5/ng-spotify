import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SpotifyService } from './spotify.service';

describe('SpotifyService', () => {
  let service: SpotifyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(SpotifyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getAccessToken', () => {
    it('should get access token', () => {
      service.getAccessToken().subscribe();

      const req = httpTestingController.expectOne('/api/token');
      expect(req.request.method).toEqual('GET');
    });
  });

  describe('getArtists', () => {
    it('should get artists', () => {
      service.getArtists('someartist').subscribe();

      const req = httpTestingController.expectOne(
        'https://api.spotify.com/v1/search?q=someartist&type=artist&limit=50'
      );
      expect(req.request.method).toEqual('GET');
    });
  });

  describe('getArtistDetails', () => {
    it('should get artist details', () => {
      service.getArtistDetails('123456', '1', '50').subscribe();

      const req1 = httpTestingController.expectOne('https://api.spotify.com/v1/artists/123456');
      expect(req1.request.method).toEqual('GET');

      const req2 = httpTestingController.expectOne(
        'https://api.spotify.com/v1/artists/123456/albums?offset=1&limit=50'
      );
      expect(req2.request.method).toEqual('GET');

      const req3 = httpTestingController.expectOne('https://api.spotify.com/v1/artists/123456/top-tracks?country=US');
      expect(req3.request.method).toEqual('GET');

      const req4 = httpTestingController.expectOne('https://api.spotify.com/v1/artists/123456/related-artists');
      expect(req4.request.method).toEqual('GET');
    });
  });

  describe('getAlbum', () => {
    it('should get album', () => {
      service.getAlbum('123456').subscribe();

      const req = httpTestingController.expectOne('https://api.spotify.com/v1/albums/123456');
      expect(req.request.method).toEqual('GET');
    });
  });
});
