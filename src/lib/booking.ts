// lib/bookings.ts
import api, { apiGet, apiPost, apiDelete, apiPatch } from "@/lib/api";
import type { AxiosError } from "axios";
import type { Booking } from "@/types/booking";

// Server returns a paginated envelope
export type Paginated<T> = {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

// Public payload omits PII when no admin token is sent
export type BookingPublic = Pick<
  Booking,
  "id" | "start_time" | "end_time" | "type"
>;

// --- utils ---
function msgFromAxios(e: unknown, fallback: string) {
  const err = e as AxiosError<unknown>;
  const data = err.response?.data;
  const message =
    data && typeof data === "object" && "message" in data
      ? (data as { message?: string }).message
      : undefined;
  return message || err.message || fallback;
}

// Build query string safely
function qs(params: Record<string, string | number | undefined>) {
  const u = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") u.append(k, String(v));
  });
  return u.toString();
}

// --- READ: public/admin unified list ---
/**
 * GET /v1/bookings
 * - Without token → results are BookingPublic[]
 * - With admin token → results are Booking[]
 */
export async function fetchBookingsWindow(opts: {
  from: string; // ISO datetime
  to: string; // ISO datetime
  type?: string;
  page?: number;
  limit?: number;
  sortBy?: string; // e.g. "start_time:asc"
}): Promise<Paginated<Booking | BookingPublic>> {
  try {
    const query = qs(opts);
    return await apiGet<Paginated<Booking | BookingPublic>>(
      `/bookings?${query}`
    );
  } catch (e) {
    console.error("Fetch bookings error:", e);
    throw new Error(msgFromAxios(e, "Fetch bookings failed"));
  }
}

// --- READ: by id (public gets redacted, admin gets full) ---
export async function fetchBookingById(
  id: string
): Promise<Booking | BookingPublic> {
  try {
    // NOTE: Your current routes require admin for /:id.
    // If you adopted the "optionalAuth" redaction approach for :id, this works for both.
    const { data } = await api.get<Booking | BookingPublic>(`/bookings/${id}`);
    return data;
  } catch (e) {
    throw new Error(msgFromAxios(e, "Fetch booking failed"));
  }
}

// --- CREATE: public create (no token required) ---
export type CreateBookingInput = {
  name: string;
  email: string;
  phone: string;
  type: string;
  notes?: string;
  start_time: string; // ISO
  end_time: string; // ISO
};

export async function createBooking(
  input: CreateBookingInput
): Promise<Booking> {
  try {
    const data = await apiPost<Booking>("/bookings", input);
    return data;
  } catch (e) {
    throw new Error(msgFromAxios(e, "Create booking failed"));
  }
}

export async function markAsUnavailable(time: Date | string): Promise<Booking> {
  const start = new Date(time);
  if (Number.isNaN(start.getTime())) {
    throw new Error("Invalid time for unavailable slot");
  }

  const startISO = start.toISOString();
  const end = new Date(start.getTime() + (29 * 60 + 59) * 1000);
  const endISO = end.toISOString();

  try {
    const data = await apiPost<Booking>("/bookings", {
      name: "n/a",
      email: "unavailable@unavailable.com",
      phone: "212-555-5555",
      type: "unavailable",
      start_time: startISO,
      end_time: endISO,
    });
    return data;
  } catch (e) {
    throw new Error(msgFromAxios(e, "Mark as unavailable failed"));
  }
}

// --- UPDATE (admin) ---
export type UpdateBookingInput = Partial<CreateBookingInput>;

export async function updateBooking(
  id: string,
  patch: UpdateBookingInput
): Promise<Booking> {
  try {
    const data = await apiPatch<Booking>(`/bookings/${id}`, patch);
    return data;
  } catch (e) {
    throw new Error(msgFromAxios(e, "Update booking failed"));
  }
}

// --- DELETE (admin) ---
export async function deleteBooking(id: string): Promise<void> {
  try {
    await apiDelete<void>(`/bookings/${id}`);
  } catch (e) {
    throw new Error(msgFromAxios(e, "Delete booking failed"));
  }
}
