import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

const GraficaBarras = ({ data1, data2, barColor1, barColor2 }) => {
  return (
    <BarChart width={300} height={200} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis tickFormatter={(value) => `${value}%`} domain={[0, 'dataMax + 10']} />
      <Tooltip />
      <Legend />
      <ReferenceLine y={100} label="" stroke="red" strokeDasharray="3 3" />
      <Bar dataKey="valor1" fill={barColor1} label={{ position: 'top' }} />
      <Bar dataKey="valor2" fill={barColor2} label={{ position: 'top' }} />
    </BarChart>
  );
};

export default GraficaBarras;