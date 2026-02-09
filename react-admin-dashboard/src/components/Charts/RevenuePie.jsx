import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Direct", value: 1500 },
  { name: "Paid", value: 1200 },
  { name: "Social", value: 900 },
  { name: "Other", value: 600 },
];

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

export default function RevenuePie() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors duration-300">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
        Top Revenue Channels
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--chart-tooltip-bg)",
              color: "var(--chart-tooltip-text)",
            }}
          />
          <Legend
            wrapperStyle={{
              color: "var(--legend-text)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}