import { HttpHeaders } from '@angular/common/http';
import {createAction,props} from '@ngrx/store'

export const setUserId= createAction('[Auth] Set User ID',props<{_id:string}>());
export const clearUserId = createAction('[Auth] Clear User ID');
export const setUserHeader = createAction('[Auth Set User Header]',props<{headers:HttpHeaders}>());
export const clearUserHeader = createAction('[Auth] Clear Headers');
export const clearAuthState = createAction('[Auth] Clear Auth State');

