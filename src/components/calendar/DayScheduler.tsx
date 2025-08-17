import { useState, useEffect, useCallback, useMemo } from "react";
import { Booking } from "@/types/booking";
import { validateEmail, validatePhone } from "@/lib/validate";
import { isAdmin } from "@/lib/session";

// DayScheduler.tsx
type Props = {
  selectedDate: Date;
};

const durationOptions = [30, 60, 90];

export default function DayScheduler({ selectedDate }: Props) {
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
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

  const validateForm = () => {
    const e: typeof errors = {};
    if (!formState.name.trim()) e.name = "Name is required";
    if (!validateEmail(formState.email)) e.email = "Enter a valid email";
    if (!validatePhone(formState.phone)) e.phone = "Enter a valid phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onBlurField = (field: "name" | "email" | "phone") => {
    setErrors((prev) => {
      const copy = { ...prev };
      if (field === "name" && !formState.name.trim())
        copy.name = "Name is required";
      if (field === "email" && !validateEmail(formState.email))
        copy.email = "Enter a valid email";
      if (field === "phone" && !validatePhone(formState.phone))
        copy.phone = "Enter a valid phone number";
      return copy;
    });
  };

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
        type: "Thai Massage",
      },
      {
        id: "2",
        start_time: isoAt(selectedDate, 13, 30),
        end_time: isoAt(selectedDate, 15, 0),
        name: "Bob Jones",
        email: "bob@example.com",
        phone: "555-678-9012",
        type: "Cupping",
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

  function generateTimeSlots(base: Date): Date[] {
    const out: Date[] = [];
    for (let hour = 7; hour <= 17; hour++) {
      for (let half = 0; half < 60; half += 30) {
        const d = new Date(base);
        d.setHours(hour, half, 0, 0);
        out.push(d);
      }
    }
    return out;
  }

  // normalize the dep to a number so memo doesn’t get confused
  const selectedKey = useMemo(
    () => new Date(selectedDate).getTime(),
    [selectedDate]
  );

  const isBlockedSlot = (slot: Date) =>
    conflictsWithBuffer(slot, formState.durationMinutes, 15);

  const isTrulyBooked = useCallback(
    (slot: Date) => {
      const t = slot.getTime();
      return bookings.some((b) => {
        const s = new Date(b.start_time).getTime();
        const e = new Date(b.end_time).getTime();
        return s <= t && t < e;
      });
    },
    [bookings]
  );

  const findBookingAt = useCallback(
    (slot: Date): Booking | null => {
      const t = slot.getTime();
      return (
        bookings.find((b) => {
          const s = new Date(b.start_time).getTime();
          const e = new Date(b.end_time).getTime();
          return s <= t && t < e;
        }) || null
      );
    },
    [bookings]
  );

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
    // block buffer/overlap for new bookings
    if (conflictsWithBuffer(slot, formState.durationMinutes)) {
      // but allow admins to click through to details if it's a real booking
      if (isAdmin() && isTrulyBooked(slot)) {
        const b = findBookingAt(slot);
        if (b) setSelectedBooking(b);
      }
      return;
    }

    // free slot → regular selection flow
    setSelectedBooking(null);
    setSelectedSlot(slot);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    if (!formState.name || !formState.email || !formState.phone) return;

    // 🚨 buffer/overlap check before booking
    if (conflictsWithBuffer(selectedSlot, formState.durationMinutes)) {
      alert(
        "That time is too close to another booking. Please pick a different slot."
      );
      return; // stop here
    }

    if (!isDurationAllowed(selectedSlot, formState.durationMinutes)) {
      alert("Selected duration is no longer available for this time.");
      return;
    }

    setFormState((s) => ({ ...s, submitting: true }));
    try {
      const startISO = selectedSlot.toISOString();
      const endISO = new Date(
        selectedSlot.getTime() + formState.durationMinutes * 60 * 1000
      ).toISOString();

      console.log("Creating booking:", {
        start_time: startISO,
        end_time: endISO,
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        notes: formState.notes,
        type: formState.type,
      });

      await createBooking({
        start_time: startISO,
        end_time: endISO,
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        notes: formState.notes,
        type: formState.type,
      });

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
        type: "Thai Massage",
        submitting: false,
        durationMinutes: 30,
      });
      setSelectedSlot(null);
    } catch (err) {
      console.error("Booking failed:", err);
      setFormState((s) => ({ ...s, submitting: false }));
    }
  };

  const slots = useMemo(
    () => generateTimeSlots(new Date(selectedKey)),
    [selectedKey]
  );

  const selectedMs: number | null = selectedSlot
    ? selectedSlot.getTime()
    : null;

  return (
    <div className="day-scheduler-container">
      {selectedSlot && (
        <form
          className="booking-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!selectedSlot) return;
            if (!validateForm()) return;
            handleSubmit(e);
          }}
        >
          <div className="form-header">
            <strong>Booking:</strong> {formatTime(selectedSlot)} –{" "}
            {formatTime(
              new Date(
                selectedSlot.getTime() + formState.durationMinutes * 60 * 1000
              )
            )}
          </div>
          <label>
            Type
            <select
              value={formState.type}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  type: e.target.value,
                })
              }
              required
            >
              <option value={"Thai Massage"}>Thai Massage</option>
              <option value={"Cupping/Acupressure"}>
                Cupping + Acupressure
              </option>
              <option value={"Private Yoga"}>Private Yoga Session</option>
              <option value={"Other"}>{`Other (specify in notes)`}</option>
            </select>
          </label>
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
              {durationOptions.map((min) => {
                const disabled = !isDurationAllowed(selectedSlot, min);
                return (
                  <option key={min} value={min} disabled={disabled}>
                    {min} minutes{disabled ? " (unavailable)" : ""}
                  </option>
                );
              })}
            </select>
          </label>

          <label>
            Name
            <input
              value={formState.name}
              onBlur={() => onBlurField("name")}
              onChange={(e) => {
                setFormState({ ...formState, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              required
              className={errors.name ? "invalid" : ""}
            />
            {errors.name && <span className="err">{errors.name}</span>}
          </label>
          <label>
            Email
            <input
              type="email"
              value={formState.email}
              onBlur={() => onBlurField("email")}
              onChange={(e) => {
                setFormState({ ...formState, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              required
              className={errors.email ? "invalid" : ""}
            />
            {errors.email && <span className="err">{errors.email}</span>}
          </label>
          <label>
            Phone
            <input
              value={formState.phone}
              onBlur={() => onBlurField("phone")}
              onChange={(e) => {
                setFormState({ ...formState, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              required
              className={errors.phone ? "invalid" : ""}
            />
            {errors.phone && <span className="err">{errors.phone}</span>}
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
                !formState.phone ||
                !!errors.name ||
                !!errors.email ||
                !!errors.phone
              }
            >
              {formState.submitting ? "Saving..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      )}{" "}
      {!selectedSlot && !selectedBooking && (
        <>
          <div className="day-header">
            <h3>{formatDate(selectedDate)}</h3>
          </div>

          <ul className="time-slot-list">
            {slots.map((slot, idx) => {
              const blocked = isBlockedSlot(slot); // buffer + booking
              const trulyBooked = isTrulyBooked(slot); // actual booking only
              const admin = isAdmin();
              const isSelected =
                selectedMs !== null && selectedMs === slot.getTime();

              // Admin can click *booked* (not buffer) for details. Everyone can click free.
              const canClick = admin ? trulyBooked || !blocked : !blocked;

              const onClick = () => {
                // Debug to verify the branch we’re taking:
                console.log("slot click", {
                  time: slot.toISOString(),
                  admin,
                  blocked,
                  trulyBooked,
                  canClick,
                });

                if (!canClick) return;

                if (admin && trulyBooked) {
                  const b = findBookingAt(slot);
                  if (b) {
                    setSelectedSlot(null); // ensure form view stays closed
                    setSelectedBooking(b); // show details panel
                  }
                  return;
                }

                // Free slot → normal booking selection
                setSelectedBooking(null);
                handleSlotClick(slot);
              };

              // if(blocked && !admin) return

              return (
                <li
                  key={idx}
                  className={`time-slot${blocked ? " booked" : ""}${
                    isSelected ? " selected" : ""
                  }`}
                >
                  <button
                    type="button"
                    className={"slot-btn"}
                    onClick={onClick}
                    // IMPORTANT: do NOT disable when admin+booked, or clicks won’t fire
                    disabled={!canClick}
                    title={
                      blocked
                        ? trulyBooked
                          ? admin
                            ? "View booking details"
                            : "Booked"
                          : "Buffer time"
                        : "Available"
                    }
                  >
                    <span>{formatTime(slot)}</span>
                    {blocked && (
                      <span className="pill">
                        {trulyBooked ? "Booked" : "Buffer"}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {isAdmin() && selectedBooking && (
        <div className="booking-detail">
          <div className="bd-row">
            <strong>{selectedBooking.name}</strong>
            <button
              type="button"
              className="bd-close"
              onClick={() => setSelectedBooking(null)}
            >
              Close
            </button>
          </div>
          <div className="bd-grid">
            <div>
              <span>Type:</span> {selectedBooking.type}
            </div>
            <div>
              <span>Email:</span> {selectedBooking.email}
            </div>
            <div>
              <span>Phone:</span> {selectedBooking.phone}
            </div>
            <div>
              <span>Time:</span>{" "}
              {formatTime(new Date(selectedBooking.start_time))} –{" "}
              {formatTime(new Date(selectedBooking.end_time))}
            </div>
            {selectedBooking.notes && (
              <div className="bd-notes">
                <span>Notes:</span> {selectedBooking.notes}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Styles */}
      <style jsx>{`
        .err {
          color: #b00020;
          font-size: 12px;
        }
        input.invalid {
          border-color: #b00020;
          outline-color: #b00020;
        }
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
        .slot-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          border: 0;
          background: transparent;
          padding: 0; /* li already has padding */
          text-align: left;
          cursor: pointer;
        }
        .slot-btn:disabled {
          cursor: not-allowed;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
