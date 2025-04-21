// Types for API responses based on chentil.postman_collection.json

export interface ApiResponseSuccess<T> {
  status: 'success';
  message: string;
  data: T;
  links?: Links;
  meta?: Meta;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface MetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

// User type for login/register responses
export interface ApiUser {
  id: number;
  name: string;
  email: string;
  role?: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}

// Login response type
export interface LoginResponse {
  user: ApiUser;
  token: string;
}

// Register response type
export interface RegisterResponse {
  user: ApiUser;
  token: string;
}

// Content types
export interface Island {
  id: number;
  name: string;
  description?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
  provinces_count?: number;
}

export interface Province {
  id: number;
  code: string;
  name: string;
  island_id: number;
  description: string | null;
  created_at: string;
  updated_at: string;
  island?: Island;
}

export interface Regency {
  id: number;
  code: string;
  province_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface District {
  id: number;
  code: string;
  regency_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Content {
  id: number;
  title: string;
  description: string;
  category: 'destination' | 'outbound' | 'culture' | 'food';
  province_id: number;
  regency_id: number;
  district_id: number;
  image: string;
  recommendation: boolean;
  since_century: number | null;
  established_year: number | null;
  latitude: number | null;
  longitude: number | null;
  is_visible: boolean;
  order: number;
  created_at: string;
  updated_at: string;
  district?: District;
  province?: Province;
  regency?: Regency;
}

// Trip types
export interface Trip {
  id: number;
  name: string;
  description?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  contents?: Content[];
}

export interface News {
  id: number;
  title: string;
  image: string;
  date: string;
  description: string;
}

export interface WishlistCount {
  destination: number;
  outbound: number;
  culture: number;
  fnb: number;
}

// Example usage:
// ApiResponseSuccess<LoginResponse>
// ApiResponseSuccess<RegisterResponse>
// ApiResponseSuccess<Content[]>
// ApiResponseSuccess<Trip[]>
