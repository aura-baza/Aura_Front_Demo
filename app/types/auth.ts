// Tipos e interfaces de Autenticación//

/**
 *Representa al usuario autenticado en el sistema.
 *Se utiliza en toda la aplicación para acceder a información del usuario logueado.
 */
export interface AuthUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  permissions: string[];
}

//Estructura de datos enviada al iniciar sesión
export interface LoginRequest {
  username: string;
  password: string;
}
//Estructura de la respuesta devuelta al autenticarse correctamente
export interface LoginResponse {
  user: AuthUser;
  token: string;
  refreshToken: string;
}

// Contexto de Autenticación//

/**
 *Define la forma del contexto global de autenticación en React.
 *Permite acceder a los datos del usuario y funciones relacionadas con la sesión.
 */
export interface AuthContextType {
  user: AuthUser | null; //Usuario autenticado o null si no hay sesión activa
  token: string | null; //Token JWT almacenado en memoria
  login: (credentials: LoginRequest) => Promise<void>;  //Función para iniciar sesión
  logout: () => void;  //Función para cerrar sesión
  isAuthenticated: boolean; //Indica si el usuario está autenticado
  isLoading: boolean; //Indica si el usuario está autenticado
  hasPermission: (permission: string) => boolean; //Verifica si el usuario tiene un permiso específico
  hasRole: (role: string) => boolean; //Verifica si el usuario pertenece a un rol específico
}