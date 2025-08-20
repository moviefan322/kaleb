import { useState, useEffect, useCallback } from "react";
import { fetchBookingsWindow } from "@/lib/booking";
import type { Booking } from "@/types/booking";
import { isAdmin } from "@/lib/session";
import { BookingDetail } from "./BookingDetail";
import { SlotsView } from "./SlotsView";
import { BookingForm } from "./BookingForm";

// DayScheduler.tsx
type Props = {
  selectedDate: Date;
};

const durationOptions = [30, 60, 90];

export default function DayScheduler({ selectedDate }: Props) {
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    start_time: "",
    end_time: "",
    type: "Thai Massage",
    submitting: false,
    durationMinutes: 30,
  });

  const conflictsWithBuffer = useCallback(
    (start: Date, durationMin: number, bufferMin = 15) => {
      const startMs = start.getTime();
      const endMs = startMs + durationMin * 60_000;
      const pad = bufferMin * 60_000;

      return bookings.some((b) => {
        if (b.type === "unavailable") return false;
        const s = new Date(b.start_time).getTime() - pad;
        const e = new Date(b.end_time).getTime() + pad;
        return s < endMs && e > startMs;
      });
    },
    [bookings]
  );

  const isDurationAllowed = useCallback(
    (slot: Date | null, minutes: number) =>
      !slot ? true : !conflictsWithBuffer(slot, minutes, 15),
    [conflictsWithBuffer]
  );

  useEffect(() => {
    if (!selectedSlot) return;
    const allowed = durationOptions.filter((m) =>
      isDurationAllowed(selectedSlot, m)
    );
    if (allowed.length === 0) {
      setSelectedSlot(null);
      return;
    }
    if (!allowed.includes(formState.durationMinutes)) {
      setFormState((s) => ({ ...s, durationMinutes: allowed[0] }));
    }
  }, [selectedSlot, bookings, formState.durationMinutes, isDurationAllowed]);

  const fetchBookingsByDate = useCallback(async (): Promise<Booking[]> => {
    // midnight at start of selectedDate
    const from = new Date(selectedDate);
    from.setHours(0, 0, 0, 0);

    // midnight at start of the next day
    const to = new Date(from);
    to.setDate(from.getDate() + 1);

    const { results } = await fetchBookingsWindow({
      from: from.toISOString(),
      to: to.toISOString(),
      sortBy: "start_time:asc",
    });

    // Filter to only include objects with Booking properties
    return results.filter(
      (b): b is Booking =>
        b &&
        typeof b === "object" &&
        "name" in b &&
        "email" in b &&
        "phone" in b &&
        typeof (b as { name?: unknown }).name === "string" &&
        typeof (b as { email?: unknown }).email === "string" &&
        typeof (b as { phone?: unknown }).phone === "string"
    );
  }, [selectedDate]);

  const refreshBookings = useCallback(async () => {
    const data = await fetchBookingsByDate();
    setBookings(data);
  }, [fetchBookingsByDate]);

  useEffect(() => {
    const loadBookings = async () => {
      const data = await fetchBookingsByDate();
      setBookings(data);
    };
    loadBookings();
  }, [selectedDate, fetchBookingsByDate]);

  return (
    <div className="day-scheduler-container">
      {selectedSlot && (
        <BookingForm
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
          formState={formState}
          setFormState={setFormState}
          conflictsWithBuffer={conflictsWithBuffer}
          refreshBookings={refreshBookings}
          isDurationAllowed={isDurationAllowed}
        />
      )}
      {!selectedSlot && !selectedBooking && (
        <SlotsView
          selectedDate={selectedDate}
          bookings={bookings}
          selectedSlot={selectedSlot}
          setSelectedBooking={setSelectedBooking}
          setSelectedSlot={setSelectedSlot}
          formState={formState}
          conflictsWithBuffer={conflictsWithBuffer}
          refreshBookings={refreshBookings}
        />
      )}
      {isAdmin() && selectedBooking && (
        <BookingDetail
          selectedBooking={selectedBooking}
          setSelectedBooking={setSelectedBooking}
          refreshBookings={refreshBookings}
        />
      )}
      {/* Styles */}
      <style jsx>{`
        .day-scheduler-container {
          padding: 10px;
          width: 300px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
          flex-grow: 1;
          max-height: 600px;
          overflow-y: auto;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
