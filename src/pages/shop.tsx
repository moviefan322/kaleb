"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Item as ItemType } from "@/types/item";
import ItemComponent from "@/components/item";

export default function Shop({ isAdmin }: { isAdmin: boolean }) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
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
            <ItemComponent
              key={item.id}
              item={item}
              isAdmin={isAdmin}
              editIndex={editIndex}
              setEditIndex={setEditIndex}
              fetchItems={fetchItems}
            />
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
      `}</style>
    </>
  );
}
