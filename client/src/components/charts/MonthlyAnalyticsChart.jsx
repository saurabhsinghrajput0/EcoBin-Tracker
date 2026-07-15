import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Jan', waste: 4000 },
  { name: 'Feb', waste: 3000 },
  { name: 'Mar', waste: 2000 },
  { name: 'Apr', waste: 2780 },
  { name: 'May', waste: 1890 },
  { name: 'Jun', waste: 2390 },
  { name: 'Jul', waste: 3490 },
];

const MonthlyAnalyticsChart = () => {
  return (
    <div className="h-72 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mockData}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#10b981' }}
          />
          <Area type="monotone" dataKey="waste" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorWaste)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyAnalyticsChart;
