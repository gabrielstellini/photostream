import { selectFavouritesFeature } from './feature.selector';
import { createSelector } from '@ngrx/store';

export const selectFavourites = createSelector(
  selectFavouritesFeature,
  (state) => state?.fetchFavourites
);

export const favouritesLoading = createSelector(
  selectFavourites,
  (state) => state?.loading
);

export const favouritesHasId = (id: string) =>
  createSelector(selectFavourites, (state) => state?.data?.ids?.includes(id));

export const selectFavouritePhotos = createSelector(
  selectFavouritesFeature,
  (state) => state?.fetchFavouritePhotos
);

export const updateFavourite = createSelector(
  selectFavouritesFeature,
  (state) => state?.updateFavourite
);

export const updateFavouriteLoading = createSelector(
  updateFavourite,
  (state) => state?.loading
);
