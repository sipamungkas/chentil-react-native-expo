import { endpoints, get, post } from '../apiClient';
import type { Content } from '../../types/api';

export async function getWishlists(): Promise<Content[]> {
  return get<Content[]>(endpoints.wishlists.list);
}

export async function toggleWishlist(contentId: number): Promise<void> {
  await post(endpoints.wishlists.toggle(contentId));
}

export async function checkWishlist(contentId: number): Promise<{ is_wishlisted: boolean }> {
  return get<{ is_wishlisted: boolean }>(endpoints.wishlists.check(contentId));
}
