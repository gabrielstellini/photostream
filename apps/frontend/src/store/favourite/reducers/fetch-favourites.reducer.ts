import { Nullable, StateSlice } from '../../shared/types/state.type';
import { FavouritesStore } from '../types/favourite.model';
import { createReducer, on } from '@ngrx/store';
import {
  fetchFavourites,
  fetchFavouritesFail,
  fetchFavouritesSuccess,
} from '../actions/fetch-favourites.actions';
import { addFavouriteSuccess } from '../actions/add-favourite.action';
import { removeFavouriteSuccess } from '../actions/remove-favourite.action';

export type FetchFavouritesState = StateSlice<Nullable<FavouritesStore>>;

const initialState: FetchFavouritesState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export const fetchFavouritesReducer = createReducer(
  initialState,
  on(
    fetchFavourites,
    (): FetchFavouritesState => ({
      ...initialState,
      loading: true,
    })
  ),
  on(
    fetchFavouritesSuccess,
    (state, action): FetchFavouritesState => ({
      ...state,
      data: {
        ids: action.payload,
      },
      loading: false,
      loaded: true,
    })
  ),
  on(
    fetchFavouritesFail,
    (state): FetchFavouritesState => ({
      ...state,
      loading: false,
      loaded: false,
      error: true,
    })
  ),

  // These 2 actions prevent an extra "fetch" request. Should only be done where stale data is not a problem.
  on(
    addFavouriteSuccess,
    (state, action): FetchFavouritesState => ({
      ...state,
      data: {
        ids: [...(state?.data?.ids ?? []), action.payload.id],
      },
      loading: false,
      loaded: true,
    })
  ),
  on(
    removeFavouriteSuccess,
    (state, action): FetchFavouritesState => ({
      ...state,
      data: {
        ids: (state?.data?.ids ?? [])?.filter((id) => id !== action.payload),
      },
      loading: false,
      loaded: true,
    })
  )
);
