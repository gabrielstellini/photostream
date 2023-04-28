import { createAction, props } from '@ngrx/store';
import { UserResponseType } from '../types/user-response.type';

export const getUser = createAction(
  '[User] Get  user',
  props<{ payload: { demo: string } }>()
);

export const getUserSuccess = createAction(
  '[User] Get  user success',
  props<{ payload: UserResponseType }>()
);

export const getUserFail = createAction('[User] Get  user fail');
