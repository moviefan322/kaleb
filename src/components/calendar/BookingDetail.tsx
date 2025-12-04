import { formatTime } from "@/util/";
import { deleteBooking, confirmBooking, rejectBooking } from "@/lib/booking";
import type { Booking } from "@/types/booking";
import { useState } from "react";

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
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectMessage, setRejectMessage] = useState("");

  const handleConfirmBooking = async (id: string) => {
    try {
      await confirmBooking(id);
      refreshBookings();
      setSelectedBooking(null);
    } catch (err) {
      console.error("Confirm booking failed:", err);
      alert("Failed to confirm booking. Please try again.");
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this booking? Client will not be notified, please contact them!"
      )
    )
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

  const handleRejectBooking = async (id: string, message: string) => {
    try {
      await rejectBooking(id, message);
      refreshBookings();
      setSelectedBooking(null);
    } catch (err) {
      console.error("Reject booking failed:", err);
      alert("Failed to reject booking. Please try again.");
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
        {selectedBooking.confirmed === false ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "12px",
            }}
          >
            {!showRejectInput ? (
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  className="deleteButton confirmButton"
                  onClick={() => handleConfirmBooking(selectedBooking.id)}
                >
                  Confirm
                </button>
                <button
                  className="deleteButton rejectButton"
                  onClick={() => setShowRejectInput(true)}
                >
                  Reject
                </button>
              </div>
            ) : (
              <>
                <textarea
                  placeholder="Optional message to client"
                  value={rejectMessage}
                  onChange={(e) => setRejectMessage(e.target.value)}
                  rows={10}
                  style={{
                    marginBottom: "8px",
                    padding: "6px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    width: "100%",
                    resize: "vertical",
                  }}
                />
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    className="deleteButton rejectButton"
                    onClick={() =>
                      handleRejectBooking(selectedBooking.id, rejectMessage)
                    }
                  >
                    Reject
                  </button>
                  <button
                    className="deleteButton"
                    onClick={() => setShowRejectInput(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <button
            className="deleteButton"
            onClick={() => handleDeleteBooking(selectedBooking.id)}
          >
            Delete Booking
          </button>
        )}
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
        .confirmButton {
          background: #4caf50;
        }
        .confirmButton:hover {
          background: #388e3c;
        }
        .rejectButton {
          background: #ff2626;
        }
        .rejectButton:hover {
          background: #a40000;
        }
      `}</style>
    </>
  );
};
