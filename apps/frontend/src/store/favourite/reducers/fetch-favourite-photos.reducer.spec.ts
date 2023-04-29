import { fetchFavouritePhotosReducer } from './fetch-favourite-photos.reducer';
import {
  fetchFavouritePhotos,
  fetchFavouritePhotosFail,
  fetchFavouritesPhotosSuccess,
} from '../actions/fetch-favourite-photos.actions';
import { addFavouriteSuccess } from '../actions/add-favourite.action';
import { removeFavouriteSuccess } from '../actions/remove-favourite.action';
import { PhotoDto } from '../../photo/types/photos.model';

describe('fetchFavouritePhotosReducer', () => {
  const mockPhotos: PhotoDto[] = [
    {
      id: 'test',
      author: 'test',
      url: 'test',
      width: 1,
      height: 1,
      download_url: 'test',
    },
    {
      id: 'test2',
      author: 'test2',
      url: 'test2',
      width: 1,
      height: 1,
      download_url: 'test2',
    },
  ];

  const initialState = {
    data: null,
    loading: false,
    loaded: false,
    error: false,
  };

  it('should return the initial state', () => {
    const action = {} as any;
    const state = fetchFavouritePhotosReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should set loading to true on fetchFavouritePhotos', () => {
    const action = fetchFavouritePhotos();
    const state = fetchFavouritePhotosReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('should set loading to false and update data on fetchFavouritesPhotosSuccess', () => {
    const action = fetchFavouritesPhotosSuccess({ payload: mockPhotos });
    const state = fetchFavouritePhotosReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.loaded).toBe(true);
    expect(state.data?.photos).toEqual(mockPhotos);
  });

  it('should set loading to false, loaded to false, and error to true on fetchFavouritePhotosFail', () => {
    const action = fetchFavouritePhotosFail();
    const state = fetchFavouritePhotosReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.loaded).toBe(false);
    expect(state.error).toBe(true);
  });

  it('should add a photo to the list on addFavouriteSuccess', () => {
    const newPhoto = mockPhotos[1];
    const action = addFavouriteSuccess({ payload: newPhoto });
    const stateWithPhoto = {
      ...initialState,
      data: { photos: mockPhotos },
    };
    const state = fetchFavouritePhotosReducer(stateWithPhoto, action);

    expect(state.data?.photos).toEqual([
      ...stateWithPhoto.data.photos,
      newPhoto,
    ]);
  });

  it('should remove a photo from the list on removeFavouriteSuccess', () => {
    const expectedState = mockPhotos.filter(
      (photo) => photo.id !== mockPhotos[0].id
    );
    const photoIdToRemove = mockPhotos[0].id;
    const action = removeFavouriteSuccess({ payload: photoIdToRemove });
    const stateWithPhotos = {
      ...initialState,
      data: { photos: mockPhotos },
    };
    const state = fetchFavouritePhotosReducer(stateWithPhotos, action);

    expect(state.data?.photos).toEqual(expectedState);
  });
});
