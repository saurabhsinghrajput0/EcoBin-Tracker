import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Plastic', value: 400 },
  { name: 'Organic', value: 300 },
  { name: 'Glass', value: 300 },
  { name: 'Paper', value: 200 },
];

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-gray-200 dark:border-slate-700 p-3 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: payload[0].payload.fill }}></div>
          <p className="text-gray-700 dark:text-gray-200 font-semibold">{payload[0].name}</p>
        </div>
        <p className="font-bold text-lg text-gray-900 dark:text-white ml-5">
          {payload[0].value} <span className="text-sm font-medium text-gray-500">kg</span>
        </p>
      </div>
    );
  }
  return null;
};

const WasteCategoryChart = () => {
  return (
    <div className="h-72 w-full mt-4 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={70}
            outerRadius={95}
            paddingAngle={6}
            dataKey="value"
            stroke="none"
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                className="hover:opacity-80 transition-opacity duration-300 outline-none drop-shadow-md"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle" 
            wrapperStyle={{ fontSize: '13px', fontWeight: 500 }}
            className="text-gray-700 dark:text-gray-300"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WasteCategoryChart;
