import { createAction, props } from '@ngrx/store';
import { FavouritesResponse } from '../types/favourite.model';

export const fetchFavourites = createAction('[Favourite] Fetch favourites');

export const fetchFavouritesSuccess = createAction(
  '[Favourite] Fetch favourites success',
  props<{ payload: FavouritesResponse }>()
);

export const fetchFavouritesFail = createAction(
  '[Favourite] Fetch favourites fail'
);
