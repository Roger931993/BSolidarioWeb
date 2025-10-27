import { UserRole } from "@web/core/models/user-role.model";
export interface User {
  userId: number;
  userName?: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dateJoin: string;
  lastLogin: string;
  emailVerified: string;
  profilePhotoPath: string;
  accessToken: string;
  status: number;
  create_at: string;
  update_at: string;
  actions: string;
  userRoles: UserRole[];
}

export interface CreateUser
  extends Omit<
    User,
    | "userId"
    | "dateJoin"
    | "lastLogin"
    | "emailVerified"
    | "profilePhotoPath"
    | "accessToken"
    | "actions"
    | "createdAt"
    | "updatedAt"
    | "userRoles"
  > {
  uid: string;
  name: string;
}
