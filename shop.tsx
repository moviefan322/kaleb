// "use client";

// import { useEffect, useState } from "react";
// import { createClient } from "@/utils/supabase/client";
// import { Plus } from "lucide-react";
// import { Item as ItemType } from "@/types/item";
// import ItemComponent from "@/components/item";
// import AddItemModal from "@/components/addItemModal";

// export default function Shop({ isAdmin }: { isAdmin: boolean }) {
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [items, setItems] = useState<ItemType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);

//   const fetchItems = async () => {
//     const supabase = createClient();
//     const response = await supabase
//       .from("item")
//       .select("*")
//       .order("id", { ascending: true });
//     console.log("response", response);
//     if (response.error) {
//       console.error("Error fetching items:", response.error);
//     } else {
//       setItems(response.data || []);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   if (loading) return <p>Loading items...</p>;
//   if (items.length === 0) return <p>No items available</p>;
//   return (
//     <>
//       <div className="container">
//         <div className="title-row">
//           <h1>SHOP</h1>
//           {isAdmin && (
//             <button className="add-new" onClick={() => setShowModal(true)}>
//               <Plus size={24} color="pink" />
//             </button>
//           )}
//         </div>

//         <div className="shop-grid">
//           {items.map((item) => (
//             <ItemComponent
//               key={item.id}
//               item={item}
//               isAdmin={isAdmin}
//               editIndex={editIndex}
//               setEditIndex={setEditIndex}
//               fetchItems={fetchItems}
//             />
//           ))}
//         </div>
//       </div>
//       {showModal && (
//         <AddItemModal
//           onClose={() => setShowModal(false)}
//           fetchItems={fetchItems}
//         />
//       )}

//       {/*STYLESHEET*/}
//       <style jsx>{`
//         .shop-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//           gap: 20px;
//           padding: 20px;
//         }
//         .title-row {
//           display: flex;
//           justify-content: space-around;
//           align-items: center;
//           margin-bottom: 20px;
//           width: 100%;
//         }
//         .add-new {
//           background: black;
//           padding: 0.5rem;
//           border-radius: 50%;
//           border: 1px solid pink;
//           cursor: pointer;
//         }
//       `}</style>
//     </>
//   );
// }
