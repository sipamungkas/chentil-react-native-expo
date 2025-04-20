import { endpoints, get, post } from '../apiClient';
import type { Content } from '../../types/api';

// Wishlist toggle response type
export interface WishlistToggleResponse {
  status: string;
  message: string;
  is_wishlisted: boolean;
}

// Check wishlist response type
export interface CheckWishlistResponse {
  status: string;
  data: {
    is_wishlisted: boolean;
  };
}

// Get all wishlisted contents
export async function getWishlists(): Promise<Content[]> {
  return get<Content[]>(endpoints.wishlists.list);
}

// Toggle wishlist status for a content
export async function toggleWishlist(
  contentId: number
): Promise<WishlistToggleResponse> {
  return await post<WishlistToggleResponse>(
    endpoints.wishlists.toggle(contentId)
  );
}

// Check if a content is wishlisted
export async function checkWishlist(
  contentId: number
): Promise<{ is_wishlisted: boolean }> {
  const res = await get<CheckWishlistResponse>(
    endpoints.wishlists.check(contentId)
  );
  return res.data; // returns { is_wishlisted: boolean }
}
