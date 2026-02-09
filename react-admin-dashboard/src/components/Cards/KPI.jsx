import React from "react";

export default function KPI({ title, value, change, color }) {
  const colors = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-xl transition flex flex-col gap-2">
      <h3 className="text-sm text-gray-500 dark:text-gray-400">{title}</h3>
      <p className={`text-3xl font-bold ${colors[color]}`}>{value}</p>
      <span className="text-green-600 text-sm font-semibold">{change}</span>
    </div>
  );
}