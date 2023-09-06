import { HttpHeaders } from "@angular/common/http";


export interface AuthState{
    _id:string|null,
    headers:HttpHeaders|null
}
export const initialAuthState:AuthState={
    _id: null,
    headers:null
}

