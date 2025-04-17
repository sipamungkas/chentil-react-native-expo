import { create } from 'zustand';
import { router } from 'expo-router';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

// Dummy user database
const DUMMY_USERS: User[] = [
  {
    id: '1',
    name: 'Ragil Pamungkas',
    email: 'ragil@sipamungkas.com',
  },
];

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
    (set) => ({
      user: null,
      isLoading: false,
      signIn: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Find user with matching email (dummy authentication)
          const foundUser = DUMMY_USERS.find((u) => u.email === email);
          if (!foundUser) {
            throw new Error('Invalid credentials');
          }

          // In a real app, you would verify the password hash here
          if (password !== 'password123') {
            throw new Error('Invalid credentials');
          }

          set({ user: foundUser });
          router.replace('/(tabs)');
        } finally {
          set({ isLoading: false });
        }
      },

      signUp: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Check if user already exists
          if (DUMMY_USERS.some((u) => u.email === email)) {
            throw new Error('User already exists');
          }

          // Create new user
          const newUser: User = {
            id: String(DUMMY_USERS.length + 1),
            name,
            email,
          };

          // In a real app, you would hash the password and save to a database
          DUMMY_USERS.push(newUser);
          set({ user: newUser });
          router.replace('/(tabs)');
        } finally {
          set({ isLoading: false });
        }
      },

      signOut: () => {
        set({ user: null });
        router.replace('/(auth)/login');
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => ExpoSecureWrapper),
    }
  )
);
