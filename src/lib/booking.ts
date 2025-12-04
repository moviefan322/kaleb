// lib/bookings.ts
import api, { apiGet, apiPost, apiDelete, apiPatch } from "@/lib/api";
import type { AxiosError } from "axios";
import type { Booking } from "@/types/booking";
import { getAccessToken } from "@/lib/session";

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

export async function getWeekBookingStatus(weekStart: Date): Promise<{
  hasRealBookings: Map<string, boolean>;
  isBlocked: Map<string, boolean>;
}> {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 8); // Get 8 days to cover the full week

  try {
    const response = await fetchBookingsWindow({
      from: weekStart.toISOString(),
      to: weekEnd.toISOString(),
    });

    const hasRealBookings = new Map<string, boolean>();
    const isBlocked = new Map<string, boolean>();

    // Check each day in the week (8 days based on your WeekSelector)
    for (let i = 0; i < 8; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      const dayKey = day.toDateString();

      const dayStart = new Date(day);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(day);
      dayEnd.setHours(23, 59, 59, 999);

      const dayBookings = response.results.filter((booking) => {
        const bookingStart = new Date(booking.start_time);
        return bookingStart >= dayStart && bookingStart <= dayEnd;
      });

      // Check if day has real bookings
      const hasReal = dayBookings.some(
        (booking) => booking.type !== "unavailable"
      );
      hasRealBookings.set(dayKey, hasReal);

      // Check if day is blocked (mostly unavailable slots)
      const unavailableCount = dayBookings.filter(
        (b) => b.type === "unavailable"
      ).length;
      isBlocked.set(dayKey, unavailableCount >= 20);
    }

    return { hasRealBookings, isBlocked };
  } catch (e) {
    console.error("Error fetching week booking status:", e);
    // Return empty maps - buttons won't show (safer)
    return {
      hasRealBookings: new Map(),
      isBlocked: new Map(),
    };
  }
}

export async function markDayAsUnavailable(day: Date): Promise<Booking[]> {
  const startOfDay = new Date(day);
  startOfDay.setHours(7, 0, 0, 0); // 7 AM start

  const endOfDay = new Date(day);
  endOfDay.setHours(18, 0, 0, 0); // 6 PM end (11 hours total)

  const bookings: Booking[] = [];

  try {
    // Create 30-minute unavailable slots for the entire day
    for (let hour = 7; hour < 18; hour++) {
      for (let half = 0; half < 60; half += 30) {
        const start = new Date(day);
        start.setHours(hour, half, 0, 0);

        const end = new Date(start.getTime() + (29 * 60 + 59) * 1000);

        const booking = await apiPost<Booking>("/bookings", {
          name: "n/a",
          email: "unavailable@unavailable.com",
          phone: "212-555-5555",
          type: "unavailable",
          start_time: start.toISOString(),
          end_time: end.toISOString(),
        });

        bookings.push(booking);
      }
    }

    return bookings;
  } catch (e) {
    throw new Error(msgFromAxios(e, "Mark day as unavailable failed"));
  }
}

export async function markDayAsAvailable(day: Date): Promise<void> {
  // Check if user is admin before proceeding
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("Please log in as admin to unblock days");
  }

  const dayStart = new Date(day);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(day);
  dayEnd.setHours(23, 59, 59, 999);

  try {
    // Fetch bookings for this day - admin token is required for deletion anyway
    const response = await fetchBookingsWindow({
      from: dayStart.toISOString(),
      to: dayEnd.toISOString(),
      type: "unavailable",
    });

    const unavailableBookings = response.results.filter((booking) => {
      const bookingStart = new Date(booking.start_time);
      return (
        bookingStart >= dayStart &&
        bookingStart <= dayEnd &&
        booking.type === "unavailable"
      );
    });

    // Type guard to ensure we have full booking objects with id
    const bookingsWithId = unavailableBookings.filter(
      (booking): booking is Booking =>
        "id" in booking && booking.id !== undefined
    );

    if (bookingsWithId.length === 0) {
      console.warn("No unavailable bookings found with valid IDs");
      return;
    }

    console.log(
      `Attempting to delete ${bookingsWithId.length} unavailable bookings`
    );

    await Promise.all(
      bookingsWithId.map((booking) => deleteBooking(booking.id))
    );
  } catch (e) {
    console.error("Error in markDayAsAvailable:", e);

    // Check if it's an authentication error
    if (e instanceof Error && e.message.includes("Please authenticate")) {
      throw new Error("Session expired. Please log in again as admin.");
    }

    throw new Error(msgFromAxios(e, "Mark day as available failed"));
  }
}

export async function isDayBlocked(day: Date): Promise<boolean> {
  const dayStart = new Date(day);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(day);
  dayEnd.setHours(23, 59, 59, 999);

  try {
    const response = await fetchBookingsWindow({
      from: dayStart.toISOString(),
      to: dayEnd.toISOString(),
      type: "unavailable",
    });

    const unavailableSlots = response.results.filter((booking) => {
      const bookingStart = new Date(booking.start_time);
      return (
        bookingStart >= dayStart &&
        bookingStart <= dayEnd &&
        booking.type === "unavailable"
      );
    }).length;

    // If most/all business hours are unavailable, consider the day blocked
    return unavailableSlots >= 20; // 22 total slots in 11-hour day, allow some flexibility
  } catch (e) {
    console.error("Error checking if day is blocked:", e);
    return false; // Default to not blocked if we can't check
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

export async function confirmBooking(bookingId: string): Promise<Booking> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("Please log in as admin to confirm bookings");
  }
  try {
    const data = await apiPatch<Booking>(`/bookings/${bookingId}/confirm`);
    return data;
  } catch (e) {
    throw new Error(msgFromAxios(e, "Confirm booking failed"));
  }
}

// --- UNCONFIRMED BOOKINGS ---
export async function fetchUnconfirmedBookings(): Promise<Booking[]> {
  try {
    const data = await apiGet<{ results: Booking[] }>("/bookings/unconfirmed");
    return data.results;
  } catch (e) {
    throw new Error(msgFromAxios(e, "Fetch unconfirmed bookings failed"));
  }
}

export async function rejectBooking(
  id: string,
  message: string
): Promise<void> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("Please log in as admin to reject bookings");
  }
  try {
    await apiDelete<void>(`/bookings/${id}/reject`, {
      data: { message },
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    if (e && typeof e === "object" && "response" in e) {
      console.error("Reject booking failed, response:", e.response);
    }
    throw new Error(msgFromAxios(e, "Reject booking failed"));
  }
}
