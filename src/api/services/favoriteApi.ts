import { endpoints, get, post } from '../apiClient';
import type { Content } from '../../types/api';

// Favorite toggle response type
export interface FavoriteToggleResponse {
  status: string;
  message: string;
  is_favorited: boolean;
}

// Check favorite response type
export interface CheckFavoriteResponse {
  status: string;
  data: {
    is_favorited: boolean;
  };
}

// Get all favorite contents
export async function getFavorites(): Promise<Content[]> {
  return get<Content[]>(endpoints.favorites.list);
}

// Check if a content is favorited
export async function checkFavorite(
  contentId: number
): Promise<{ is_favorited: boolean }> {
  const res = await get<CheckFavoriteResponse>(
    endpoints.favorites.check(contentId)
  );
  return res.data; // returns { is_favorited: boolean }
}

// Toggle favorite status for a content
export async function toggleFavorite(
  contentId: number
): Promise<FavoriteToggleResponse> {
  return await post<FavoriteToggleResponse>(
    endpoints.favorites.toggle(contentId)
  );
}
