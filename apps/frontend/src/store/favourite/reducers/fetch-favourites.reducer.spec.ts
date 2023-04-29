import { fetchFavouritesReducer } from './fetch-favourites.reducer';
import {
  fetchFavourites,
  fetchFavouritesFail,
  fetchFavouritesSuccess,
} from '../actions/fetch-favourites.actions';
import { addFavouriteSuccess } from '../actions/add-favourite.action';
import { removeFavouriteSuccess } from '../actions/remove-favourite.action';
import { PhotoDto } from '../../photo/types/photos.model';

describe('fetchFavouritesReducer', () => {
  const initialState = {
    data: null,
    loading: false,
    loaded: false,
    error: false,
  };

  it('should return the initial state', () => {
    const action = {} as any;
    const state = fetchFavouritesReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should set loading to true on fetchFavourites', () => {
    const action = fetchFavourites();
    const state = fetchFavouritesReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('should set loading to false and update data on fetchFavouritesSuccess', () => {
    const favourites = ['test1', 'test2'];
    const action = fetchFavouritesSuccess({ payload: favourites });
    const state = fetchFavouritesReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.loaded).toBe(true);
    expect(state.data?.ids).toEqual(favourites);
  });

  it('should set loading to false, loaded to false, and error to true on fetchFavouritesFail', () => {
    const action = fetchFavouritesFail();
    const state = fetchFavouritesReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.loaded).toBe(false);
    expect(state.error).toBe(true);
  });

  it('should add an id to the list on addFavouriteSuccess', () => {
    const newFavourite: PhotoDto = {
      id: 'test3',
      author: 'test3',
      width: 123,
      height: 123,
      url: 'test3',
      download_url: 'test3',
    };
    const action = addFavouriteSuccess({
      payload: newFavourite,
    });
    const stateWithFavourite = {
      ...initialState,
      data: { ids: ['test1', 'test2'] },
    };
    const state = fetchFavouritesReducer(stateWithFavourite, action);

    expect(state.data?.ids).toEqual([
      ...stateWithFavourite.data.ids,
      newFavourite.id,
    ]);
  });

  it('should remove an id from the list on removeFavouriteSuccess', () => {
    const idToRemove = 'test1';
    const action = removeFavouriteSuccess({ payload: idToRemove });
    const stateWithFavourites = {
      ...initialState,
      data: { ids: ['test1', 'test2'] },
    };
    const state = fetchFavouritesReducer(stateWithFavourites, action);

    expect(state.data?.ids).toEqual(['test2']);
  });
});
