import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, LabelList } from 'recharts';

const GraficaBarras = ({ data1, barColor1, barColor2 }) => {
  return (
    <BarChart
      width={250}
      height={150}
      data={data1}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" position="top" /> 
      <YAxis />
      <Tooltip />
      <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '30px' }} />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="real" fill={barColor1}>
        <LabelList dataKey="real" position="center" />
      </Bar>
      <Bar dataKey="proyectado" fill={barColor2}>
        <LabelList dataKey="proyectado" position="center" />
      </Bar>
    </BarChart>
  );
};

export default GraficaBarras;