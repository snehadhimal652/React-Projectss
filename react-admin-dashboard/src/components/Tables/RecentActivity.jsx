import React from "react";

const activities = [
  { id: 1, action: "New user registered", date: "2026-02-01" },
  { id: 2, action: "Order #123 completed", date: "2026-02-02" },
  { id: 3, action: "Product added: Laptop", date: "2026-02-03" },
];

export default function RecentActivity() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-4 mt-6">
      <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Action</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a) => (
            <tr key={a.id} className="border-b">
              <td className="p-2">{a.action}</td>
              <td className="p-2">{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}