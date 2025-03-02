"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { X } from "lucide-react";

interface AddItemModalProps {
  onClose: () => void;
  fetchItems: () => Promise<void>;
}

export default function AddItemModal({
  onClose,
  fetchItems,
}: AddItemModalProps) {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemInStock, setItemInStock] = useState(true);
  const [itemImageUrl, setItemImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");

  const handleSave = async () => {
    if (!validateInputs()) return;
    setError("");

    if (!itemName.trim()) return setError("Item name is required.");
    if (!itemDescription.trim()) return setError("Description is required.");
    if (!/^\d+(\.\d{0,2})?$/.test(itemPrice))
      return setError("Invalid price format.");
    try {
      new URL(itemImageUrl); // Validate URL
    } catch {
      return setError("Invalid image URL.");
    }

    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase.from("item").insert([
      {
        name: itemName,
        description: itemDescription,
        price: itemPrice,
        in_stock: itemInStock,
        image_url: itemImageUrl,
      },
    ]);

    setIsLoading(false);

    if (error) {
      console.error("Error adding item:", error.message);
      setError("Failed to add item.");
      return;
    }

    console.log("✅ Item added successfully!");
    fetchItems(); // Refresh the item list
    onClose(); // Close the modal
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim();

    if (/^0\d/.test(value)) {
      value = value.replace(/^0+/, "");
    }

    if (/^\d+(\.\d{0,2})?$/.test(value) || value === "") {
      setItemPrice(value);
    }
  };

  const validateInputs = () => {
    let isValid = true;

    const trimmedPrice = itemPrice.trim();
    const pricePattern = /^\d+(\.\d{0,2})?$/;
    if (!pricePattern.test(trimmedPrice)) {
      setPriceError(
        "Price must be a valid number with up to 2 decimal places."
      );
      isValid = false;
    } else {
      setPriceError("");
    }

    try {
      new URL(itemImageUrl);
      setImageUrlError("");
    } catch {
      setImageUrlError("Invalid image URL.");
      isValid = false;
    }

    if (!itemName.trim()) {
      setNameError("Item name cannot be empty.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!itemDescription.trim()) {
      setDescriptionError("Item description cannot be empty.");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <h2>Add New Item</h2>

        <label>Item Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        {nameError && <p className="error-message">{nameError}</p>}

        <label>Description:</label>
        <textarea
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        />
        {descriptionError && (
          <p className="error-message">{descriptionError}</p>
        )}

        <label>Price:</label>
        <input
          type="text"
          value={itemPrice}
          onChange={(e) => handlePriceChange(e)}
        />
        {priceError && <p className="error-message">{priceError}</p>}

        <label>Image URL:</label>
        <input
          type="text"
          value={itemImageUrl}
          onChange={(e) => setItemImageUrl(e.target.value)}
        />
        {imageUrlError && <p className="error-message">{imageUrlError}</p>}

        <label>
          <input
            type="checkbox"
            checked={itemInStock}
            onChange={() => setItemInStock(!itemInStock)}
          />
          In Stock
        </label>

        {error && <p className="error-message">{error}</p>}

        <button
          className="save-button"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          padding: 20px;
          border-radius: 10px;
          width: 400px;
          text-align: center;
          position: relative;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          border: none;
          background: transparent;
          cursor: pointer;
        }
        input,
        textarea {
          width: 100%;
          margin: 10px 0;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .save-button {
          background: black;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .error-message {
          color: red;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
