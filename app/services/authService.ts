import { apiClient } from './api';
import type { LoginRequest, LoginResponse, AuthUser } from '../types/auth';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Mock implementation - replace with actual API call
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const mockResponse: LoginResponse = {
        user: {
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
        },
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now()
      };
      return mockResponse;
    }
    throw new Error('Invalid credentials');
  },

  async logout(): Promise<void> {
    // Mock implementation
    return Promise.resolve();
  },

  async getCurrentUser(): Promise<AuthUser> {
    // Mock implementation - replace with actual API call
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

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    // Mock implementation
    return this.getCurrentUser().then(user => ({
      user,
      token: 'new-mock-jwt-token-' + Date.now(),
      refreshToken: 'new-mock-refresh-token-' + Date.now()
    }));
  }
};