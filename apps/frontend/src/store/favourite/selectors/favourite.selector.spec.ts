import { combineReducers, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { FetchFavouritesState } from '../reducers/fetch-favourites.reducer';
import { FetchFavouritePhotosState } from '../reducers/fetch-favourite-photos.reducer';
import { UpdateFavouritesState } from '../reducers/update-favourite.reducer';
import {
  favouritesHasId,
  favouritesLoading,
  updateFavouriteLoading,
} from './favourite.selector';

describe('Favourites Selectors', () => {
  const fetchFavouritesMock = {
    data: {
      ids: ['1', '2', '3'],
    },
    loading: false,
    loaded: true,
    error: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          favourites: combineReducers({
            fetchFavourites: () => ({} as FetchFavouritesState),
            fetchFavouritePhotos: () => ({} as FetchFavouritePhotosState),
            updateFavourite: () => ({} as UpdateFavouritesState),
          }),
        }),
      ],
    });
  });

  it('should select the loading state of FetchFavouritesState', () => {
    const result = favouritesLoading.projector(fetchFavouritesMock);

    expect(result).toBe(false);
  });

  it('should select if favourites have a specific ID', () => {
    const hasIdSelector = favouritesHasId('1');
    const result = hasIdSelector.projector(fetchFavouritesMock);

    expect(result).toBe(true);
  });

  it('should select the loading state of UpdateFavouritesState', () => {
    const result = updateFavouriteLoading.projector({
      loading: true,
      loaded: false,
      error: false,
      data: null,
    });

    expect(result).toBe(true);
  });
});
