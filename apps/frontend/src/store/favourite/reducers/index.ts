import {
  fetchFavouritesReducer,
  FetchFavouritesState,
} from './fetch-favourites.reducer';
import {
  updateFavouriteReducer,
  UpdateFavouritesState,
} from './update-favourite.reducer';

export interface FavouritesState {
  fetchFavourites: FetchFavouritesState;
  updateFavourite: UpdateFavouritesState;
}

export const favouriteReducers = {
  fetchFavourites: fetchFavouritesReducer,
  updateFavourite: updateFavouriteReducer,
};
