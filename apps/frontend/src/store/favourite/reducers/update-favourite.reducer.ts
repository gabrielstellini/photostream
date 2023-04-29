import { Nullable, StateSlice } from '../../shared/types/state.type';
import { createReducer, on } from '@ngrx/store';
import {
  addFavourite,
  addFavouriteFail,
  addFavouriteSuccess,
} from '../actions/add-favourite.action';
import {
  removeFavourite,
  removeFavouriteFail,
  removeFavouriteSuccess,
} from '../actions/remove-favourite.action';

export type UpdateFavouritesState = StateSlice<Nullable<void>>;

const initialState: UpdateFavouritesState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export const updateFavouriteReducer = createReducer(
  initialState,
  on(
    addFavourite,
    removeFavourite,
    (): UpdateFavouritesState => ({
      ...initialState,
      loading: true,
    })
  ),
  on(
    addFavouriteSuccess,
    removeFavouriteSuccess,
    (state): UpdateFavouritesState => ({
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(
    addFavouriteFail,
    removeFavouriteFail,
    (state): UpdateFavouritesState => ({
      ...state,
      loading: false,
      loaded: false,
      error: true,
    })
  )
);
