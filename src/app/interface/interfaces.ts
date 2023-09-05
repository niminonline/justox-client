export interface Interfaces {}
export interface DialogData {
  title: string;
  content: string;
  buttonText: string;
}

export interface UserType {
  _id: string;
  username: string;
  email: string;
  mobile: string;
  image: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminType {
  email: string;
  password: string;
}

export interface ApiResponse {
  message?: string;
  status?: string;
  userData?: UserType;
  token?: string;
}

export interface UsersApiResponse {
  usersData: UserType[];
  message: string;
  status: string;
}

export interface AdminLoginResponse {
  adminData?: {
    _id?: string;
    email?: string;
    password?: string;
  };
  adminToken?: string;
  message?: string;
  status?: string;
}

export interface verifyTokenResult {
  status?: string;
  message?: string;
}
