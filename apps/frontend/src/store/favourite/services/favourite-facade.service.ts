import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  favouritesHasId,
  favouritesLoading,
  selectFavouritePhotos,
  selectFavourites,
  updateFavouriteLoading,
} from '../selectors/favourite.selector';
import { fetchFavouritePhotos } from '../actions/fetch-favourite-photos.actions';
import {
  AddFavouriteRequest,
  RemoveFavouriteRequest,
} from '../types/favourite.model';
import { addFavourite } from '../actions/add-favourite.action';
import { removeFavourite } from '../actions/remove-favourite.action';
import { fetchFavourites } from '../actions/fetch-favourites.actions';

@Injectable({
  providedIn: 'root',
})
export class FavouriteFacade {
  public favourites$ = this.store.select(selectFavourites);
  public favouritePhotos$ = this.store.select(selectFavouritePhotos);
  public updateLoading$ = this.store.select(updateFavouriteLoading);
  public favouritesLoading$ = this.store.select(favouritesLoading);

  constructor(private store: Store) {}

  public isFavourite$ = (id: string) => this.store.select(favouritesHasId(id));

  public fetchFavouritePhotos() {
    this.store.dispatch(fetchFavouritePhotos());
  }

  public fetchFavourites() {
    this.store.dispatch(fetchFavourites());
  }

  public addFavourite(id: AddFavouriteRequest) {
    this.store.dispatch(addFavourite({ payload: id }));
  }

  public removeFavourite(id: RemoveFavouriteRequest) {
    this.store.dispatch(removeFavourite({ payload: id }));
  }
}
