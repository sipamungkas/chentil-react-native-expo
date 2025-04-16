import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

// Dummy user data type
interface User {
  id: string;
  name: string;
  email: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Dummy user database
const DUMMY_USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    // password: "password123"
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const rootSegment = useSegments()[0];
  const router = useRouter();

  useEffect(() => {
    if (!user && rootSegment !== '(auth)') {
      router.replace('/(auth)/login');
    } else if (user && rootSegment === '(auth)') {
      router.replace('/(tabs)');
    }
  }, [user, rootSegment]);

  const signIn = async (email: string, password: string) => {
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

    setUser(foundUser);
  };

  const signUp = async (name: string, email: string, password: string) => {
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
    setUser(newUser);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 