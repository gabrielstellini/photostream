import {
  fetchFavouritePhotosReducer,
  FetchFavouritePhotosState,
} from './fetch-favourite-photos.reducer';
import {
  updateFavouriteReducer,
  UpdateFavouritesState,
} from './update-favourite.reducer';
import {
  fetchFavouritesReducer,
  FetchFavouritesState,
} from './fetch-favourites.reducer';

export interface FavouritesState {
  fetchFavourites: FetchFavouritesState;
  fetchFavouritePhotos: FetchFavouritePhotosState;
  updateFavourite: UpdateFavouritesState;
}

export const favouriteReducers = {
  fetchFavourites: fetchFavouritesReducer,
  fetchFavouritePhotos: fetchFavouritePhotosReducer,
  updateFavourite: updateFavouriteReducer,
};
