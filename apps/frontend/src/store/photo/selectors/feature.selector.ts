import { createFeatureSelector } from '@ngrx/store';
import { PhotoState } from '../reducers';

export const selectPhotosFeature = createFeatureSelector<PhotoState>('photo');
