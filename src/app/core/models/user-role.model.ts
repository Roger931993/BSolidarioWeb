import { Role } from "@web/core/models/role.model";

// Table data
export interface UserRole {
  userRoleId: number;
  userId: number;
  roleId: number;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRole
  extends Omit<Role, "userRoleId" | "createdAt" | "updatedAt" | "role"> {
  roles: number[];
}
