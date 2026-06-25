import { api } from './client.api';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const usersApi = {
  list: (params?: { page?: string }) => api.get<User[]>('/users', { params }),
  get: (id: string) => api.get<User>(`/users/${id}`),
  create: (data: Partial<User>) => api.post<User>('/users', data),
  update: (id: string, data: Partial<User>) => api.put<User>(`/users/${id}`, data),
  delete: (id: string) => api.delete<void>(`/users/${id}`),
};
