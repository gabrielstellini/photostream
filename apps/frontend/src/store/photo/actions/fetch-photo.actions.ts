import { createAction, props } from '@ngrx/store';
import { PhotoResponse } from '../types/photos.model';

export const fetchPhoto = createAction(
  '[Photos] Fetch photo',
  props<{ payload: { id: string } }>()
);

export const fetchPhotoSuccess = createAction(
  '[Photos] Fetch photo success',
  props<{ payload: PhotoResponse }>()
);

export const fetchPhotoFail = createAction('[Photos] Fetch photo fail');
