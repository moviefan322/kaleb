import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Pencil, Check, X, Trash } from "lucide-react";
import { Item as ItemType } from "@/types/item";

interface ItemProps {
  item: ItemType;
  isAdmin: boolean;
  editIndex: number | null;
  setEditIndex: (index: number | null) => void;
  fetchItems: () => void;
}

export default function ItemComponent({
  item,
  isAdmin,
  editIndex,
  setEditIndex,
  fetchItems,
}: ItemProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [itemName, setItemName] = useState(item.name);
  const [itemDescription, setItemDescription] = useState(item.description);
  const [itemPrice, setItemPrice] = useState(item.price);
  const [itemInStock, setItemInStock] = useState(item.in_stock);
  const [itemVisible, setItemVisible] = useState(item.visible);
  const [itemImageUrl, setItemImageUrl] = useState(item.image_url);
  const [priceError, setPriceError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const isEdit = editIndex === item.id;

  const resetState = () => {
    setItemName(item.name);
    setItemDescription(item.description);
    setItemPrice(item.price);
    setItemInStock(item.in_stock);
    setItemVisible(item.visible);
  };

  const handleSave = async () => {
    if (!validateInputs()) return;

    console.log("Saving item with:", {
      name: itemName,
      description: itemDescription,
      price: itemPrice,
      inStock: itemInStock,
      visible: itemVisible,
      imageUrl: itemImageUrl,
    });

    setIsLoading(true);

    const supabase = createClient();

    const { data, error } = await supabase
      .from("item") // ✅ Use "item" instead of "items"
      .update({
        id: item.id,
        name: itemName,
        description: itemDescription,
        price: itemPrice,
        in_stock: itemInStock,
        visible: itemVisible,
        image_url: itemImageUrl,
      })
      .eq("id", item.id)
      .select("*"); // ✅ Ensure updated data is returned

    if (error) {
      console.error("❌ Error updating item:", error.message);
      setIsLoading(false);
      return;
    }

    console.log("✅ Item updated successfully!", data);

    setEditIndex(null);
    setIsLoading(false);
    fetchItems();
  };

  const handleDelete = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (userConfirmed) {
      console.log("Deleting item", item.id);
      if (isEdit) setEditIndex(null);
    }
  };

  const handleCancel = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to cancel editing?"
    );
    if (userConfirmed) {
      setEditIndex(null);
      resetState();
    }
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
    <>
      <div key={item.id} className="shop-item">
        {isAdmin && (
          <div>
            {!isEdit && (
              <button
                onClick={() => setEditIndex(item.id)}
                className="edit-button edit"
              >
                <Pencil size={24} color="pink" />
              </button>
            )}
          </div>
        )}

        <div className="image-wrapper">
          {isEdit ? (
            <div className="flex-column edit-image">
              <div className="flex-column image-preview">
                <label className="preview-label">Image Preview</label>
                <Image
                  priority
                  src={itemImageUrl}
                  width={200}
                  height={200}
                  alt="animal photo"
                />
              </div>
              <div className="flex-row">
                <label style={{ marginRight: "1rem" }}>Image Url:</label>
                <input
                  type="text"
                  className="edit-input"
                  value={itemImageUrl}
                  onChange={(e) => setItemImageUrl(e.target.value)}
                />
                {imageUrlError && (
                  <p className="error-message">{imageUrlError}</p>
                )}
              </div>
            </div>
          ) : (
            <Image
              priority
              src={item.image_url}
              width={200}
              height={200}
              alt="animal photo"
            />
          )}
        </div>
        <div>
          {isEdit ? (
            <>
              <label style={{ marginRight: "1rem" }}>Item name:</label>
              <input
                type="text"
                value={itemName}
                className="edit-input"
                onChange={(e) => setItemName(e.target.value)}
              />
              {nameError && <p className="error-message">{nameError}</p>}
            </>
          ) : (
            <h2>{item.name}</h2>
          )}
        </div>

        <div className="flex-column">
          {isEdit ? (
            <>
              <label style={{ marginRight: "1rem" }}>Item description:</label>
              <textarea
                rows={4}
                value={itemDescription}
                className="edit-input"
                onChange={(e) => setItemDescription(e.target.value)}
              />
              {descriptionError && (
                <p className="error-message">{descriptionError}</p>
              )}
            </>
          ) : (
            <p>{item.description}</p>
          )}
        </div>
        <div>
          {isEdit ? (
            <>
              <label style={{ marginRight: "1rem" }}>Item price:</label>
              <input
                type="text"
                value={itemPrice}
                className="edit-input"
                onChange={(e) => handlePriceChange(e)}
              />
              {priceError && <p className="error-message">{priceError}</p>}
            </>
          ) : (
            <p className="price">${item.price}</p>
          )}
        </div>

        <div>
          {isEdit ? (
            <div className="checkbox-row">
              <div>
                <label style={{ marginRight: "1rem" }}>In stock:</label>
                <input
                  type="checkbox"
                  checked={itemInStock}
                  onChange={(e) => setItemInStock(e.target.checked)}
                />
              </div>
              <div>
                <label style={{ marginRight: "1rem" }}>Hide Item:</label>
                <input
                  type="checkbox"
                  checked={!itemVisible}
                  onChange={(e) => setItemVisible(!e.target.checked)}
                />
              </div>
            </div>
          ) : (
            <>
              {item.in_stock ? (
                <span className="in-stock">In Stock</span>
              ) : (
                <span className="out-stock">Out of Stock</span>
              )}
            </>
          )}
        </div>

        <div>
          {isEdit ? (
            <div>
              <div className="button-row">
                <button
                  className="edit-button save"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : <Check size={24} color="white" />}
                </button>
                <button className="edit-button cancel" onClick={handleCancel}>
                  <X size={24} color="white" />
                </button>
                <button className="edit-button delete" onClick={handleDelete}>
                  <Trash size={24} color="white" />
                </button>
              </div>
            </div>
          ) : (
            <div className="button-row">
              <button className="mainButton">Add To Cart</button>
              <button className="mainButton">Buy Now</button>
            </div>
          )}
        </div>
      </div>

      {/*STYLESHEET*/}
      <style jsx>{`
        .shop-item {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 1rem;
          text-align: center;
          display: flex;
          flex-direction: column;
        }
        .shop-item > * {
          margin-bottom: 10px;
        }
        .shop-item img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .price {
          font-weight: bold;
          color: #008000;
        }
        .in-stock {
          color: green;
        }
        .out-stock {
          color: red;
        }
        .button-row {
          display: flex;
          justify-content: space-around;
        }
        .edit-button {
          float: right;
          padding: 0.5rem;
          border-radius: 25%;
          cursor: pointer;
        }

        .edit {
          border: 2px solid white;
          background: #929292;
        }

        .cancel {
          background: #d66519;
          border: 2px solid white;
        }

        .save {
          background: green;
          border: 2px solid white;
        }

        .delete {
          background: red;
          border: 2px solid white;
        }

        .edit-buttons {
          display: flex;
          justify-content: flex-end;
        }

        .edit-buttons > * {
          margin: 0.5rem;
        }

        .edit-input {
          padding: 0.5rem;
          font-size: 1rem;
        }
        .checkbox-row {
          display: flex;
          justify-content: space-between;
        }
        .edit-image {
          justify-content: center;
          align-items: center;
        }
        .image-preview {
          margin: 1rem;
        }

        .preview-label {
          margin-bottom: 1rem;
          font-weight: bold;
          font-size: 1.5rem;
        }
      `}</style>
    </>
  );
}
