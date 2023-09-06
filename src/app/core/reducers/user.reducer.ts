import { createReducer,on } from "@ngrx/store";
import * as UserActions from '../actions/user.actions'
import { initialState } from "../state/user.state";



  export const userReducer = createReducer(
    initialState,
    on(UserActions.storeUserData, (state, { userData }) => ({...state,userData})),
    on(UserActions.retrieveUserData, (state) => state),
    on(UserActions.clearUserData, (state) => initialState) 
  );
  
  
