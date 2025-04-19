import { useMutation } from '@tanstack/react-query';
import { mutationOptions, endpoints } from '../api/apiClient';
import { useAuthStore } from '../store/authStore';
import { ApiResponseSuccess, LoginResponse, RegisterResponse } from '../types/api';

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    ...mutationOptions<ApiResponseSuccess<LoginResponse>, { email: string; password: string }>(
      endpoints.auth.login,
      'POST',
      { auth: false }
    ),
    onSuccess: (response) => {
      setAuth(response.data.user, response.data.token);
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    ...mutationOptions<ApiResponseSuccess<RegisterResponse>, {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    }>(
      endpoints.auth.register,
      'POST',
      { auth: false }
    ),
    onSuccess: (response) => {
      setAuth(response.data.user, response.data.token);
    },
  });
}
