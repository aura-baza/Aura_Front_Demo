// Importaciones principales de React
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
// Importamos tipos personalizados que definen la estructura del contexto y los modelos de usuario.
import type { AuthContextType, AuthUser, LoginRequest } from '../types/auth';
// Importamos los servicios que manejan la autenticación y las llamadas a la API.
import { authService } from '../services/authService';
import { apiClient } from '../services/api';

// Creamos el contexto de autenticación, inicialmente sin valor definido.
const AuthContext = createContext<AuthContextType | undefined>(undefined);
/*
 *Definimos las props del proveedor de autenticación.
 *Este componente envolverá toda la aplicación.
 */
interface AuthProviderProps {
  children: ReactNode;
}
/*
 *Componente principal del contexto de autenticación.
 *Se encarga de manejar el estado global del usuario, token, y permisos.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
   // Estado del usuario autenticado (o null si no hay sesión activa)
  const [user, setUser] = useState<AuthUser | null>(null);
   // Token JWT o de sesión, guardado para autorizar las peticiones.
  const [token, setToken] = useState<string | null>(null);
   // Estado que indica si el proceso de carga/validación de sesión está en curso.
  const [isLoading, setIsLoading] = useState(true);

  /**
   *useEffect que se ejecuta al montar el componente.
   *Intenta restaurar la sesión del usuario desde el localStorage.
   */
  useEffect(() => {
    const initAuth = async () => {
      // Recupera el token guardado en el navegador
      const storedToken = localStorage.getItem('auth_token');
      if (storedToken) {
        try {
          // Configura el token globalmente en el cliente de API
          apiClient.setToken(storedToken);
          // Llama al servicio para obtener la información actual del usuario autenticado
          const currentUser = await authService.getCurrentUser();
           // Actualiza el estado global
          setUser(currentUser);
          setToken(storedToken);
        } catch (error) {
           // Si falla (por token inválido, expirado o red), se limpia la sesión
          console.error('Failed to restore auth session:', error);
          localStorage.removeItem('auth_token');
        }
      }
      // Marca el final del proceso de carga
      setIsLoading(false);
    };

    initAuth();
  }, []);
  
  /**
   *Función de inicio de sesión
   *Recibe las credenciales y obtiene token + datos del usuario desde el servicio backend.
   */
  const login = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);
    setUser(response.user);
    setToken(response.token);
    // Guarda el token para futuras solicitudes
    apiClient.setToken(response.token);
    localStorage.setItem('auth_token', response.token);
  };
  
  /**
   *Función de cierre de sesión
   *Elimina toda la información del usuario, incluso del localStorage.
   */
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Limpieza total del estado y del cliente API
      setUser(null);
      setToken(null);
      apiClient.setToken(null);
      localStorage.removeItem('auth_token');
    }
  };
   
  /**
   *Verificación de permisos específicos
   *Retorna `true` si el usuario tiene un permiso determinado.
   */
  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };
   //Verificación de roles (por ejemplo, "admin", "supervisor", etc.)
  const hasRole = (role: string): boolean => {
    return user?.roles.includes(role) || false;
  };
  //Objeto de contexto que agrupa todas las funciones y estados disponibles globalmente.
  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    hasPermission,
    hasRole
  };
  /**
   *Proveedor del contexto.
   *Hace que el valor de autenticación esté disponible en toda la app.
   */
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
 /**
  *Hook personalizado para consumir el contexto de autenticación.
  *Permite acceder fácilmente a `useAuth()` en cualquier componente.
  */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  // Si el hook se usa fuera del proveedor, lanzamos un error (buenas prácticas)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};