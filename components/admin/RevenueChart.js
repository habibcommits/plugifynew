"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
    { name: 'Jul', revenue: 3490 },
    { name: 'Aug', revenue: 4200 },
    { name: 'Sep', revenue: 5100 },
    { name: 'Oct', revenue: 4500 },
    { name: 'Nov', revenue: 6000 },
    { name: 'Dec', revenue: 7000 },
];

export default function RevenueChart() {
    return (
        <div className="bg-surface border border-border rounded-xl p-6 shadow-lg h-[400px]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Revenue Analytics</h2>
                    <p className="text-sm text-gray-400">Monthly revenue growth</p>
                </div>
                <select className="bg-[#2a2a2a] border border-border rounded-lg text-sm px-3 py-1 text-gray-300 outline-none">
                    <option>Last 12 Months</option>
                    <option>Last 6 Months</option>
                    <option>Last 30 Days</option>
                </select>
            </div>

            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#666"
                            tick={{ fill: '#888', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#666"
                            tick={{ fill: '#888', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            contentStyle={{ background: '#1f1f1f', border: '1px solid #333', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#8b5cf6"
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
