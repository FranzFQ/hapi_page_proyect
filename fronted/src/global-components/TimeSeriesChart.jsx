import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const mockData = [
  { date: 'Oct 01', transacciones: 120 },
  { date: 'Oct 02', transacciones: 180 },
  { date: 'Oct 03', transacciones: 150 },
  { date: 'Oct 04', transacciones: 210 },
  { date: 'Oct 05', transacciones: 250 },
  { date: 'Oct 06', transacciones: 230 },
  { date: 'Oct 07', transacciones: 290 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{`Fecha: ${label}`}</p>
        <p className="tooltip-value">{`Transacciones: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function TimeSeriesChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={mockData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorTransacciones" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-primary-1)" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="var(--color-primary-1)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis dataKey="date" stroke="rgba(255, 255, 255, 0.7)" />
        <YAxis stroke="rgba(255, 255, 255, 0.7)" />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="monotone" 
          dataKey="transacciones" 
          stroke="var(--color-primary-1)" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorTransacciones)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}