import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { AlbumsService, Photo } from '../../services/albums.service';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './album-photos.component.html',
})
export class AlbumPhotosComponent implements OnInit {
  photos$: Observable<Photo[]> = of([]); 
  albumId: number = 0; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumsService: AlbumsService
  ) {}

  ngOnInit(): void {
    this.photos$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.albumId = Number(params.get('id'));
        return this.albumsService.getPhotos(this.albumId);
      })
    );
  }

  goBack(): void {
    this.router.navigate(['/albums']);
  }

  trackByPhotoId(index: number, photo: Photo): number {
    return photo.id;
  }
}