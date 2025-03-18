import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from './api.js';

// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

// User API endpoints
const USER_ENDPOINTS = {
  PROFILE: '/user/profile',
  UPDATE: '/user/update',
};

// Fetch current user profile
const fetchUserProfile = async (): Promise<User> => {
  return apiRequest<User>(USER_ENDPOINTS.PROFILE);
};

// Update user profile
const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  return apiRequest<User>(USER_ENDPOINTS.UPDATE, 'PUT', userData);
};

// React Query hooks
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      // Or directly update the cache:
      // queryClient.setQueryData(['userProfile'], data);
    },
  });
}; 