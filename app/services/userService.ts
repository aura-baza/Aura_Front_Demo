//Importamos el cliente de API (aún no se usa, pero quedará listo para la integración real)
import { apiClient } from '../services/api';
//Importamos los tipos TypeScript que definen la estructura de datos
import type { User, CreateUserRequest, UpdateUserRequest, UserFilters, PaginatedResponse } from '../types/user';

/*Datos simulados (mock) para pruebas sin backend
 *Representan usuarios de diferentes departamentos y estados
 */
const mockUsers: User[] = [
  {
    id: '1',
    username: 'john.doe',
    email: 'john.doe@company.com',
    firstName: 'John',
    lastName: 'Doe',
    status: 'active',
    roles: [
      { id: '1', name: 'Admin', description: 'Full system access', permissions: [] }
    ],
    department: 'Engineering',
    lastLogin: new Date('2024-01-15T10:30:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: '2',
    username: 'jane.smith',
    email: 'jane.smith@company.com',
    firstName: 'Jane',
    lastName: 'Smith',
    status: 'active',
    roles: [
      { id: '2', name: 'HR Manager', description: 'HR management access', permissions: [] }
    ],
    department: 'Human Resources',
    lastLogin: new Date('2024-01-14T14:20:00Z'),
    createdAt: new Date('2024-01-02T00:00:00Z'),
    updatedAt: new Date('2024-01-14T14:20:00Z')
  },
  {
    id: '3',
    username: 'mike.johnson',
    email: 'mike.johnson@company.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    status: 'inactive',
    roles: [
      { id: '3', name: 'Employee', description: 'Basic employee access', permissions: [] }
    ],
    department: 'Marketing',
    lastLogin: new Date('2024-01-10T09:15:00Z'),
    createdAt: new Date('2024-01-03T00:00:00Z'),
    updatedAt: new Date('2024-01-10T09:15:00Z')
  },
  {
    id: '4',
    username: 'sarah.wilson',
    email: 'sarah.wilson@company.com',
    firstName: 'Sarah',
    lastName: 'Wilson',
    status: 'suspended',
    roles: [
      { id: '4', name: 'Manager', description: 'Team management access', permissions: [] }
    ],
    department: 'Sales',
    lastLogin: new Date('2024-01-08T16:45:00Z'),
    createdAt: new Date('2024-01-04T00:00:00Z'),
    updatedAt: new Date('2024-01-08T16:45:00Z')
  }
];

/**
 *Servicio de gestión de usuarios
 *Centraliza toda la lógica CRUD (crear, leer, actualizar, eliminar)
 */
export const userService = {
   /*Obtiene todos los usuarios con soporte de filtros y paginación.
     *En producción haría una llamada como:
     *apiClient.get(`/users?page=${page}&limit=${limit}&search=${filters.search}`)
   */
  async getUsers(
    page: number = 1,
    limit: number = 25,
    filters: UserFilters = {}
  ): Promise<PaginatedResponse<User>> {
     //Copiamos los usuarios simulados para no mutar el original
    let filteredUsers = [...mockUsers];

    //Filtro por búsqueda general (nombre, email, usuario, apellido)
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.username.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.firstName.toLowerCase().includes(search) ||
        user.lastName.toLowerCase().includes(search)
      );
    }
    //Filtro por estado (activo, inactivo, suspendido, etc.)
    if (filters.status && filters.status !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status);
    }
    //Filtro por departamento
    if (filters.department) {
      filteredUsers = filteredUsers.filter(user => user.department === filters.department);
    }
    //Filtro por rol
    if (filters.roleId) {
      filteredUsers = filteredUsers.filter(user =>
        user.roles.some(role => role.id === filters.roleId)
      );
    }
    
    //Paginación (divide resultados en páginas)
    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = filteredUsers.slice(startIndex, endIndex);

    return {
      data,
      total,
      page,
      limit,
      totalPages
    };
  },
  // Obtiene un usuario específico por su ID
  async getUserById(id: string): Promise<User> {
    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
 
    /*Crea un nuevo usuario
     *En un backend real se haría:
     *apiClient.post('/users', userData)
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    // Mock implementation
    const newUser: User = {
      id: Date.now().toString(),  // genera ID único temporal
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      status: userData.status,
      roles: [],// en producción se mapearían los IDs a objetos de rol
      department: userData.department,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockUsers.push(newUser);
    return newUser;
  },
  // Actualiza un usuario existente
  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...mockUsers[userIndex],
      ...userData,
      updatedAt: new Date()
    };

    mockUsers[userIndex] = updatedUser;
    return updatedUser;
  },
  //Elimina un usuario del sistema
  async deleteUser(id: string): Promise<void> {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    mockUsers.splice(userIndex, 1);
  },
  // Actualización masiva de usuarios (por ejemplo: cambiar estado o rol)
  async bulkUpdateUsers(userIds: string[], updates: Partial<UpdateUserRequest>): Promise<User[]> {
    const updatedUsers = mockUsers
      .filter(user => userIds.includes(user.id))
      .map(user => ({
        ...user,
        ...updates,
        updatedAt: new Date()
      }));

    // Sincroniza los datos simulados
    updatedUsers.forEach(updatedUser => {
      const index = mockUsers.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        mockUsers[index] = updatedUser;
      }
    });

    return updatedUsers;
  }
};