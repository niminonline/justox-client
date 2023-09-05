import { UserType } from "../../interface/interfaces";
import { createReducer,on } from "@ngrx/store";
import * as UserActions from '../actions/user.actions'

export interface UserState {
    userData: UserType | null;
  }

  export const initialState: UserState = {
    userData: null,
  };

  export const userReducer = createReducer(
    initialState,
    on(UserActions.storeUserData, (state, { userData }) => ({...state,userData})),
    on(UserActions.retrieveUserData, (state) => state)
  );
  
  
