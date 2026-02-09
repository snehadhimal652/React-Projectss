import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const initialUsers = [
  { id: 1, name: "Sneha", email: "sneha@gmail.com", role: "Admin" },
  { id: 2, name: "Mina", email: "mina22@gmail.com", role: "Editor" },
  { id: 3, name: "Joya", email: "joyasr@gmail.com", role: "Viewer" },
];

export default function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const pageSize = 3;

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  const startEdit = (user) => {
    setEditId(user.id);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  const saveEdit = () => {
    setUsers(users.map(u => u.id === editId ? { ...u, ...formData } : u));
    setEditId(null);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const addUser = () => {
    const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers([...users, { id: newId, name: "New User", email: "new@example.com", role: "Viewer" }]);
  };

  return (
    <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Users</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="p-2 border rounded w-2/3 dark:bg-gray-800 dark:text-white"
        />
        {user?.role === "Admin" && (
          <button onClick={addUser} className="bg-green-600 text-white px-4 py-2 rounded">
            Add User
          </button>
        )}
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map(userItem => (
            <tr key={userItem.id} className="border-b dark:border-gray-600">
              <td className="p-2">{userItem.id}</td>
              <td className="p-2">
                {editId === userItem.id ? (
                  <input value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})}/>
                ) : userItem.name}
              </td>
              <td className="p-2">
                {editId === userItem.id ? (
                  <input value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})}/>
                ) : userItem.email}
              </td>
              <td className="p-2">
                {editId === userItem.id ? (
                  <input value={formData.role} onChange={(e)=>setFormData({...formData,role:e.target.value})}/>
                ) : userItem.role}
              </td>
              <td className="p-2 flex gap-2">
                {editId === userItem.id ? (
                  <button onClick={saveEdit} className="bg-green-600 text-white px-2 py-1 rounded">Save</button>
                ) : (
                  user?.role === "Admin" && (
                    <button onClick={()=>startEdit(userItem)} className="bg-blue-600 text-white px-2 py-1 rounded">Edit</button>
                  )
                )}
                {user?.role === "Admin" && (
                  <button onClick={()=>deleteUser(userItem.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
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