import { createFeatureSelector } from '@ngrx/store';
import { FavouritesState } from '../reducers';

export const selectFavouritesFeature =
  createFeatureSelector<FavouritesState>('favourite');
