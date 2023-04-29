import { createAction, props } from '@ngrx/store';
import { PhotosResponse } from '../../photo/types/photos.model';

export const fetchFavouritePhotos = createAction(
  '[Favourite] Fetch favourite photos'
);

export const fetchFavouritesPhotosSuccess = createAction(
  '[Favourite] Fetch favourite photos success',
  props<{ payload: PhotosResponse }>()
);

export const fetchFavouritePhotosFail = createAction(
  '[Favourite] Fetch favourites photos fail'
);
