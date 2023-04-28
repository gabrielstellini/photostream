import { fetchPhotosReducer, FetchPhotosState } from './fetch-photos.reducer';
import { fetchPhotoReducer, FetchPhotoState } from './fetch-photo.reducer';

export interface PhotoState {
  fetchPhotos: FetchPhotosState;
  fetchPhoto: FetchPhotoState;
}

export const photoReducers = {
  fetchPhotos: fetchPhotosReducer,
  fetchPhoto: fetchPhotoReducer,
};
