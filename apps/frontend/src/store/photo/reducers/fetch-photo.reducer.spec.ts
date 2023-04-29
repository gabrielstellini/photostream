import {
  fetchPhoto,
  fetchPhotoFail,
  fetchPhotoSuccess,
} from '../actions/fetch-photo.actions';
import { fetchPhotoReducer, FetchPhotoState } from './fetch-photo.reducer';
import { PhotoStore } from '../types/photos.model';

describe('fetchPhotoReducer', () => {
  let initialState: FetchPhotoState;

  beforeEach(() => {
    initialState = {
      data: null,
      loading: false,
      loaded: false,
      error: false,
    };
  });

  it('should set loading to true when fetching photo', () => {
    const id = 'test1';
    const action = fetchPhoto({ payload: { id } });
    const expectedState: FetchPhotoState = {
      ...initialState,
      loading: true,
    };

    const newState = fetchPhotoReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should set data, loading, and loaded when fetching photo succeeds', () => {
    const payload: PhotoStore = {
      id: '1',
      author: 'John Doe',
      url: 'https://example.com/image.jpg',
      download_url: 'https://example.com/image-download.jpg',
      thumbnail_url: 'https://example.com/image-thumbnail.jpg',
    };
    const action = fetchPhotoSuccess({ payload });
    const expectedState: FetchPhotoState = {
      ...initialState,
      data: payload,
      loading: false,
      loaded: true,
    };

    const newState = fetchPhotoReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should set loading, loaded, and error when fetching photo fails', () => {
    const action = fetchPhotoFail();
    const expectedState: FetchPhotoState = {
      ...initialState,
      loading: false,
      loaded: false,
      error: true,
    };

    const newState = fetchPhotoReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
