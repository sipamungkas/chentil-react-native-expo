import { endpoints, get, post, put, del } from '../apiClient';
import type { Trip } from '../../types/api';

export async function getTrips(): Promise<Trip[]> {
  return get<Trip[]>(endpoints.trips.list);
}

export async function getTrip(tripId: number): Promise<Trip> {
  return get<Trip>(endpoints.trips.get(tripId));
}

export async function createTrip(data: { name: string; description?: string }): Promise<Trip> {
  return post<Trip>(endpoints.trips.create, data);
}

export async function updateTrip(tripId: number, data: { name?: string; description?: string }): Promise<Trip> {
  return put<Trip>(endpoints.trips.update(tripId), data);
}

export async function deleteTrip(tripId: number): Promise<Trip> {
  return del<Trip>(endpoints.trips.delete(tripId));
}

export async function addContentToTrip(tripId: number, data: { content_id: number }): Promise<Trip> {
  return post<Trip>(endpoints.trips.addContent(tripId), data);
}

export async function removeContentFromTrip(tripId: number, contentId: number): Promise<Trip> {
  return del<Trip>(endpoints.trips.removeContent(tripId, contentId));
}
