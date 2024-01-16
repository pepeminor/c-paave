import { IAuthTokenResponse } from 'interfaces/authentication';

export interface IAuthTokenReducer extends IAuthTokenResponse {
  lastLoggedInAt?: number; // time in ms
  version?: number;
}
