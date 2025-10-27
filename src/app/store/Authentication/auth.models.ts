export class User {
  email?: string;
  userName?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  status?: number;
  uid?: string;
  username?: string;
}

export interface Login {
  access_token: string;
  token_type: string;
  expires_in: number;
  creation_date: string;
  user_token: string;
  login_token: string;
  idSession: string;
}
