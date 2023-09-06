import { UserType } from "../../interface/interfaces";

export interface UserState {
    userData: UserType | null;
  }

  export const initialState: UserState = {
    userData: null,
  };