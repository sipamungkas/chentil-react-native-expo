import { endpoints, get, post } from '../apiClient';
import type { Content } from '../../types/api';

// Get all favorite contents
export async function getFavorites(): Promise<Content[]> {
  return get<Content[]>(endpoints.favorites.list);
}

// Check if a content is favorited
export async function checkFavorite(
  contentId: number
): Promise<{ is_favorited: boolean }> {
  return get<{ is_favorited: boolean }>(endpoints.favorites.check(contentId));
}

// Toggle favorite status for a content
export async function toggleFavorite(contentId: number): Promise<void> {
  await post(endpoints.favorites.toggle(contentId));
}
