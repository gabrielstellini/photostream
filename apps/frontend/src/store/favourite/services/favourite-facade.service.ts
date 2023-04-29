import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectFavourites,
  updateFavouriteLoading,
} from '../selectors/favourite.selector';
import { fetchFavourites } from '../actions/fetch-favourites.actions';
import {
  AddFavouriteRequest,
  RemoveFavouriteRequest,
} from '../types/favourite.model';
import { addFavourite } from '../actions/add-favourite.action';
import { removeFavourite } from '../actions/remove-favourite.action';

@Injectable({
  providedIn: 'root',
})
export class FavouritesFacade {
  public favourites$ = this.store.select(selectFavourites);
  public updateLoading$ = this.store.select(updateFavouriteLoading);

  constructor(private store: Store) {}

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
