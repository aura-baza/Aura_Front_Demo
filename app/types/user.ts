// Interfaces de Usuario y Roles //

// Representa un usuario dentro del sistema
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive' | 'suspended';
  roles: Role[];
  department?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
// Representa un rol dentro del sistema (por ejemplo: Administrador, Empleado, etc.)
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  color?: string;
}
// Representa un permiso granular (acción que un rol puede realizar)
export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
  description: string;
}

//Interfaces para Peticiones (Requests)//

// Estructura esperada para crear un nuevo usuario
export interface CreateUserRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  roleIds: string[];
  department?: string;
  status: 'active' | 'inactive';
}

// Estructura esperada para actualizar un usuario existente
export interface UpdateUserRequest {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  roleIds?: string[];
  department?: string;
  status?: 'active' | 'inactive' | 'suspended';
}

 //Filtros y Paginación//

// Parámetros de filtrado para listados de usuarios
export interface UserFilters {
  search?: string;
  status?: 'active' | 'inactive' | 'suspended' | 'all';
  roleId?: string;
  department?: string;
}

//Estructura genérica para manejar respuestas paginadas desde la API
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}