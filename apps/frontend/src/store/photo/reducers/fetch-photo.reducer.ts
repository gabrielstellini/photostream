import { Nullable, StateSlice } from '../../shared/types/state.type';
import { PhotoStore } from '../types/photos.model';
import { createReducer, on } from '@ngrx/store';
import {
  fetchPhoto,
  fetchPhotoFail,
  fetchPhotoSuccess,
} from '../actions/fetch-photo.actions';

export type FetchPhotoState = StateSlice<Nullable<PhotoStore>>;

const initialState: FetchPhotoState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export const fetchPhotoReducer = createReducer(
  initialState,
  on(
    fetchPhoto,
    (): FetchPhotoState => ({
      ...initialState,
      loading: true,
    })
  ),
  on(
    fetchPhotoSuccess,
    (state, action): FetchPhotoState => ({
      ...state,
      data: action.payload,
      loading: false,
      loaded: true,
    })
  ),
  on(
    fetchPhotoFail,
    (state): FetchPhotoState => ({
      ...state,
      loading: false,
      loaded: false,
      error: true,
    })
  )
);
