import { IAuth } from '../../../../shared/models/user';
import * as AuthActions from './auth.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  user: IAuth | null;
  error: any;
}

const initialState: IAuth = {
  uid: null,
  email: null,
  providerId: null,
  photoURL: null,
  emailVerified: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.googleSignIn, state => ({...state})),
  on(AuthActions.mobileGoogleSignIn, state => ({...state})),
  on(AuthActions.facebookSignIn, state => ({...state})),
  on(AuthActions.mobileFacebookSignIn, state => ({...state})),
  on(AuthActions.signInSuccess, (state, payload) => ({...state, ...payload})),
  on(AuthActions.signInError, (state, payload) => ({...state, ...payload})),
  on(AuthActions.signOut, state => ({...state})),
  on(AuthActions.signOutSuccess, state => ({...state, ...initialState})),
  on(AuthActions.signOutError, (state, payload) => ({...state, ...payload})),
  on(AuthActions.getData, state => ({...state})),
  on(AuthActions.dataReceived, (state, payload) => ({...state, ...payload.payload})),
  on(AuthActions.dataNotReceived, (state, payload) => ({...state, ...payload}))
);

export function reducer(state: IAuth | undefined, action: Action) {
  return authReducer(state, action);
}
