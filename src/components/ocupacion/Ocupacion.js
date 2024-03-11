import React, { useState, useEffect } from 'react';
import DataTable from './DataTable'; // Asegúrate de que el archivo se llama DataTable.js
import SalesChart from './SalesChart'; // Asegúrate de que el archivo se llama SalesChart.js
import GraficaOcupacion from './GraficaOcupacion';
import GraficaBarras from './GraficaBarras';

import './styles.css'; 
import { Box,FormControl, InputLabel, Select, MenuItem } from '@mui/material';



const months = ['Todos', ...Array.from({ length: 12 }, (_, i) => i + 1)];
const weeks = ['Todos', ...Array.from({ length: 4 }, (_, i) => i + 1)];

const data2 = [{ name: "Ocupación Real", valor: 70 }]; // Asume 70% de ocupación
const data3 = [{ name: "Ocupación Pronóstico", valor: 110 }]; // Asume 70% de ocupación

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

const dataTabla = [
  {
    SKU: "2610MD381371",
    Tipo: "Enser Mayor",
    "8": 415,
    "9": 200,
    "10": 91,
    VentaAcumulada: 1870,
    DemandaDiaria: 48,
    InventarioActualDisponible: 184,
    InventarioOptimo15dias: 719,
    PuntoDeReorden: 287,
    CantidadASolicitar: 535,
    InvenActM2: 13,
    InvenOptM2: 53,
  },
  {
    SKU: "2610MD339132",
    Tipo: "Enser Mayor",
    "8": 5,
    "9": 29,
    "10": 1,
    VentaAcumulada: 1292.66667,
    DemandaDiaria: 8,
    InventarioActualDisponible: 176,
    InventarioOptimo15dias: 126,
    PuntoDeReorden: 50,
    CantidadASolicitar: 0,
    InvenActM2: 23,
    InvenOptM2: 17,
  },
  {
    SKU: "2610MD815008",
    Tipo: "Enser Mayor",
    "8": 274,
    "9": 64,
    "10": 33,
    VentaAcumulada: 1150,
    DemandaDiaria: 19,
    InventarioActualDisponible: 10,
    InventarioOptimo15dias: 289,
    PuntoDeReorden: 116,
    CantidadASolicitar: 279,
    InvenActM2: 1,
    InvenOptM2: 32,
  }
];


const Ocupacion = () => {
// Suponemos que esta función se ejecuta en el año 2024 para el ejemplo dado
const generarDatosHastaHoy = () => {
  const hoy = new Date();
  const datos = [];
  let acumuladoVentas = 0;
  let acumuladoForecast = 0;

  for (let i = 1; i <= hoy.getMonth() + 1; i++) {
    for (let j = 1; j <= 4; j++) { // Asumimos 4 semanas por mes
      // Aquí se simularía la lógica para sumar tus ventas y pronósticos
      // Usamos números aleatorios como ejemplo
      const ventasSemanales = Math.floor(Math.random() * 200);
      const forecastSemanal = Math.floor(Math.random() * 200);
      acumuladoVentas += ventasSemanales;
      acumuladoForecast += forecastSemanal;

      datos.push({
        SEMANA: `2024-${i}-${j}`,
        VENTAS: acumuladoVentas,
        FORECAST: acumuladoForecast,
      });

      // Si alcanzamos la semana actual, paramos
      const fechaSemanaActual = new Date(2024, i - 1, j * 7);
      if (fechaSemanaActual >= hoy) {
        break;
      }
    }
    if (new Date(2024, i - 1) >= hoy) {
      break;
    }
  }

  return datos;
};



  // Puedes reemplazar estos valores con los reales obtenidos de alguna fuente de datos
  const skus = ['Todos', 'SKU1', 'SKU2', 'SKU3']; // Ejemplo de SKUs
  const uniqueSkus = Array.from(new Set(data.map(item => item.SKU)));
  const allSkus = ['Todos', ...uniqueSkus]; 


  const [selectedSku, setSelectedSku] = useState(allSkus[0]);
  const [selectedMonth, setSelectedMonth] = useState(months[0]); // Inicializa como "Todos"
  const [selectedWeek, setSelectedWeek] = useState(weeks[0]); // Inicializa como "Todos"


  // Cambio en los selectores
  const handleSkuChange = (e) => setSelectedSku(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleWeekChange = (e) => setSelectedWeek(e.target.value);

  const getLastUpdated = () => {
    const now = new Date();
    return now.toLocaleString(); // o podrías formatearlo como prefieras
  };
  const [lastUpdated, setLastUpdated] = useState(getLastUpdated());
  
  const [dataGenerada, setDataGenerada] = useState([]);
  useEffect(() => {
    setDataGenerada(generarDatosHastaHoy());
  }, []);

  return (
    <div className="contenedor-principal">
      <div className="header">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <h2>Ocupación del Centro de Distribución</h2>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Box className="last-updated" sx={{ display: 'flex', alignItems: 'center' }}>
            <span>Última actualización: {lastUpdated}</span>
          </Box>
        </Box>
        <Box className="separator"></Box>
      </div>

      <Box className="contenedor-graficas-ocupacion">
        {/* Estos deberían ser los gráficos que quieres que aparezcan debajo */}
        <GraficaOcupacion data={data2} barColor="rgba(0, 128, 0, 0.5)" />
        <GraficaOcupacion data={data3} barColor="rgba(255, 0, 0, 0.5)" />
        <GraficaOcupacion data={data3} barColor="rgba(255, 0, 0, 0.5)" />
      </Box>
      <Box className="contenedor-graficas-ocupacion">
        {/* Estos deberían ser los gráficos que quieres que aparezcan debajo */}
        <GraficaOcupacion data={data2} barColor="rgba(0, 128, 0, 0.5)" />
        <GraficaOcupacion data={data3} barColor="rgba(255, 0, 0, 0.5)" />
        <GraficaOcupacion data={data3} barColor="rgba(255, 0, 0, 0.5)" data2={data3}/>
      </Box>
      <Box className="contenedor-graficas-ocupacion">
        {/* Estos deberían ser los gráficos que quieres que aparezcan debajo */}
        <GraficaOcupacion data1={data2} barColor1="rgba(0, 128, 0, 0.5)" data2={data2} barColor2="rgba(255, 0, 0, 0.5)" />
      </Box>


      <Box >
      <DataTable data={dataTabla} />
      </Box>
  </div>    
  );
};

export default Ocupacion;