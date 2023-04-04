import { Token } from './token';
import { IUser } from './user';

export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: IUser;
  token: Token;
}