import { selectPhotosFeature } from './feature.selector';
import { createSelector } from '@ngrx/store';

export const selectPhoto = createSelector(
  selectPhotosFeature,
  (state) => state?.fetchPhoto
);
