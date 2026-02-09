import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // ✅ import auth context

const initialOrders = [
  { id: 101, customer: "Sneha", product: "Laptop", status: "Pending" },
  { id: 102, customer: "Mina", product: "Phone", status: "Shipped" },
  { id: 103, customer: "Jenny", product: "Headphones", status: "Delivered" },
  { id: 104, customer: "Alexa", product: "Tablet", status: "Pending" },
];

export default function Orders() {
  const { user } = useAuth(); 
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ customer: "", product: "", status: "" });
  const pageSize = 3;


  const filteredOrders = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.status.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + pageSize);

  const startEdit = (order) => {
    setEditId(order.id);
    setFormData({ customer: order.customer, product: order.product, status: order.status });
  };

  const saveEdit = () => {
    setOrders(orders.map(o => o.id === editId ? { ...o, ...formData } : o));
    setEditId(null);
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  const addOrder = () => {
    const newId = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    setOrders([...orders, { id: newId, customer: "New Customer", product: "New Product", status: "Pending" }]);
  };

  return (
    <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Orders</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="p-2 border rounded w-2/3 dark:bg-gray-800 dark:text-white"
        />
        {user?.role === "Admin" && (
          <button onClick={addOrder} className="bg-green-600 text-white px-4 py-2 rounded">
            Add Order
          </button>
        )}
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-2">Order ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Product</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map(order => (
            <tr key={order.id} className="border-b dark:border-gray-600">
              <td className="p-2">{order.id}</td>
              <td className="p-2">
                {editId === order.id ? (
                  <input value={formData.customer} onChange={(e)=>setFormData({...formData,customer:e.target.value})}/>
                ) : order.customer}
              </td>
              <td className="p-2">
                {editId === order.id ? (
                  <input value={formData.product} onChange={(e)=>setFormData({...formData,product:e.target.value})}/>
                ) : order.product}
              </td>
              <td className="p-2">
                {editId === order.id ? (
                  <input value={formData.status} onChange={(e)=>setFormData({...formData,status:e.target.value})}/>
                ) : order.status}
              </td>
              <td className="p-2 flex gap-2">
                {editId === order.id ? (
                  <button onClick={saveEdit} className="bg-green-600 text-white px-2 py-1 rounded">Save</button>
                ) : (
                  user?.role === "Admin" && (
                    <button onClick={()=>startEdit(order)} className="bg-blue-600 text-white px-2 py-1 rounded">Edit</button>
                  )
                )}
                {user?.role === "Admin" && (
                  <button onClick={()=>deleteOrder(order.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button disabled={page===1} onClick={()=>setPage(page-1)} className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50">Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page===totalPages} onClick={()=>setPage(page+1)} className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}