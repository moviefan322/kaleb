import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Calendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [weekIndex, setWeekIndex] = useState(0); // 0 = this week

  const getWeekDays = (offsetWeeks: number) => {
    const days = [];
    const baseDate = new Date(today);
    baseDate.setDate(today.getDate() + offsetWeeks * 7);

    for (let i = 0; i < 8; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const days = getWeekDays(weekIndex);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

    const formatDateShort = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  console.log(days)

  return (
    <>
      <div className="week-header">
        <button
          className="nakedButt"
          onClick={() => setWeekIndex((prev) => Math.max(0, prev - 1))}
          disabled={weekIndex === 0}
        >
          <ChevronLeft />
        </button>
        <h2>{formatDateShort(days[0])} - {formatDateShort(days[6])}</h2>
        <button
          className="nakedButt"
          onClick={() => setWeekIndex((prev) => Math.min(3, prev + 1))}
          disabled={weekIndex === 3}
        >
          <ChevronRight />
        </button>
      </div>

      <ul>
        {days.map((date, idx) => (
          <li
            key={idx}
            className="date-item"
            style={{
              cursor: "pointer",
              fontWeight:
                selectedDate?.toDateString() === date.toDateString()
                  ? "bold"
                  : "normal",
            }}
            onClick={() => setSelectedDate(date)}
          >
            {formatDate(date)}
          </li>
        ))}
      </ul>

      {/*STYLESHEET*/}
      <style jsx>{`
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: block;
          flex-wrap: wrap;
          gap: 10px;
        }
        .date-item {
          background-color: var(--pink);
          padding: 10px 15px;
          border-radius: 5px;
          transition: background-color 0.3s, color 0.3s;
          margin: 5px;
        }
        .date-item:hover {
          background-color: #e0e0e0;
        }
        .week-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          gap: 10px;
        }
        .nakedButt:hover {
          color: var(--pink);
        }
        .nakedButt:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}
