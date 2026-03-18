import { Iuser } from '../user/Iuser.js';

export interface IapiAuthResponse {
  message: string;
  user: Iuser;
  token: string;
}
