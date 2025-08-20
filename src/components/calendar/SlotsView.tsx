import { useMemo, useCallback } from "react";
import { formatDate, formatTime } from "@/util";
import { Booking } from "@/types/booking";
import { markAsUnavailable, deleteBooking } from "@/lib/booking";
import { isAdmin } from "@/lib/session";

interface SlotViewProps {
  selectedDate: Date;
  bookings: Booking[];
  selectedSlot: Date | null;
  setSelectedBooking: (booking: Booking | null) => void;
  setSelectedSlot: (slot: Date | null) => void;
  refreshBookings: () => Promise<void>;
  formState: {
    name: string;
    email: string;
    phone: string;
    notes: string;
    start_time: string;
    end_time: string;
    type: string;
    submitting: boolean;
    durationMinutes: number;
  };
  conflictsWithBuffer: (
    slot: Date,
    durationMinutes: number,
    bufferMinutes?: number
  ) => boolean;
}

export const SlotsView = ({
  selectedDate,
  selectedSlot,
  bookings,
  formState,
  setSelectedBooking,
  setSelectedSlot,
  conflictsWithBuffer,
  refreshBookings,
}: SlotViewProps) => {
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

  const selectedKey = useMemo(
    () => new Date(selectedDate).getTime(),
    [selectedDate]
  );

  const slots = useMemo(
    () => generateTimeSlots(new Date(selectedKey)),
    [selectedKey]
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

  const isUnavailableAt = useCallback(
    (slot: Date) => {
      const b = findBookingAt(slot);
      return b?.type === "unavailable";
    },
    [findBookingAt]
  );

  const selectedMs: number | null = selectedSlot
    ? selectedSlot.getTime()
    : null;

  return (
    <>
      <div className="day-header">
        <h3>{formatDate(selectedDate)}</h3>
      </div>

      <ul className="time-slot-list">
        {slots.map((slot, idx) => {
          const blocked = isBlockedSlot(slot); // buffer + booking
          const trulyBooked = isTrulyBooked(slot); // actual booking only
          const admin = isAdmin();
          const isUnavailable = isUnavailableAt(slot);
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

          if (blocked || isUnavailable && !admin) return;

          return (
            <li
              key={idx}
              className={`time-slot${blocked || isUnavailable ? " booked" : ""}${
                isSelected ? " selected" : ""
              }`}
            >
              <button
                type="button"
                className={"slot-btn"}
                onClick={onClick}
                // IMPORTANT: do NOT disable when admin+booked, or clicks won’t fire
                disabled={!canClick || isUnavailable}
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
              {admin && !blocked && !trulyBooked && (
                <button
                  type="button"
                  className="mark-unavailable-btn"
                  onClick={async () => {
                    try {
                      await markAsUnavailable(slot); // <-- pass slot directly
                      await refreshBookings(); // so UI updates
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  Block
                </button>
              )}
              {trulyBooked && admin && isUnavailableAt(slot) && (
                <button
                  type="button"
                  className="mark-available-btn"
                  onClick={async () => {
                    try {
                      const b = findBookingAt(slot);
                      if (b) {
                        await deleteBooking(b.id);
                        await refreshBookings();
                      }
                    } catch (err) {
                      console.error("Delete booking failed:", err);
                      alert("Failed to delete booking. Please try again.");
                    }
                  }}
                >
                  Unblock
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {/*STYLESHEET*/}
      <style jsx>{`
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
        .mark-unavailable-btn {
          background: #ff5252;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .mark-unavailable-btn:hover {
          background: #ff1744;
        }
        .mark-available-btn {
          background: #4caf50;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .mark-available-btn:hover {
          background: #388e3c;
        }
      `}</style>
    </>
  );
};
