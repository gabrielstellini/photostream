import { selectFavouritesFeature } from './feature.selector';
import { createSelector } from '@ngrx/store';

export const selectFavourites = createSelector(
  selectFavouritesFeature,
  (state) => state?.fetchFavourites
);

export const updateFavourite = createSelector(
  selectFavouritesFeature,
  (state) => state?.updateFavourite
);

export const updateFavouriteLoading = createSelector(
  updateFavourite,
  (state) => state?.loading
);
