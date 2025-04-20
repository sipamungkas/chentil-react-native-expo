import { endpoints, get } from '../apiClient';
import type { Content } from '../../types/api';

export interface RecommendationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: { url: string | null; label: string; active: boolean }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface RecommendationResponse {
  data: Content[];
  links: any;
  meta: RecommendationMeta;
}

export async function getRecommendations(params?: {
  per_page?: number;
  page?: number;
}): Promise<RecommendationResponse> {
  // Build query string if params are present
  let url = endpoints.recommendations.list;
  if (params) {
    const query = new URLSearchParams(params as any).toString();
    url += `?${query}`;
  }
  return get<RecommendationResponse>(url);
}
