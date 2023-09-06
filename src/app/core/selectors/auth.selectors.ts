import { AuthState } from "../state/auth.state";
import {createFeatureSelector,createSelector} from '@ngrx/store'

export const selectAuthState= createFeatureSelector<AuthState>('auth');
export const selectUserId= createSelector(selectAuthState,(state)=>(state._id));
export const selectHeaders= createSelector(selectAuthState,(state)=>state.headers);

