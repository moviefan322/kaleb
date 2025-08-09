import React, { useState } from "react";
import WeekSelector from "./WeekSelector";
import DayScheduler from "./DayScheduler";

export default function Calendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [weekIndex, setWeekIndex] = useState<number>(0);

  return (
    <>
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
      `}</style>
    </>
  );
}
