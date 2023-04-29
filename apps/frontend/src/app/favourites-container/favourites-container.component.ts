import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteFacade } from '../../store/favourite/services/favourite-facade.service';
import { PhotoListComponent } from '../shared/photo-list/photo-list.component';
import { PhotoDto } from '../../store/photo/types/photos.model';
import { PageSpinnerComponent } from '../shared/page-spinner/page-spinner.component';
import { EmptyFavouritesComponent } from './empty-favourites/empty-favourites.component';

@Component({
  selector: 'ps-favourites-container',
  standalone: true,
  imports: [
    CommonModule,
    PhotoListComponent,
    PageSpinnerComponent,
    EmptyFavouritesComponent,
  ],
  templateUrl: './favourites-container.component.html',
  styleUrls: ['./favourites-container.component.scss'],
})
export class FavouritesContainerComponent implements OnInit {
  public photos: PhotoDto[] | undefined = [];
  public loading = true;

  constructor(private favouriteStore: FavouriteFacade) {
    favouriteStore.fetchFavouritePhotos();
  }

  public ngOnInit(): void {
    this.favouriteStore.favouritePhotos$.subscribe((favourites) => {
      this.photos = favourites?.data?.photos ?? [];
      this.loading = favourites?.loading ?? true;
    });
  }
}
