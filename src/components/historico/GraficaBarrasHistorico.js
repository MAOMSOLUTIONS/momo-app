import React from 'react';
import { Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  LabelList,
} from 'recharts';

const GraficaBarras = ({ data1, barColor1, barColor2, titulo, titulo2 }) => {

  const formatoPorcentaje = (value) => `${value}%`;

  const renderCustomBarLabel = ({ value }) => {
    return `${value}%`;
  };

  return (
    <>
      {/* Título del gráfico */}
      <Typography variant="subtitle2" component="h3" align="center" gutterBottom>
        {titulo}
      </Typography>

      <BarChart
        width={300}
        height={150}
        data={data1}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* Añade el formateador de porcentaje al eje Y */}
        <YAxis tickFormatter={formatoPorcentaje} />
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
      {/* Título del gráfico */}
      <Typography variant="subtitle2" component="h3" align="center" gutterBottom>
        {titulo2}
      </Typography>
    </>
  );
};

export default GraficaBarras;