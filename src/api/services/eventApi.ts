import { get } from '../apiClient';

// Type for the event calendar response
export interface EventCalendarResponse {
  data: {
    [date: string]: {
      selected: boolean;
      marked: boolean;
      selectedColor: string;
      event: string;
      description: string;
    };
  };
}

// Fetch event calendar data
export const fetchEventCalendar = async (): Promise<EventCalendarResponse> => {
  return get<EventCalendarResponse>('/events');
};
