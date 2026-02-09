import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; 
const initialProducts = [
  { id: 1, name: "Laptop", price: "$1200", stock: 15 },
  { id: 2, name: "Phone", price: "$800", stock: 30 },
  { id: 3, name: "Headphones", price: "$150", stock: 50 },
  { id: 4, name: "Tablet", price: "$600", stock: 20 },
  { id: 5, name: "Monitor", price: "$300", stock: 10 },
];

export default function Products() {
  const { user } = useAuth(); 
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", stock: "" });
  const pageSize = 3;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.price.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

  const startEdit = (product) => {
    setEditId(product.id);
    setFormData({ name: product.name, price: product.price, stock: product.stock });
  };

  const saveEdit = () => {
    setProducts(products.map(p => p.id === editId ? { ...p, ...formData } : p));
    setEditId(null);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addProduct = () => {
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, { id: newId, name: "New Product", price: "$0", stock: 0 }]);
  };

  return (
    <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Products</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="p-2 border rounded w-2/3 dark:bg-gray-800 dark:text-white"
        />
        {user?.role === "Admin" && (
          <button onClick={addProduct} className="bg-green-600 text-white px-4 py-2 rounded">
            Add Product
          </button>
        )}
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map(product => (
            <tr key={product.id} className="border-b dark:border-gray-600">
              <td className="p-2">{product.id}</td>
              <td className="p-2">
                {editId === product.id ? (
                  <input value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})}/>
                ) : product.name}
              </td>
              <td className="p-2">
                {editId === product.id ? (
                  <input value={formData.price} onChange={(e)=>setFormData({...formData,price:e.target.value})}/>
                ) : product.price}
              </td>
              <td className="p-2">
                {editId === product.id ? (
                  <input value={formData.stock} onChange={(e)=>setFormData({...formData,stock:e.target.value})}/>
                ) : product.stock}
              </td>
              <td className="p-2 flex gap-2">
                {editId === product.id ? (
                  <button onClick={saveEdit} className="bg-green-600 text-white px-2 py-1 rounded">Save</button>
                ) : (
                  user?.role === "Admin" && (
                    <button onClick={()=>startEdit(product)} className="bg-blue-600 text-white px-2 py-1 rounded">Edit</button>
                  )
                )}
                {user?.role === "Admin" && (
                  <button onClick={()=>deleteProduct(product.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
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