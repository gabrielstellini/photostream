import { selectUserFeature } from './feature.selector';
import { createSelector } from '@ngrx/store';

export const selectUser = createSelector(
  selectUserFeature,
  (state) => state?.getUser
);
