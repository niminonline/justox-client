

export interface AuthState{
    _id:string|null,
    token:string|null
}
export const initialAuthState:AuthState={
    _id: null,
    token:null
}

