import React, { useState, useEffect, useCallback } from "react";
import WeekSelector from "./WeekSelector";
import DayScheduler from "./DayScheduler";
import { isAdmin } from "@/lib/session";
import { fetchUnconfirmedBookings } from "@/lib/booking";
import type { Booking } from "@/types/booking";
import UnconfirmedBookingsModal from "./UnconfirmedBookingsModal";

export default function Calendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [weekIndex, setWeekIndex] = useState<number>(0);
  const [unconfirmedBookings, setUnconfirmedBookings] = useState<
    Booking[] | null
  >(null);
  const [showUnconfirmedModal, setShowUnconfirmedModal] = useState(false);

  const refreshUnconfirmedBookings = useCallback(async () => {
    if (!isAdmin()) return;
    try {
      const bookings = await fetchUnconfirmedBookings();
      setUnconfirmedBookings(bookings);
    } catch {
      setUnconfirmedBookings(null);
    }
  }, []);

  useEffect(() => {
    refreshUnconfirmedBookings();
  }, [refreshUnconfirmedBookings]);

  useEffect(() => {
    if (
      showUnconfirmedModal &&
      Array.isArray(unconfirmedBookings) &&
      unconfirmedBookings.length === 0
    ) {
      setShowUnconfirmedModal(false);
    }
  }, [unconfirmedBookings, showUnconfirmedModal]);

  console.log("unconfirmed bookings", unconfirmedBookings);

  return (
    <>
      {isAdmin() &&
        Array.isArray(unconfirmedBookings) &&
        unconfirmedBookings.length > 0 && (
          <div
            className="admin-banner admin-banner-link"
            onClick={() => setShowUnconfirmedModal(true)}
            style={{ cursor: "pointer" }}
          >
            <p>
              {`${unconfirmedBookings.length} unconfirmed booking${
                unconfirmedBookings.length === 1 ? "" : "s"
              }`}
            </p>
          </div>
        )}
      <UnconfirmedBookingsModal
        bookings={unconfirmedBookings || []}
        open={showUnconfirmedModal}
        onClose={() => setShowUnconfirmedModal(false)}
        refreshBookings={refreshUnconfirmedBookings}
      />
      <div className="calendar-container">
        <WeekSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          weekIndex={weekIndex}
          setWeekIndex={setWeekIndex}
        />
        <DayScheduler
          selectedDate={selectedDate}
          refreshUnconfirmedBookings={refreshUnconfirmedBookings}
        />
      </div>

      {/*STYLESHEET*/}
      <style jsx>{`
        .calendar-container {
          display: flex;
          flex-direction: row;
          gap: 20px;
          padding: 20px;
          border-radius: 8px;
          margin: auto;
        }
        .admin-banner {
          background-color: #eaf4ff;
          color: #1976d2;
          padding: 10px;
          text-align: center;
          font-weight: bold;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .admin-banner-link {
          text-decoration: underline;
          color: #1976d2;
        }
        .admin-banner-link:hover {
          background-color: #d2e3fc;
        }
        // media queries for responsiveness
        @media (max-width: 768px) {
          .calendar-container {
            flex-direction: column;
            align-items: center;
          }
          .calendar-container > * {
            width: 100%;
            max-width: 350px;
          }
          .admin-banner {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </>
  );
}
