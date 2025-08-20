import { formatTime } from "@/util/";
import { deleteBooking } from "@/lib/booking";
import type { Booking } from "@/types/booking";

interface BookingDetailProps {
  selectedBooking: Booking;
  setSelectedBooking: (booking: Booking | null) => void;
  refreshBookings: () => void;
}

export const BookingDetail = ({
  selectedBooking,
  setSelectedBooking,
  refreshBookings,
}: BookingDetailProps) => {
  const handleDeleteBooking = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      await deleteBooking(id);
      refreshBookings();
      setSelectedBooking(null); // close details panel
    } catch (err) {
      console.error("Delete booking failed:", err);
      alert("Failed to delete booking. Please try again.");
    }
  };

  return (
    <>
      <div className="booking-detail">
        <div className="bd-row">
          <strong>{selectedBooking.name}</strong>
          <button
            type="button"
            className="bd-close"
            onClick={() => setSelectedBooking(null)}
          >
            ✕
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
        <button
          className="deleteButton"
          onClick={() => handleDeleteBooking(selectedBooking.id)}
        >
          Delete Booking
        </button>
      </div>

      {/*STYLESHEET*/}
      <style jsx>{`
        .booking-detail {
          margin-top: 12px;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          font-size: 14px;
          animation: fadeIn 0.2s ease-out;
        }
        .bd-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 16px;
        }
        .bd-close {
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 16px;
          color: #666;
          transition: color 0.2s;
        }
        .bd-close:hover {
          color: var(--pink);
        }
        .bd-grid {
          display: grid;
          gap: 6px;
        }
        .bd-grid span {
          font-weight: 500;
          margin-right: 4px;
        }
        .bd-notes {
          margin-top: 8px;
          padding-top: 6px;
          border-top: 1px solid #eee;
          font-style: italic;
          color: #444;
        }
        .deleteButton {
          background: #ff5252;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s;
          margin: auto;
          margin-top: 12px;
        }
      `}</style>
    </>
  );
};
