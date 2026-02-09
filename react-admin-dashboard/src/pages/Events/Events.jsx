import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; 
const initialEvents = [
  { id: 1, title: "Launch Party", date: "2026-02-10", location: "Kathmandu" },
  { id: 2, title: "Team Meeting", date: "2026-02-15", location: "Online" },
  { id: 3, title: "Hackathon", date: "2026-03-01", location: "Pokhara" },
  { id: 4, title: "Workshop", date: "2026-03-10", location: "Biratnagar" },
  { id: 5, title: "Conference", date: "2026-03-20", location: "Chitwan" },
];

export default function Events() {
  const { user } = useAuth(); 
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ title: "", date: "", location: "" });
  const pageSize = 3;

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()) ||
      e.date.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + pageSize);

  const startEdit = (event) => {
    setEditId(event.id);
    setFormData({ title: event.title, date: event.date, location: event.location });
  };

  const saveEdit = () => {
    setEvents(events.map(e => e.id === editId ? { ...e, ...formData } : e));
    setEditId(null);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const addEvent = () => {
    const newId = events.length ? Math.max(...events.map(e => e.id)) + 1 : 1;
    setEvents([...events, { id: newId, title: "New Event", date: "2026-04-01", location: "Unknown" }]);
  };

  return (
    <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Events</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="p-2 border rounded w-2/3 dark:bg-gray-800 dark:text-white"
        />
        {user?.role === "Admin" && (
          <button onClick={addEvent} className="bg-green-600 text-white px-4 py-2 rounded">
            Add Event
          </button>
        )}
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-2">ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Date</th>
            <th className="p-2">Location</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEvents.map(event => (
            <tr key={event.id} className="border-b dark:border-gray-600">
              <td className="p-2">{event.id}</td>
              <td className="p-2">
                {editId === event.id ? (
                  <input value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})}/>
                ) : event.title}
              </td>
              <td className="p-2">
                {editId === event.id ? (
                  <input value={formData.date} onChange={(e)=>setFormData({...formData,date:e.target.value})}/>
                ) : event.date}
              </td>
              <td className="p-2">
                {editId === event.id ? (
                  <input value={formData.location} onChange={(e)=>setFormData({...formData,location:e.target.value})}/>
                ) : event.location}
              </td>
              <td className="p-2 flex gap-2">
                {editId === event.id ? (
                  <button onClick={saveEdit} className="bg-green-600 text-white px-2 py-1 rounded">Save</button>
                ) : (
                  user?.role === "Admin" && (
                    <button onClick={()=>startEdit(event)} className="bg-blue-600 text-white px-2 py-1 rounded">Edit</button>
                  )
                )}
                {user?.role === "Admin" && (
                  <button onClick={()=>deleteEvent(event.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
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