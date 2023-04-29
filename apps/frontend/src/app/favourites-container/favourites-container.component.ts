import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesFacade } from '../../store/favourite/services/favourite-facade.service';

@Component({
  selector: 'ps-favourites-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourites-container.component.html',
  styleUrls: ['./favourites-container.component.scss'],
})
export class FavouritesContainerComponent {
  constructor(private favouriteStore: FavouritesFacade) {
    favouriteStore.fetchFavourites();
  }
}
