import { endpoints, get } from '../apiClient';
import type { Content } from '../../types/api';

export async function getDestinations(): Promise<Content[]> {
  return get<Content[]>(endpoints.contents.destinations);
}

export async function getOutbounds(): Promise<Content[]> {
  return get<Content[]>(endpoints.contents.outbounds);
}

export async function getCultures(): Promise<Content[]> {
  return get<Content[]>(endpoints.contents.cultures);
}

export async function getFoodAndBeverages(): Promise<Content[]> {
  return get<Content[]>(endpoints.contents.foodAndBeverages);
}

export async function getTopFavorites(): Promise<Content[]> {
  return get<Content[]>(endpoints.contents.topFavorites);
}
