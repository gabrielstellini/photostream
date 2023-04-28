import { createAction, props } from '@ngrx/store';
import { PhotosRequestParams, PhotosResponse } from '../types/photos.model';

export const fetchNextPage = createAction('[Photos] Fetch next page');

export const fetchPhotos = createAction(
  '[Photos] Fetch photos',
  props<{ payload: PhotosRequestParams }>()
);

export const fetchPhotosSuccess = createAction(
  '[Photos] Fetch photos success',
  props<{
    payload: {
      items: PhotosResponse;
      newPageIndex: number;
      maxPage: number;
    };
  }>()
);

export const fetchPhotosFail = createAction('[Photos] Fetch photos fail');
