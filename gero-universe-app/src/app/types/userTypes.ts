/** User type with necessary user data */
export interface User {
  email?: string;
  username?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  token?: string;
}

/** User type with data needed to login */
export interface UserLogin {
  email: string;
  password: string;
}

/** User type with data needed to register */
export interface UserRegister {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
