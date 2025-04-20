import { endpoints, get } from '../apiClient';
import type { Island } from '../../types/api';

export async function getIslands(): Promise<Island[]> {
  // If paginated, you may want to handle pagination params here
  return get<{ data: Island[] }>(endpoints.islands.list).then(
    (res) => res.data
  );
}
