"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  in_stock: boolean;
  visible: boolean;
}

export default function Shop() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const supabase = createClient();
      const response = await supabase
        .from("item")
        .select("*")
        .order("id", { ascending: true });
      console.log("response", response);
      if (response.error) {
        console.error("Error fetching items:", response.error);
      } else {
        setItems(response.data || []);
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading) return <p>Loading items...</p>;
  if (items.length === 0) return <p>No items available</p>;
  return (
    <>
      <div className="container">
        <h1>SHOP</h1>
        <div className="shop-grid">
          {items.map((item) => (
            <div key={item.id} className="shop-item">
              <div className="image=wrapper">
                <Image
                  priority
                  src={item.image_url}
                  width={200}
                  height={200}
                  alt="animal photo"
                />
              </div>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p className="price">${item.price}</p>
              <div>
                {item.in_stock ? (
                  <span className="in-stock">In Stock</span>
                ) : (
                  <span className="out-stock">Out of Stock</span>
                )}
              </div>

              <div className="button-row">
                <button className="mainButton">Add To Cart</button>
                <button className="mainButton">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*STYLESHEET*/}
      <style jsx>{`
        .shop-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          padding: 20px;
        }
        .shop-item {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 1rem;
          text-align: center;
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
      `}</style>
    </>
  );
}
