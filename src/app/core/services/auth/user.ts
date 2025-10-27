export interface User {
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  password: string;
  status: number;
  uid: string;
  userName: string | null;
}

export interface Login extends Omit<User, 'name' | 'status' | 'uid'> {
  password: string;
}
