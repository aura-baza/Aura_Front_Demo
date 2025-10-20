// Importamos el cliente de API configurado (maneja headers, baseURL, etc.)
import { apiClient } from './api';
// Importamos los tipos que definen las estructuras de datos para autenticación.
import type { LoginRequest, LoginResponse, AuthUser } from '../types/auth';

//Definimos el servicio de autenticación como un objeto con varios métodos.
export const authService = {
   //Método de inicio de sesión
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    /**
     *Implementación simulada (mock)
     *Aquí se valida de forma local el usuario y contraseña sin llamar a un servidor real.
     *En producción, esto debería ser reemplazado por algo como:
     *const response = await apiClient.post('/auth/login', credentials);
     *return response.data;
     */
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      //Respuesta de ejemplo que imita lo que devolvería un backend real.
      const mockResponse: LoginResponse = {
        user: {
          id: '1',
          username: 'admin',
          email: 'admin@company.com',
          firstName: 'Admin',
          lastName: 'User',
          roles: ['admin'],
          permissions: [
            // Permisos simulados que controlan el acceso a distintas funcionalidades
            'users:create', 'users:read', 'users:update', 'users:delete',
            'roles:create', 'roles:read', 'roles:update', 'roles:delete'
          ]
        },
        // Genera un token y refresh token falsos (solo para testing)
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now()
      };
      return mockResponse;
    }
    //Si las credenciales no coinciden con las del mock, lanza error
    throw new Error('Invalid credentials');
  },

  async logout(): Promise<void> {
     /**
     *En una API real, este método podría:
     *- Invalidar el token en el servidor
     *- Registrar la fecha de desconexión
     *- Notificar la sesión cerrada
     * Ejemplo real:
     *await apiClient.post('/auth/logout');
     */
    return Promise.resolve();// Aquí no hace nada (solo simula éxito)
  },
  
  //Obtiene la información del usuario autenticado
  async getCurrentUser(): Promise<AuthUser> {
    /**
     * En un entorno real, el backend devolvería los datos del usuario
     * basándose en el token JWT enviado en los headers (Authorization).
     *Ejemplo:
     *const response = await apiClient.get('/auth/me');
     *return response.data;
     */
    return {
      id: '1',
      username: 'admin',
      email: 'admin@company.com',
      firstName: 'Admin',
      lastName: 'User',
      roles: ['admin'],
      permissions: [
        'users:create', 'users:read', 'users:update', 'users:delete',
        'roles:create', 'roles:read', 'roles:update', 'roles:delete'
      ]
    };
  },
  
   //Método para refrescar el token cuando expira
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    /**
     *En una app real, este método enviaría el refreshToken al backend para obtener
     *un nuevo JWT y así mantener la sesión activa sin que el usuario vuelva a iniciar sesión.
     * Ejemplo real:
     *const response = await apiClient.post('/auth/refresh', { refreshToken });
     *return response.data;
     */
    return this.getCurrentUser().then(user => ({
      user,
      token: 'new-mock-jwt-token-' + Date.now(),
      refreshToken: 'new-mock-refresh-token-' + Date.now()
    }));
  }
};