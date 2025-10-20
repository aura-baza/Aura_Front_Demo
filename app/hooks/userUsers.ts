import { useState, useEffect } from 'react';
import type { User, UserFilters, PaginatedResponse, CreateUserRequest, UpdateUserRequest } from '~/types/user';
import { userService } from '~/services/userService';

export const useUsers = (
  page: number = 1,
  limit: number = 25,
  filters: UserFilters = {}
) => {
  const [data, setData] = useState<PaginatedResponse<User> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await userService.getUsers(page, limit, filters);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, JSON.stringify(filters)]);

  const refetch = () => {
    fetchUsers();
  };

  return {
    data,
    isLoading,
    error,
    refetch
  };
};

export const useUserActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (userData: CreateUserRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await userService.createUser(userData);
      return user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id: string, userData: UpdateUserRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await userService.updateUser(id, userData);
      return user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await userService.deleteUser(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const bulkUpdateUsers = async (userIds: string[], updates: Partial<UpdateUserRequest>) => {
    try {
      setIsLoading(true);
      setError(null);
      const users = await userService.bulkUpdateUsers(userIds, updates);
      return users;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update users';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createUser,
    updateUser,
    deleteUser,
    bulkUpdateUsers,
    isLoading,
    error
  };
};