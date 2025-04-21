import { endpoints, get } from '../apiClient';
import type { Content } from '../../types/api';

export interface NearbyParams {
  latitude: number;
  longitude: number;
  per_page?: number;
  max_distance?: number;
}

export async function getNearby(params: NearbyParams): Promise<Content[]> {
  const url = `${endpoints.nearby.list}`;
  const searchParams = new URLSearchParams({
    latitude: params.latitude.toString(),
    longitude: params.longitude.toString(),
    ...(params.per_page && { per_page: params.per_page.toString() }),
    ...(params.max_distance && { max_distance: params.max_distance.toString() })
  }).toString();
  const response = await get<{ data: Content[] }>(`${url}?${searchParams}`);
  return response.data;
}
