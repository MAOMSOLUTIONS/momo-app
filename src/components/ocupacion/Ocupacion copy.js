import React, { useState } from 'react';
import DataTable from './DataTable'; // Asegúrate de que el archivo se llama DataTable.js
import SalesChart from './SalesChart'; // Asegúrate de que el archivo se llama SalesChart.js
import GraficaOcupacion from './GraficaOcupacion';
import './styles.css'; 



const data = [
  {
    SKU: "2610MD381371",
    MES: 1,
    SEMANA: 1,
    FECHA: "2024-01-01",
    factor: 0.25,
    FORECAST: 632,
    VENTAS: 10,
    lambda: 0.3,
    EWMA_PRONOSTICO_SEMANAL: 10,
    LeadTime: 3,
    demanda_promedio_por_dia: 1.428571429,
    stock_de_seguridad: 63.2,
    ROP: 67
  },
  {
    SKU: "2610MD381371",
    MES: 1,
    SEMANA: 2,
    FECHA: "2024-01-08",
    factor: 0.25,
    FORECAST: 632,
    VENTAS: 134,
    lambda: 0.3,
    EWMA_PRONOSTICO_SEMANAL: 48.2,
    LeadTime: 3,
    demanda_promedio_por_dia: 6.885714286,
    stock_de_seguridad: 63.2,
    ROP: 84
  },
  {
    SKU: "2610MD381371",
    MES: 1,
    SEMANA: 3,
    FECHA: "2024-01-15",
    factor: 0.25,
    FORECAST: 632,
    VENTAS: 175,
    lambda: 0.3,
    EWMA_PRONOSTICO_SEMANAL: 91.06,
    LeadTime: 3,
    demanda_promedio_por_dia: 13.00857143,
    stock_de_seguridad: 63.2,
    ROP: 102
  },
];
const data2 = [{ name: "Ocupación Real", valor: 70 }]; // Asume 70% de ocupación
const data3 = [{ name: "Ocupación Pronóstico", valor: 110 }]; // Asume 70% de ocupación

const Ocupacion = () => {
  // Puedes reemplazar estos valores con los reales obtenidos de alguna fuente de datos
  const skus = ['Todos', 'SKU1', 'SKU2', 'SKU3']; // Ejemplo de SKUs
  const [selectedSku, setSelectedSku] = useState(skus[0]); // Estado para SKU seleccionado
  const [selectedMonth, setSelectedMonth] = useState('1'); // Estado para mes seleccionado
  const [selectedWeek, setSelectedWeek] = useState('1'); // Estado para semana seleccionada

  // Cambio en los selectores
  const handleSkuChange = (e) => setSelectedSku(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleWeekChange = (e) => setSelectedWeek(e.target.value);


  return (
    <div className="contenedor-principal">
      <div className="header">
        <h2>Ocupación del Centro de Distribución</h2>
        <div className="selectors">
          <select value={selectedSku} onChange={handleSkuChange}>
            {skus.map(sku => (
              <option key={sku} value={sku}>{sku}</option>
            ))}
          </select>
          <select value={selectedMonth} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select value={selectedWeek} onChange={handleWeekChange}>
            {/* Asumiendo 4 semanas por mes, ajusta según sea necesario */}
            {Array.from({ length: 4 }, (_, i) => (
              <option key={i + 1} value={i + 1}>Semana {i + 1}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="contenedor-graficas">
        {/* Asegúrate de que sólo este gráfico esté aquí */}
        <SalesChart data={data} />
      </div>
      <div className="contenedor-graficas-ocupacion">
        {/* Estos deberían ser los gráficos que quieres que aparezcan debajo */}
        <GraficaOcupacion data={data2} />
        <GraficaOcupacion data={data3} />
      </div>
      <DataTable data={data} />
  </div>    
  );
};

export default Ocupacion;