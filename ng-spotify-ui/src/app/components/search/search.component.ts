import { Component } from '@angular/core';

import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/artists.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  artists: Artist;
  artistName: string;

  constructor(private spotifyService: SpotifyService) {}

  onSearch(): void {
    if (!this.artistName) {
      return;
    }
    this.spotifyService.getArtists(this.artistName).subscribe((res) => {
      this.artists = res.artists;
    });
  }
}
