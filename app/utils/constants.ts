export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended'
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  HR_MANAGER: 'hr_manager',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
  VIEWER: 'viewer'
} as const;

export const PERMISSIONS = {
  USERS_CREATE: 'users:create',
  USERS_READ: 'users:read',
  USERS_UPDATE: 'users:update',
  USERS_DELETE: 'users:delete',
  ROLES_CREATE: 'roles:create',
  ROLES_READ: 'roles:read',
  ROLES_UPDATE: 'roles:update',
  ROLES_DELETE: 'roles:delete'
} as const;

export const DEPARTMENTS = [
  'Engineering',
  'Human Resources',
  'Marketing',
  'Sales',
  'Finance',
  'Operations',
  'Customer Support'
] as const;

export const TABLE_PAGE_SIZES = [10, 25, 50, 100] as const;

export const DEFAULT_PAGE_SIZE = 25;