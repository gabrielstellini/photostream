import { Nullable, StateSlice } from '../../shared/types/state.type';
import { FavouritePhotosStore } from '../types/favourite.model';
import { createReducer, on } from '@ngrx/store';
import {
  fetchFavouritePhotos,
  fetchFavouritePhotosFail,
  fetchFavouritesPhotosSuccess,
} from '../actions/fetch-favourite-photos.actions';
import { addFavouriteSuccess } from '../actions/add-favourite.action';
import { removeFavouriteSuccess } from '../actions/remove-favourite.action';

export type FetchFavouritePhotosState = StateSlice<
  Nullable<FavouritePhotosStore>
>;

const initialState: FetchFavouritePhotosState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export const fetchFavouritePhotosReducer = createReducer(
  initialState,
  on(
    fetchFavouritePhotos,
    (): FetchFavouritePhotosState => ({
      ...initialState,
      loading: true,
    })
  ),
  on(
    fetchFavouritesPhotosSuccess,
    (state, action): FetchFavouritePhotosState => ({
      ...state,
      data: {
        photos: action.payload,
      },
      loading: false,
      loaded: true,
    })
  ),
  on(
    fetchFavouritePhotosFail,
    (state): FetchFavouritePhotosState => ({
      ...state,
      loading: false,
      loaded: false,
      error: true,
    })
  ),

  // These 2 actions prevent an extra "fetch" request. Should only be done where stale data is not a problem.
  on(
    addFavouriteSuccess,
    (state, action): FetchFavouritePhotosState => ({
      ...state,
      data: {
        photos: [...(state?.data?.photos ?? []), action.payload],
      },
      loading: false,
      loaded: true,
    })
  ),
  on(
    removeFavouriteSuccess,
    (state, action): FetchFavouritePhotosState => ({
      ...state,
      data: {
        photos: (state?.data?.photos ?? [])?.filter(
          (photo) => photo.id !== action.payload
        ),
      },
      loading: false,
      loaded: true,
    })
  )
);
