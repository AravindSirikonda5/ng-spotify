import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArtistInfo } from './../../models/artists.model';
import { AlbumItem } from '../../models/albums.model';
import { TopTrack } from '../../models/top-tracks.model';
import { RelatedArtist } from '../../models/related-artists.model';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artistId: string;
  artistInfo: ArtistInfo;
  albums: AlbumItem[];
  moreAlbums: AlbumItem[];
  showMoreAlbums: boolean;
  topTracks: TopTrack[];
  relatedArtists: RelatedArtist[];
  showError: boolean;

  constructor(private activatedRoute: ActivatedRoute, private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      this.moreAlbums = null;
      this.showMoreAlbums = false;
      this.artistId = res.get('artistId');
      this.getDetails(this.artistId);
    });
  }

  viewMoreAlbums(): void {
    this.showMoreAlbums = true;

    if (this.moreAlbums) {
      return;
    }

    this.spotifyService.getAlbums(this.artistId, '8', '50').subscribe(
      (res) => {
        this.moreAlbums = res.items;
      },
      () => {
        this.showError = true;
      }
    );
  }

  viewLessAlbums(): void {
    this.showMoreAlbums = false;
    window.scrollTo(0, 130);
  }

  private getDetails(artistId: string): void {
    this.spotifyService.getArtistDetails(artistId, '0', '8').subscribe(
      ([artistInfo, albums, topTracks, relatedArtists]) => {
        this.artistInfo = artistInfo;
        this.albums = albums.items;
        this.topTracks = topTracks.tracks;
        this.relatedArtists = relatedArtists.artists;
      },
      () => {
        this.showError = true;
      }
    );
  }
}
