import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

const GraficaOcupacion = ({ data, barColor}) => {
  return (
    <BarChart width={300} height={200} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis tickFormatter={(value) => `${value}%`} domain={[0, 'dataMax + 10']} />
      <Tooltip />
      <Legend />
      <ReferenceLine y={100} label="" stroke="red" strokeDasharray="3 3" />
      <Bar dataKey="valor" fill={barColor} label={{ position: 'top' }} />
    </BarChart>
  );
};

export default GraficaOcupacion;