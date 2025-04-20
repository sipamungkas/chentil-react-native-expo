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
import { router } from 'expo-router';

type AuthState = {
  user: ApiUser | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: ApiUser, token: string) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      setAuth: (user, token) => set({ user, token }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: async () => {
        set({ isLoading: true });
        try {
          apiLogout();
          set({ user: null, token: null });
          router.replace('/(auth)/login');
        } finally {
          set({ isLoading: false });
        }
      },
      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const res = await apiLogin(credentials);
          console.log({ res });
          set({ user: res.data.user, token: res.data.token });
        } finally {
          set({ isLoading: false });
        }
      },
      register: async (data) => {
        set({ isLoading: true });
        try {
          const res = await apiRegister(data);
          set({ user: res.data.user, token: res.data.token });
        } finally {
          set({ isLoading: false });
        }
      },
      getProfile: async () => {
        set({ isLoading: true });
        try {
          const profile = await apiGetProfile();
          set((state) => ({ user: profile, token: state.token }));
        } finally {
          set({ isLoading: false });
        }
      },
      updateProfile: async (data) => {
        set({ isLoading: true });
        try {
          const updated = await apiUpdateProfile(data);
          set((state) => ({ user: updated, token: state.token }));
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => ExpoSecureWrapper),
    }
  )
);
