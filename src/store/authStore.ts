import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getProfile as apiGetProfile,
  updateProfile as apiUpdateProfile,
} from '@/api/services/authApi';
import type { ApiUser } from '@/types/api';

// Store User type expects id as string
interface User {
  id: string;
  name: string;
  email: string;
}

type AuthState = {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => Promise<void>;
  getProfile: () => Promise<void>;
  updateProfile: (data: {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
  }) => Promise<void>;
};

const ExpoSecureWrapper: StateStorage = {
  setItem(name, value) {
    SecureStore.setItem(name, value);
  },
  getItem(name) {
    return SecureStore.getItem(name);
  },
  async removeItem(name) {
    await SecureStore.deleteItemAsync(name);
  },
};

function apiUserToUser(apiUser: ApiUser): User {
  return {
    id: String(apiUser.id),
    name: apiUser.name,
    email: apiUser.email,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: async () => {
        await apiLogout();
        set({ user: null, token: null });
      },
      login: async (credentials) => {
        const res = await apiLogin(credentials);
        set({ user: apiUserToUser(res.data.user), token: res.data.token });
      },
      register: async (data) => {
        const res = await apiRegister(data);
        set({ user: apiUserToUser(res.data.user), token: res.data.token });
      },
      getProfile: async () => {
        const profile = await apiGetProfile();
        set((state) => ({ user: apiUserToUser(profile), token: state.token }));
      },
      updateProfile: async (data) => {
        const updated = await apiUpdateProfile(data);
        set((state) => ({ user: apiUserToUser(updated), token: state.token }));
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => ExpoSecureWrapper),
    }
  )
);
