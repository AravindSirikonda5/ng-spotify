import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Album } from '../../models/album.model';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  album: Album;
  showError: boolean;

  constructor(private activatedRoute: ActivatedRoute, private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    const albumId = this.activatedRoute.snapshot.paramMap.get('albumId');
    this.getAlbum(albumId);
  }

  private getAlbum(albumId: string) {
    this.spotifyService.getAlbum(albumId).subscribe(
      (res) => {
        this.album = res;
      },
      () => {
        this.showError = true;
      }
    );
  }
}
