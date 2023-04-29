import { createAction, props } from '@ngrx/store';
import { FavouriteDto, RemoveFavouriteRequest } from '../types/favourite.model';

export const removeFavourite = createAction(
  '[Favourite] Remove favourite',
  props<{ payload: RemoveFavouriteRequest }>()
);

export const removeFavouriteSuccess = createAction(
  '[Favourite] Remove favourite success',
  props<{ payload: FavouriteDto }>()
);

export const removeFavouriteFail = createAction(
  '[Favourite] Remove favourite fail'
);
