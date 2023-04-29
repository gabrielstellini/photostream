import { createAction, props } from '@ngrx/store';
import { FavouriteDto } from '../types/favourite.model';

export const removeFavourite = createAction(
  '[Favourite] Remove favourite',
  props<{ payload: string }>()
);

export const removeFavouriteSuccess = createAction(
  '[Favourite] Remove favourite success',
  props<{ payload: FavouriteDto }>()
);

export const removeFavouriteFail = createAction(
  '[Favourite] Remove favourite fail'
);
