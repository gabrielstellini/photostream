import { createAction, props } from '@ngrx/store';
import { FavouriteDto } from '../types/favourite.model';

export const addFavourite = createAction(
  '[Favourite] Add favourite',
  props<{ payload: FavouriteDto }>()
);

export const addFavouriteSuccess = createAction(
  '[Favourite] Add favourite success',
  props<{ payload: FavouriteDto }>()
);

export const addFavouriteFail = createAction('[Favourite] Add favourite fail');
