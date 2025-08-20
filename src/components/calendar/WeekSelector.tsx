import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  weekIndex: number;
  setWeekIndex: (index: number) => void;
};

export default function WeekSelector({
  selectedDate,
  setSelectedDate,
  weekIndex,
  setWeekIndex,
}: Props) {
  const today = new Date();

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

  console.log(days);

  return (
    <>
      <div className="week-selector-container">
        <div className="week-header">
          <button
            className="nakedButt"
            onClick={() => setWeekIndex(Math.max(0, weekIndex - 1))}
            disabled={weekIndex === 0}
          >
            <ChevronLeft />
          </button>
          <h2>
            {formatDateShort(days[0])} - {formatDateShort(days[6])}
          </h2>
          <button
            className="nakedButt"
            onClick={() => setWeekIndex(Math.max(0, weekIndex + 1))}
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
      </div>

      {/*STYLESHEET*/}
      <style jsx>{`
        .week-selector-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          min-width: 250px;
          max-width: 300px;
          background-color: #f9f9f9;
          width: 100%;
        }
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
