import { updateFavouriteReducer } from './update-favourite.reducer';
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
import { PhotoDto } from '../../photo/types/photos.model';

describe('updateFavouriteReducer', () => {
  const initialState = {
    data: null,
    loading: false,
    loaded: false,
    error: false,
  };

  const mockPhoto: PhotoDto = {
    id: 'test',
    author: 'test',
    url: 'test',
    width: 1,
    height: 1,
    download_url: 'test',
  };

  it('should return the initial state', () => {
    const action = {} as any;
    const state = updateFavouriteReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should set loading to true on addFavourite', () => {
    const action = addFavourite({ payload: 'test' });
    const state = updateFavouriteReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('should set loading to true on removeFavourite', () => {
    const action = removeFavourite({ payload: 'test' });
    const state = updateFavouriteReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('should set loading to false and loaded to true on addFavouriteSuccess', () => {
    const action = addFavouriteSuccess({
      payload: mockPhoto,
    });
    const state = updateFavouriteReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.loaded).toBe(true);
  });

  it('should set loading to false and loaded to true on removeFavouriteSuccess', () => {
    const action = removeFavouriteSuccess({ payload: 'test' });
    const state = updateFavouriteReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.loaded).toBe(true);
  });

  it('should set loading to false, loaded to false, and error to true on addFavouriteFail', () => {
    const action = addFavouriteFail();
    const state = updateFavouriteReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.loaded).toBe(false);
    expect(state.error).toBe(true);
  });

  it('should set loading to false, loaded to false, and error to true on removeFavouriteFail', () => {
    const action = removeFavouriteFail();
    const state = updateFavouriteReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.loaded).toBe(false);
    expect(state.error).toBe(true);
  });
});
