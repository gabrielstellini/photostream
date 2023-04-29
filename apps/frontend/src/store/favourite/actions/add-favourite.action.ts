import { createAction, props } from '@ngrx/store';
import { AddFavouriteRequest } from '../types/favourite.model';
import { PhotoDto } from '../../photo/types/photos.model';

export const addFavourite = createAction(
  '[Favourite] Add favourite',
  props<{ payload: AddFavouriteRequest }>()
);

export const addFavouriteSuccess = createAction(
  '[Favourite] Add favourite success',
  props<{ payload: PhotoDto }>()
);

export const addFavouriteFail = createAction('[Favourite] Add favourite fail');
