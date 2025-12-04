import React, { useState } from "react";
import { BookingDetail } from "./BookingDetail";
import type { Booking } from "@/types/booking";

interface UnconfirmedBookingsModalProps {
  bookings: Booking[];
  open: boolean;
  onClose: () => void;
  refreshBookings: () => void;
}

export default function UnconfirmedBookingsModal({
  bookings,
  open,
  onClose,
  refreshBookings,
}: UnconfirmedBookingsModalProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
    bookings[0] || null
  );

  if (!open) return null;

  return (
    <div className="ub-modal-overlay" onClick={onClose}>
      <div
        className="ub-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="ub-modal-content">
          <div className="ub-list">
            <h3>Unconfirmed Bookings</h3>
            <ul>
              {bookings.map((b) => (
                <li
                  key={b.id}
                  className={
                    selectedBooking && b.id === selectedBooking.id
                      ? "selected"
                      : ""
                  }
                  onClick={() => setSelectedBooking(b)}
                >
                  <div>
                    <strong>{b.name}</strong>
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    {b.email}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    {b.phone}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="ub-detail">
            {selectedBooking ? (
              <BookingDetail
                selectedBooking={selectedBooking}
                setSelectedBooking={setSelectedBooking}
                refreshBookings={refreshBookings}
              />
            ) : (
              <div style={{ padding: 20 }}>
                Select a booking to view details
              </div>
            )}
          </div>
        </div>
        <button className="ub-close" onClick={onClose}>
          Close
        </button>
      </div>
      <style jsx>{`
        .ub-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.3);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ub-modal {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
          max-width: 800px;
          width: 95vw;
          max-height: 90vh;
          overflow: auto;
          padding: 24px 16px 16px 16px;
          position: relative;
        }
        .ub-modal-content {
          display: flex;
          flex-direction: row;
          gap: 24px;
        }
        .ub-list {
          min-width: 180px;
          max-width: 220px;
          border-right: 1px solid #eee;
          padding-right: 16px;
        }
        .ub-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .ub-list li {
          padding: 8px 4px;
          border-radius: 6px;
          cursor: pointer;
          margin-bottom: 4px;
          transition: background 0.15s;
        }
        .ub-list li.selected {
          background: #f3f3f3;
        }
        .ub-detail {
          flex: 1;
          min-width: 220px;
        }
        .ub-close {
          position: absolute;
          top: 8px;
          right: 12px;
          background: #ff5252;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 6px 14px;
          cursor: pointer;
          font-size: 15px;
        }
        @media (max-width: 700px) {
          .ub-modal-content {
            flex-direction: column;
            gap: 12px;
          }
          .ub-list {
            max-width: 100%;
            border-right: none;
            border-bottom: 1px solid #eee;
            padding-right: 0;
            padding-bottom: 12px;
          }
        }
      `}</style>
    </div>
  );
}
