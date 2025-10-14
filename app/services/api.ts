// Define la URL base del backend. Si no hay variable de entorno, usa localhost.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

class ApiClient {
  private baseURL: string;          // URL base del backend
  private token: string | null = null; // Token JWT de acceso
  private refreshToken: string | null = null; // Token de renovación
  private isRefreshing = false;     // Evita múltiples renovaciones simultáneas

  constructor(baseURL: string) {
    this.baseURL = baseURL;

    // Solo ejecuta en el navegador (no en SSR)
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
      this.refreshToken = localStorage.getItem("refresh_token");
    }
  }

  /**
   *   Guarda los tokens en memoria y en localStorage
   * - accessToken: se usa para las peticiones
   * - refreshToken: se usa cuando el access expira
   */
  setToken(accessToken: string | null, refreshToken?: string | null) {
    this.token = accessToken;

    if (typeof window !== "undefined") {
      // Guarda o elimina el access token
      if (accessToken) localStorage.setItem("auth_token", accessToken);
      else localStorage.removeItem("auth_token");

      // Guarda o elimina el refresh token (si lo recibe)
      if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
      else if (refreshToken === null) localStorage.removeItem("refresh_token");
    }
  }

  /**
   *   Intenta renovar el access token usando el refresh token
   * - Si tiene éxito, actualiza ambos tokens.
   * - Si falla, cierra sesión automáticamente.
   */
  private async refreshAccessToken(): Promise<boolean> {
    if (this.isRefreshing) return false; // evita llamadas duplicadas
    this.isRefreshing = true;

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      // Si el refresh token ya no es válido, forzar logout
      if (!response.ok) throw new Error("Refresh token failed");

      // Si todo va bien, guarda los nuevos tokens
      const data = await response.json();
      this.setToken(data.accessToken, data.refreshToken ?? this.refreshToken);
      return true;
    } catch (error) {
      console.error("Token refresh error:", error);
      this.logout(); // borra los tokens y fuerza cierre de sesión
      return false;
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   *  Método central que realiza las solicitudes HTTP.
   * - Añade el token al header.
   * - Si el token expira (401/403), intenta renovarlo y reintenta la petición.
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    // const headers: HeadersInit = {
    //   "Content-Type": "application/json",
    //   ...options.headers,
    // };
    const headers: Record<string, string> = {
  "Content-Type": "application/json",
  ...((options.headers as Record<string, string>) || {}),
};


    // Si hay token, agregarlo al header Authorization
    if (this.token) headers.Authorization = `Bearer ${this.token}`;

    let response = await fetch(url, { ...options, headers });

    // Si la API responde 401 o 403 → el token expiró
    if (response.status === 401 || response.status === 403) {
      const refreshed = await this.refreshAccessToken();

      //  Si el refresh fue exitoso, reintenta la petición original
      if (refreshed && this.token) {
        headers.Authorization = `Bearer ${this.token}`;
        response = await fetch(url, { ...options, headers });
      } else {
        throw new Error("Session expired. Please log in again.");
      }
    }

    //  Manejo de errores genérico (por ejemplo 404 o 500)
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Network error" }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    // Devuelve el cuerpo en JSON (tipo genérico <T>)
    return response.json();
  }

  //  Métodos CRUD que reutilizan request():
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  /**
   *  Limpia tokens y deja al usuario completamente deslogueado
   */
  logout() {
    this.token = null;
    this.refreshToken = null;

    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
    }
  }
}

// Exporta una única instancia reutilizable en toda la app
export const apiClient = new ApiClient(API_BASE_URL);

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// class ApiClient {
//   private baseURL: string;
//   private token: string | null = null;

//   constructor(baseURL: string) {
//     this.baseURL = baseURL;
//     this.token = localStorage.getItem('auth_token');
//   }

//   setToken(token: string | null) {
//     this.token = token;
//     if (token) {
//       localStorage.setItem('auth_token', token);
//     } else {
//       localStorage.removeItem('auth_token');
//     }
//   }

//   private async request<T>(
//     endpoint: string,
//     options: RequestInit = {}
//   ): Promise<T> {
//     const url = `${this.baseURL}${endpoint}`;
//     const headers: HeadersInit = {
//       'Content-Type': 'application/json',
//       ...options.headers,
//     };

//     if (this.token) {
//       headers.Authorization = `Bearer ${this.token}`;
//     }

//     const response = await fetch(url, {
//       ...options,
//       headers,
//     });

//     if (!response.ok) {
//       const error = await response.json().catch(() => ({ message: 'Network error' }));
//       throw new Error(error.message || `HTTP error! status: ${response.status}`);
//     }

//     return response.json();
//   }

//   async get<T>(endpoint: string): Promise<T> {
//     return this.request<T>(endpoint, { method: 'GET' });
//   }

//   async post<T>(endpoint: string, data?: unknown): Promise<T> {
//     return this.request<T>(endpoint, {
//       method: 'POST',
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }

//   async put<T>(endpoint: string, data?: unknown): Promise<T> {
//     return this.request<T>(endpoint, {
//       method: 'PUT',
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }

//   async delete<T>(endpoint: string): Promise<T> {
//     return this.request<T>(endpoint, { method: 'DELETE' });
//   }
// }

// export const apiClient = new ApiClient(API_BASE_URL);