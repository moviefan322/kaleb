import React, { useState } from "react";
import { createBooking, CreateBookingInput } from "@/lib/booking";
import { formatTime } from "@/util";
import { BookingFormState } from "@/types/";
import { validateEmail, validatePhone } from "@/lib/validate";

interface BookingFormProps {
  selectedSlot: Date;
  setSelectedSlot: (slot: Date | null) => void;
  formState: BookingFormState;
  setFormState: React.Dispatch<React.SetStateAction<BookingFormState>>;
  conflictsWithBuffer: (start: Date, durationMin: number) => boolean;
  isDurationAllowed: (slot: Date | null, minutes: number) => boolean;
  refreshBookings: () => Promise<void>;
}

const durationOptions = [30, 60, 90];

export const BookingForm = ({
  selectedSlot,
  setSelectedSlot,
  formState,
  setFormState,
  conflictsWithBuffer,
  isDurationAllowed,
  refreshBookings,
}: BookingFormProps) => {
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  const validateForm = () => {
    const e: typeof errors = {};
    if (!formState.name.trim()) e.name = "Name is required";
    if (!validateEmail(formState.email)) e.email = "Enter a valid email";
    if (!validatePhone(formState.phone)) e.phone = "Enter a valid phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onBlurField = (field: "name" | "email" | "phone") => {
    setErrors((prev) => {
      const copy = { ...prev };
      if (field === "name" && !formState.name.trim())
        copy.name = "Name is required";
      if (field === "email" && !validateEmail(formState.email))
        copy.email = "Enter a valid email";
      if (field === "phone" && !validatePhone(formState.phone))
        copy.phone = "Enter a valid phone number";
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    if (!formState.name || !formState.email || !formState.phone) return;

    // 🚨 buffer/overlap check before booking
    if (conflictsWithBuffer(selectedSlot, formState.durationMinutes)) {
      alert(
        "That time is too close to another booking. Please pick a different slot."
      );
      return; // stop here
    }

    if (!isDurationAllowed(selectedSlot, formState.durationMinutes)) {
      alert("Selected duration is no longer available for this time.");
      return;
    }

    setFormState((s) => ({ ...s, submitting: true }));
    try {
      const startISO = selectedSlot.toISOString();
      const endISO = new Date(
        selectedSlot.getTime() + formState.durationMinutes * 60 * 1000
      ).toISOString();

      await createBooking({
        start_time: startISO,
        end_time: endISO,
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        notes: formState.notes,
        type: formState.type,
      } satisfies CreateBookingInput);

      refreshBookings();

      // reset form
      setFormState({
        name: "",
        email: "",
        phone: "",
        notes: "",
        start_time: "",
        end_time: "",
        type: "Thai Massage",
        submitting: false,
        durationMinutes: 30,
      });
      setSelectedSlot(null);
    } catch (err) {
      console.error("Booking failed:", err);
      setFormState((s) => ({ ...s, submitting: false }));
    }
  };

  return (
    <>
      <form
        className="booking-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!selectedSlot) return;
          if (!validateForm()) return;
          handleSubmit(e);
        }}
      >
        <div className="form-header">
          <strong>Booking:</strong> {formatTime(selectedSlot)} –{" "}
          {formatTime(
            new Date(
              selectedSlot.getTime() + formState.durationMinutes * 60 * 1000
            )
          )}
        </div>
        <label>
          Type
          <select
            value={formState.type}
            onChange={(e) =>
              setFormState({
                ...formState,
                type: e.target.value,
              })
            }
            required
          >
            <option value={"Thai Massage"}>Thai Massage</option>
            <option value={"Cupping/Acupressure"}>Cupping + Acupressure</option>
            <option value={"Private Yoga"}>Private Yoga Session</option>
            <option value={"Other"}>{`Other (specify in notes)`}</option>
          </select>
        </label>
        <label>
          Duration
          <select
            value={formState.durationMinutes}
            onChange={(e) =>
              setFormState({
                ...formState,
                durationMinutes: Number(e.target.value),
              })
            }
            required
          >
            {durationOptions.map((min) => {
              const disabled = !isDurationAllowed(selectedSlot, min);
              return (
                <option key={min} value={min} disabled={disabled}>
                  {min} minutes{disabled ? " (unavailable)" : ""}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Name
          <input
            value={formState.name}
            onBlur={() => onBlurField("name")}
            onChange={(e) => {
              setFormState({ ...formState, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            required
            className={errors.name ? "invalid" : ""}
          />
          {errors.name && <span className="err">{errors.name}</span>}
        </label>
        <label>
          Email
          <input
            type="email"
            value={formState.email}
            onBlur={() => onBlurField("email")}
            onChange={(e) => {
              setFormState({ ...formState, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            required
            className={errors.email ? "invalid" : ""}
          />
          {errors.email && <span className="err">{errors.email}</span>}
        </label>
        <label>
          Phone
          <input
            value={formState.phone}
            onBlur={() => onBlurField("phone")}
            onChange={(e) => {
              setFormState({ ...formState, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: undefined });
            }}
            required
            className={errors.phone ? "invalid" : ""}
          />
          {errors.phone && <span className="err">{errors.phone}</span>}
        </label>
        <label>
          Notes (optional)
          <textarea
            value={formState.notes}
            onChange={(e) =>
              setFormState({ ...formState, notes: e.target.value })
            }
          />
        </label>

        <div className="btns">
          <button type="button" onClick={() => setSelectedSlot(null)}>
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              formState.submitting ||
              !formState.name ||
              !formState.email ||
              !formState.phone ||
              !!errors.name ||
              !!errors.email ||
              !!errors.phone
            }
          >
            {formState.submitting ? "Saving..." : "Request Booking"}
          </button>
        </div>
      </form>

      {/*STYLESHEET*/}
      <style jsx>{`
        .booking-form {
          margin-top: 12px;
          display: grid;
          gap: 8px;
        }
        .booking-form label {
          display: grid;
          gap: 4px;
        }
        .booking-form input,
        .booking-form textarea {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .booking-form .btns {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }
        .booking-form button[type="submit"] {
          background: var(--pink);
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        }
        .booking-form button[disabled] {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .err {
          color: #b00020;
          font-size: 12px;
        }
        input.invalid {
          border-color: #b00020;
          outline-color: #b00020;
        }
      `}</style>
    </>
  );
};
