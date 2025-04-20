import { endpoints, get } from '../apiClient';
import type { ApiResponseSuccess, Content, Province } from '../../types/api';

export async function getDestinations(
  per_page = 10,
  page = 1,
  params: Record<string, any> = {}
): Promise<ApiResponseSuccess<Content[]>> {
  const searchParams = new URLSearchParams({
    per_page: String(per_page),
    page: String(page),
    ...Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ),
  }).toString();

  return get<ApiResponseSuccess<Content[]>>(
    `${endpoints.contents.destinations}?${searchParams}`
  );
}

export async function getDestinationsByIsland(
  islandId: number,
  per_page = 10,
  page = 1
): Promise<ApiResponseSuccess<Content[]>> {
  return getDestinations(per_page, page, { island_id: islandId });
}

export async function getOutbounds(
  per_page = 10,
  page = 1,
  params: Record<string, any> = {}
): Promise<ApiResponseSuccess<Content[]>> {
  const searchParams = new URLSearchParams({
    per_page: String(per_page),
    page: String(page),
    ...Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ),
  }).toString();
  return get<ApiResponseSuccess<Content[]>>(
    `${endpoints.contents.outbounds}?${searchParams}`
  );
}

export async function getCultures(
  per_page = 10,
  page = 1,
  params: Record<string, any> = {}
): Promise<ApiResponseSuccess<Content[]>> {
  const searchParams = new URLSearchParams({
    per_page: String(per_page),
    page: String(page),
    ...Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ),
  }).toString();
  return get<ApiResponseSuccess<Content[]>>(
    `${endpoints.contents.cultures}?${searchParams}`
  );
}

export async function getFoodAndBeverages(
  per_page = 10,
  page = 1,
  params: Record<string, any> = {}
): Promise<ApiResponseSuccess<Content[]>> {
  const searchParams = new URLSearchParams({
    per_page: String(per_page),
    page: String(page),
    ...Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ),
  }).toString();
  return get<ApiResponseSuccess<Content[]>>(
    `${endpoints.contents.foodAndBeverages}?${searchParams}`
  );
}

export async function getTopFavorites(
  per_page = 10,
  page = 1,
  params: Record<string, any> = {}
): Promise<ApiResponseSuccess<Content[]>> {
  const searchParams = new URLSearchParams({
    per_page: String(per_page),
    page: String(page),
    ...Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ),
  }).toString();
  return get<ApiResponseSuccess<Content[]>>(
    `${endpoints.contents.topFavorites}?${searchParams}`
  );
}

// --- ADDED: Fetch provinces ---
export async function getProvinces(): Promise<Province[]> {
  // This assumes you have an endpoint for provinces, e.g. endpoints.provinces.list
  // If not, please adjust accordingly.
  return get<{ data: Province[] }>(endpoints.provinces.list).then(res => res.data);
}
