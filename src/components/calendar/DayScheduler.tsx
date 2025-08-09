import React, { useState, useEffect, useCallback } from "react";

// DayScheduler.tsx
type Props = {
  selectedDate: Date;
};

interface Booking {
  id: string;
  start_time: string;
  end_time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export default function DayScheduler({ selectedDate }: Props) {
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    start_time: "",
    end_time: "",
    submitting: false,
    durationMinutes: 30,
  });

  const isoAt = useCallback((base: Date, h: number, m: number) => {
    const d = new Date(base);
    d.setHours(h, m, 0, 0); // local time
    return d.toISOString(); // store/send as UTC ISO
  }, []);

  const fetchBookingsByDate = useCallback(async (): Promise<Booking[]> => {
    const MOCK: Booking[] = [
      {
        id: "1",
        start_time: isoAt(selectedDate, 9, 0),
        end_time: isoAt(selectedDate, 10, 0),
        name: "Alice Smith",
        email: "alice@example.com",
        phone: "+1 (555) 123-4567",
      },
      {
        id: "2",
        start_time: isoAt(selectedDate, 13, 30),
        end_time: isoAt(selectedDate, 15, 0),
        name: "Bob Jones",
        email: "bob@example.com",
        phone: "555-678-9012",
      },
    ];
    return Promise.resolve(MOCK);
  }, [isoAt, selectedDate]);

  async function createBooking(payload: Omit<Booking, "id">): Promise<Booking> {
    // Replace with real POST later
    return Promise.resolve({
      id: String(Math.floor(Math.random() * 100000)),
      ...payload,
    });
  }

  useEffect(() => {
    const loadBookings = async () => {
      const data = await fetchBookingsByDate();
      setBookings(data);
    };
    loadBookings();
  }, [selectedDate, fetchBookingsByDate]);

  const generateTimeSlots = (): Date[] => {
    const slots: Date[] = [];
    for (let hour = 7; hour <= 17; hour++) {
      for (let half = 0; half < 60; half += 30) {
        const d = new Date(selectedDate);
        d.setHours(hour, half, 0, 0); // zero secs/ms
        slots.push(d);
      }
    }
    return slots;
  };

  const isBooked = (slot: Date): boolean => {
    return bookings.some((b) => {
      const start = new Date(b.start_time).getTime();
      const end = new Date(b.end_time).getTime();
      const t = slot.getTime();
      return start <= t && t < end; // slot starts within a booking
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleSlotClick = (slot: Date) => {
    if (isBooked(slot)) return;
    setSelectedSlot(slot);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    if (!formState.name || !formState.email || !formState.phone) return;

    setFormState({ ...formState, submitting: true });
    try {
      const startISO = selectedSlot.toISOString();
      const endISO = new Date(
        selectedSlot.getTime() + formState.durationMinutes * 60 * 1000
      ).toISOString();
      await createBooking({
        start_time: startISO,
        end_time: endISO,
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        notes: formState.notes,
      });
      // refresh
      const updated = await fetchBookingsByDate();
      setBookings(updated);
      // reset form
      setFormState({
        name: "",
        email: "",
        phone: "",
        notes: "",
        start_time: "",
        end_time: "",
        submitting: false,
        durationMinutes: 30,
      });
      setSelectedSlot(null);
    } finally {
      setFormState({ ...formState, submitting: false });
    }
  };

  const slots: Date[] = generateTimeSlots();
  const selectedMs: number | null = selectedSlot
    ? selectedSlot.getTime()
    : null;

  return (
    <div className="day-scheduler-container">
      {selectedSlot ? (
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <strong>Booking:</strong> {formatTime(selectedSlot)} –{" "}
            {formatTime(
              new Date(
                selectedSlot.getTime() + formState.durationMinutes * 60 * 1000
              )
            )}
          </div>
          <label>
            Duration
            <select
              value={formState.durationMinutes}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  durationMinutes: Number(e.target.value),
                })
              }
              required
            >
              <option value={30}>30 minutes</option>
              <option value={60}>60 minutes</option>
              <option value={90}>90 minutes</option>
            </select>
          </label>
          <label>
            Name
            <input
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              required
            />
          </label>
          <label>
            Phone
            <input
              value={formState.phone}
              onChange={(e) =>
                setFormState({ ...formState, phone: e.target.value })
              }
              required
            />
          </label>
          <label>
            Notes (optional)
            <textarea
              value={formState.notes}
              onChange={(e) =>
                setFormState({ ...formState, notes: e.target.value })
              }
            />
          </label>

          <div className="btns">
            <button type="button" onClick={() => setSelectedSlot(null)}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                formState.submitting ||
                !formState.name ||
                !formState.email ||
                !formState.phone
              }
            >
              {formState.submitting ? "Saving..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="day-header">
            <h3>{formatDate(selectedDate)}</h3>
          </div>
          <ul className="time-slot-list">
            {slots.map((slot, idx) => {
              const booked = isBooked(slot);
              const isSelected =
                selectedMs !== null && selectedMs === slot.getTime();

              return (
                <li
                  key={idx}
                  className={`time-slot${booked ? " booked" : ""}${
                    isSelected ? " selected" : ""
                  }`}
                  onClick={() => handleSlotClick(slot)}
                >
                  {formatTime(slot)}
                  {booked && <span className="pill">Booked</span>}
                </li>
              );
            })}
          </ul>
        </>
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
        .day-header {
          margin-bottom: 10px;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .time-slot-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .time-slot {
          padding: 8px 12px;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .time-slot:hover {
          background-color: var(--pink);
          color: white;
        }
        .time-slot {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .time-slot.booked {
          color: #aaa;
          background-color: #f3f3f3;
          cursor: not-allowed;
        }
        .time-slot.selected {
          outline: 2px solid var(--pink);
          background-color: #fff0f6;
        }
        .pill {
          font-size: 12px;
          padding: 2px 6px;
          border-radius: 999px;
          background: #ddd;
        }
        .booking-form {
          margin-top: 12px;
          display: grid;
          gap: 8px;
        }
        .booking-form label {
          display: grid;
          gap: 4px;
        }
        .booking-form input,
        .booking-form textarea {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .booking-form .btns {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }
        .booking-form button[type="submit"] {
          background: var(--pink);
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        }
        .booking-form button[disabled] {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
