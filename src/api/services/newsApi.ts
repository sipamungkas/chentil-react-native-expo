import { News } from '@/src/types/api';
import { endpoints, get } from '../apiClient';
import { ApiResponseSuccess } from '../../types/api';

export async function getNews(): Promise<ApiResponseSuccess<News[]>> {
  // Adjust endpoint if needed
  return get<ApiResponseSuccess<News[]>>(endpoints.news.list);
}
