import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import {
  getWeekBookingStatus,
  markDayAsUnavailable,
  markDayAsAvailable,
} from "@/lib/booking";
import { isAdmin } from "@/lib/session";

type Props = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  weekIndex: number;
  setWeekIndex: (index: number) => void;
  refreshBookings?: () => Promise<void>;
};

export default function WeekSelector({
  selectedDate,
  setSelectedDate,
  weekIndex,
  setWeekIndex,
  refreshBookings,
}: Props) {
  const today = useMemo(() => new Date(), []);
  const [weekStatus, setWeekStatus] = useState<{
    hasRealBookings: Map<string, boolean>;
    isBlocked: Map<string, boolean>;
  } | null>(null);
  const [loadingDay, setLoadingDay] = useState<string | null>(null);

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

  // Fetch week booking status when week changes
  useEffect(() => {
    const fetchWeekStatus = async () => {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() + weekIndex * 7);

      const status = await getWeekBookingStatus(weekStart);
      setWeekStatus(status);
    };

    fetchWeekStatus();
  }, [weekIndex, today]);

  const handleBlockDay = async (date: Date) => {
    const dayKey = date.toDateString();
    setLoadingDay(dayKey);

    try {
      await markDayAsUnavailable(date);
      if (refreshBookings) await refreshBookings();

      // Refresh week status
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() + weekIndex * 7);
      const status = await getWeekBookingStatus(weekStart);
      setWeekStatus(status);
    } catch (err) {
      console.error("Block day failed:", err);
      alert(err instanceof Error ? err.message : "Failed to block day");
    } finally {
      setLoadingDay(null);
    }
  };

  const handleUnblockDay = async (date: Date) => {
    const dayKey = date.toDateString();
    setLoadingDay(dayKey);

    try {
      await markDayAsAvailable(date);
      if (refreshBookings) await refreshBookings();

      // Refresh week status
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() + weekIndex * 7);
      const status = await getWeekBookingStatus(weekStart);
      setWeekStatus(status);
    } catch (err) {
      console.error("Unblock day failed:", err);
      alert("Failed to unblock day. Please try again.");
    } finally {
      setLoadingDay(null);
    }
  };

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
          {days.map((date, idx) => {
            const dayKey = date.toDateString();
            const hasBookings =
              weekStatus?.hasRealBookings.get(dayKey) || false;
            const isBlocked = weekStatus?.isBlocked.get(dayKey) || false;
            const admin = isAdmin();
            const isLoading = loadingDay === dayKey;

            return (
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
                <div className="date-content">
                  <span>{formatDate(date)}</span>
                  {admin && (
                    <div className="day-status">
                      {isLoading ? (
                        <span className="loading-indicator">...</span>
                      ) : hasBookings ? (
                        <span className="booked-indicator">Booked</span>
                      ) : isBlocked ? (
                        <button
                          type="button"
                          className="unblock-btn"
                          onClick={async (e) => {
                            e.stopPropagation();
                            await handleUnblockDay(date);
                          }}
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="block-btn"
                          onClick={async (e) => {
                            e.stopPropagation();
                            await handleBlockDay(date);
                          }}
                        >
                          Block
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/*STYLESHEET*/}
      <style jsx>{`
        .week-selector-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          width: 300px;
          background-color: #f9f9f9;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .date-item {
          background-color: white;
          padding: 8px 12px;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .date-item:hover {
          background-color: var(--pink);
          color: white;
        }
        .date-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .day-status {
          display: flex;
          align-items: center;
        }
        .booked-indicator {
          background-color: #2196f3;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        .loading-indicator {
          background-color: #9e9e9e;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          animation: pulse 1s infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .block-btn {
          background-color: #ff5252;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        .block-btn:hover {
          background-color: #ff1744;
        }
        .unblock-btn {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        .unblock-btn:hover {
          background-color: #388e3c;
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
