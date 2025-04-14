import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AlbumsService, Album } from '../../services/albums.service';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './album-detail.component.html',
})
export class AlbumDetailComponent implements OnInit {
  album: Album | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumsService: AlbumsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.albumsService.getAlbum(id).subscribe(
      album => this.album = album
    );
  }

  saveAlbum(): void {
    if (this.album) {
      this.albumsService.updateAlbum(this.album.id, this.album).subscribe();
    }
  }

  goBack(): void {
    this.router.navigate(['/albums']);
  }
}
