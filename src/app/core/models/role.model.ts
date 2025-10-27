// Table data
export interface Role {
  roleId: number;
  name: string;
  description: string;
  slug: number;
  status: number;
  create_at: string;
  update_at: string;
  actions: string;
}

export interface CreateRole
  extends Omit<Role, 'roleId' | 'actions' | 'create_at' | 'update_at'> {}
