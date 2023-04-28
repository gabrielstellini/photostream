import { getUserReducer, GetUserState } from './get-user.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface UserState {
  getUser: GetUserState;
}

export const userReducers: ActionReducerMap<UserState, any> = {
  getUser: getUserReducer,
};
