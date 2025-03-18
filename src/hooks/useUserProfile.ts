import { useQuery } from '@tanstack/react-query';

interface UserProfile {
  name: string;
  email: string;
}

const fetchUserProfile = async (): Promise<UserProfile> => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    name: 'John Doe',
    email: 'john@example.com'
  };
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile
  });
}; 