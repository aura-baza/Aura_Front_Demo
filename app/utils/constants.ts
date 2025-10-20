/**
 * CONSTANTES GLOBALES DEL SISTEMA
   -Este archivo agrupa las constantes reutilizables
   -relacionadas con estados de usuario, roles,
   -permisos, departamentos y configuraciones comunes.
 */

// Define los posibles estados que puede tener un usuario
// dentro del sistema de recursos humanos.
export const USER_STATUS = {
  ACTIVE: 'activo',
  INACTIVE: 'inactivo',
  SUSPENDED: 'retirado'
} as const;

// Lista de roles predefinidos en el sistema.
// Estos roles permiten segmentar permisos y responsabilidades.
export const USER_ROLES = {
  ADMIN: 'admin',
  HR_MANAGER: 'supervisor',
  MANAGER: 'manager',
  EMPLOYEE: 'agente',
  VIEWER: 'viewer'
} as const;

// Define las acciones específicas que un usuario puede realizar.
// Los permisos se asocian con roles para controlar el acceso.
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

// Lista base de departamentos que existen en la organización.
// Puede ser usada para filtros, formularios o menús desplegables.
export const DEPARTMENTS = [
  'Sistemas',
  'Recursos Humanos',
  'Operaciones',
  'Calidad',
  'Operativo',
  'Juridica'
] as const;

// Tamaños de página disponibles para las tablas del sistema.
// Permiten ajustar cuántos registros se muestran por vista.
export const TABLE_PAGE_SIZES = [10, 25, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 25;