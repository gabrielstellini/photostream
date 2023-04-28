import { createFeatureSelector } from '@ngrx/store';
import { UserState } from '../reducers';

export const selectUserFeature = createFeatureSelector<UserState>('user');
