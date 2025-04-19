import { endpoints, get, post, put } from '../apiClient';
import type {
  ApiResponseSuccess,
  ApiUser,
  LoginResponse,
  RegisterResponse,
} from '../../types/api';
import { useAuthStore } from '@/store/authStore';

// Auth API functions (no hooks, just async functions)

export async function login(credentials: {
  email: string;
  password: string;
}): Promise<ApiResponseSuccess<LoginResponse>> {
  const response = await post<ApiResponseSuccess<LoginResponse>>(
    endpoints.auth.login,
    credentials
  );

  return response;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Promise<ApiResponseSuccess<RegisterResponse>> {
  const response = await post<ApiResponseSuccess<RegisterResponse>>(
    endpoints.auth.register,
    data
  );
  return response;
}

export async function logout(): Promise<void> {
  await post(endpoints.auth.logout);
  useAuthStore.getState().logout();
}

export async function getProfile(): Promise<ApiUser> {
  return get<ApiUser>(endpoints.auth.profile);
}

export async function updateProfile(data: {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}): Promise<ApiUser> {
  return put<ApiUser>(endpoints.auth.profile, data);
}
