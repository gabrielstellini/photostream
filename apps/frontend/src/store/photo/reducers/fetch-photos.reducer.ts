import { Nullable, StateSlice } from '../../shared/types/state.type';
import { PhotosStore } from '../types/photos.model';
import { createReducer, on } from '@ngrx/store';
import {
  fetchPhotos,
  fetchPhotosFail,
  fetchPhotosSuccess,
} from '../actions/fetch-photos.actions';

export type FetchPhotosState = StateSlice<Nullable<PhotosStore>>;

const initialState: FetchPhotosState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export const fetchPhotosReducer = createReducer(
  initialState,
  on(
    fetchPhotos,
    (_state, _action): FetchPhotosState => ({
      ...initialState,
      loading: true,
    })
  ),
  on(
    fetchPhotosSuccess,
    (state, action): FetchPhotosState => ({
      ...state,
      data: {
        items: [...(state.data?.items ?? []), ...action.payload.items],
        lastLoadedPage: action.payload.newPageIndex,
        maxPage: action.payload.maxPage,
      },
      loading: false,
      loaded: true,
    })
  ),
  on(
    fetchPhotosFail,
    (state): FetchPhotosState => ({
      ...state,
      loading: false,
      loaded: false,
      error: true,
    })
  )
);
