import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { initialAuthState, AuthState } from '../state/auth.state';


export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.setUserId, (state, { _id }) => ({ ...state, _id })),
  on(AuthActions.clearUserId, (state) => ({ ...state, id: null })),
  on(AuthActions.setUserToken, (state, { token }) => ({...state,token})),
  on(AuthActions.clearUserToken, (state) => ({ ...state, _id: null })),
  on(AuthActions.clearAuthState,(state)=>(initialAuthState))
);
