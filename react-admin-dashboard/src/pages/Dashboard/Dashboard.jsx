import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import RevenuePie from "../../components/Charts/RevenuePie";
import OrderStatusPie from "../../components/Charts/OrderStatusPie";

const lineData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 7000 },
  { name: "May", revenue: 6000 },
];

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Users Card */}
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow rounded-lg p-6 transition-colors duration-300">
        <h3 className="text-lg font-semibold mb-2">Users</h3>
        <p className="text-gray-600 dark:text-gray-400">120 Active</p>
      </div>

      {/* Orders Card */}
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow rounded-lg p-6 transition-colors duration-300">
        <h3 className="text-lg font-semibold mb-2">Orders</h3>
        <p className="text-gray-600 dark:text-gray-400">75 Pending</p>
      </div>

      {/* Revenue Card */}
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow rounded-lg p-6 transition-colors duration-300">
        <h3 className="text-lg font-semibold mb-2">Revenue</h3>
        <p className="text-gray-600 dark:text-gray-400">$12,340</p>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow rounded-lg p-6 transition-colors duration-300 col-span-1 lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} />
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="5 5" />
            <XAxis dataKey="name" stroke="var(--chart-axis)" />
            <YAxis stroke="var(--chart-axis)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--chart-tooltip-bg)",
                color: "var(--chart-tooltip-text)",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Charts */}
      <RevenuePie />
      <OrderStatusPie />
    </div>
  );
}