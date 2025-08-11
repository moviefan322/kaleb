export interface Booking {
  id: string;
  start_time: string;
  end_time: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  notes?: string;
}