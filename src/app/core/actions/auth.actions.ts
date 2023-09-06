import {createAction,props} from '@ngrx/store'

export const setUserId= createAction('[Auth] Set User ID',props<{_id:string}>());
export const clearUserId = createAction('[Auth] Clear User ID');
export const setUserToken = createAction('[Auth Set User Token]',props<{token:string}>());
export const clearUserToken = createAction('[Auth] Clear Token');
export const clearAuthState = createAction('[Auth] Clear Auth State');

