import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsService, Album } from '../../services/albums.service';
import { Router, RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './albums.component.html',
})
export class AlbumsComponent implements OnInit {
  albums$: Observable<Album[]> = of([]); 
  newTitle = '';

  constructor(private albumsService: AlbumsService, private router: Router) {}

  ngOnInit(): void {
    this.loadAlbums();
  }

  loadAlbums(): void {
    this.albums$ = this.albumsService.getAlbums();
  }

  createAlbum(): void {
    if (!this.newTitle.trim()) return;
    this.albumsService.createAlbum(this.newTitle).subscribe(() => {
      this.newTitle = '';
      this.loadAlbums();
    });
  }

  deleteAlbum(id: number): void {
    this.albumsService.deleteAlbum(id).subscribe(() => {
      this.loadAlbums();
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/albums', id]);
  }

  trackById(index: number, album: Album): number {
    return album.id;
  }
}