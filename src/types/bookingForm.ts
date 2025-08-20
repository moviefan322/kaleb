export interface BookingFormState {
  name: string;
  email: string;
  phone: string;
  notes: string;
  start_time: string;
  end_time: string;
  type: string;
  submitting: boolean;
  durationMinutes: number;
}
