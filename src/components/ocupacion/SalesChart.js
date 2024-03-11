import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const SalesChart = ({ data }) => {
  // Calcula la semana actual del año
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };
  
  const currentWeek = getWeekNumber(new Date());

  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis 
          dataKey="SEMANA" 
          tickFormatter={(semana) => {
            const weekNum = parseInt(semana.split('-')[2], 10); // Asumiendo que SEMANA tiene formato "año-mes-semana"
            return `Semana ${weekNum}`;
          }}
          // Asegúrate de que solo las semanas hasta la actual se muestren
          ticks={data.filter(d => parseInt(d.SEMANA.split('-')[2], 10) <= currentWeek).map(d => d.SEMANA)}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="VENTAS" stroke="#82ca9d" name="Venta Real" />
        <Line type="monotone" dataKey="FORECAST" stroke="#8884d8" name="Forecast" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;