import React, { useState } from "react";
import WeekSelector from "./WeekSelector";
import DayScheduler from "./DayScheduler";
import { isAdmin } from "@/lib/session";

export default function Calendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [weekIndex, setWeekIndex] = useState<number>(0);

  return (
    <>
      {isAdmin() && (
        <div className="admin-banner">
          <p>Admin Mode: You can edit the schedule.</p>
        </div>
      )}
      <div className="calendar-container">
        <WeekSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          weekIndex={weekIndex}
          setWeekIndex={setWeekIndex}
        />
        <DayScheduler selectedDate={selectedDate} />
      </div>

      {/*STYLESHEET*/}
      <style jsx>{`
        .calendar-container {
          display: flex;
          flex-direction: row;
          gap: 20px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin: auto;
        }
        .admin-banner {
          background-color: #ffeb3b;
          color: #000;
          padding: 10px;
          text-align: center;
          font-weight: bold;
          border-radius: 5px;
          margin-bottom: 20px;
        }

        // media queries for responsiveness
        @media (max-width: 768px) {
          .calendar-container {
            flex-direction: column;
            align-items: center;
          }
          .admin-banner {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </>
  );
}
