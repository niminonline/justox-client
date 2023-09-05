import { UserType } from "../../interface/interfaces";
import { createAction,props } from "@ngrx/store";


export const storeUserData = createAction('[UserData] Store User Data', props<{ userData: UserType }>());

export const retrieveUserData = createAction('[UserData] Retrieve User Data');
