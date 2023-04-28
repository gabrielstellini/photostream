import { createSelector } from '@ngrx/store';
import { selectPhotosFeature } from './feature.selector';

export const selectPhotos = createSelector(
  selectPhotosFeature,
  (state) => state?.fetchPhotos
);

export const selectPhotosLoading = createSelector(
  selectPhotos,
  (state) => state?.loading
);

export const selectPhotosData = createSelector(
  selectPhotos,
  (state) => state?.data
);

export const selectPhotosPagination = createSelector(
  selectPhotosData,
  (state) => ({
    maxPage: state?.maxPage,
    lastLoadedPage: state?.lastLoadedPage,
  })
);
