import { createReducer, on } from '@ngrx/store';
import {
  getUser,
  getUserFail,
  getUserSuccess,
} from '../actions/get-user-actions';
import { UserResponseType } from '../types/user-response.type';
import { Nullable, StateSlice } from '../../shared/types/state.type';

export type GetUserState = StateSlice<Nullable<UserResponseType>>;

const initialState: GetUserState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export const getUserReducer = createReducer(
  initialState,
  on(
    getUser,
    (_state, _action): GetUserState => ({
      ...initialState,
      loading: true,
    })
  ),
  on(
    getUserSuccess,
    (state, action): GetUserState => ({
      ...state,
      data: action.payload,
      loading: false,
      loaded: true,
    })
  ),
  on(
    getUserFail,
    (state): GetUserState => ({
      ...state,
      loading: false,
      loaded: false,
      error: true,
    })
  )
);
