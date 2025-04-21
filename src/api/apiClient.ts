// Axios-based API client for REST requests
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { useAuthStore } from '../store/authStore';

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api2';

// Helper to get auth token (customize as needed)
export function getAuthToken(): string | undefined | null {
  // Use your own storage (e.g., Zustand, Context, or SecureStore)
  return useAuthStore.getState().token;
}

// Create an Axios instance
export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor for auth
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Generic helpers
export async function get<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await api.get<T>(url, config);
  return res.data;
}

export async function post<T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await api.post<T>(url, data, config);
  console.log({ res, url, data, config, api });
  return res.data;
}

export async function put<T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await api.put<T>(url, data, config);
  return res.data;
}

export async function del<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await api.delete<T>(url, config);
  return res.data;
}

// API endpoints (for convenience)
export const endpoints = {
  auth: {
    login: '/login',
    register: '/register',
    logout: '/logout',
    profile: '/profile',
  },
  contents: {
    destinations: '/destinations',
    outbounds: '/outbounds',
    cultures: '/cultures',
    foodAndBeverages: '/food-and-beverages',
    topFavorites: '/top-favorites',
  },
  favorites: {
    list: '/favorites',
    toggle: (contentId: number) => `/favorites/${contentId}`,
    check: (contentId: number) => `/favorites/${contentId}/check`,
  },
  trips: {
    list: '/trips',
    create: '/trips',
    get: (id: number) => `/trips/${id}`,
    update: (id: number) => `/trips/${id}`,
    delete: (id: number) => `/trips/${id}`,
    addContent: (tripId: number) => `/trips/${tripId}/contents`,
    removeContent: (tripId: number, contentId: number) =>
      `/trips/${tripId}/contents/${contentId}`,
  },

  wishlists: {
    list: '/wishlists',
    toggle: (contentId: number) => `/wishlists/${contentId}`,
    check: (contentId: number) => `/wishlists/${contentId}/check`,
    count: '/wishlists/category-counts',
    destinations: '/wishlists/destinations',
    outbound: '/wishlists/outbounds',
    fnb: '/wishlists/fnb',
    culture: '/wishlists/culture',
  },
  news: {
    list: '/news',
  },
  islands: {
    list: '/islands',
  },
  recommendations: {
    list: '/recommendations',
  },
  provinces: {
    list: '/provinces',
  },
  nearby: {
    list: '/nearby',
  },
};
