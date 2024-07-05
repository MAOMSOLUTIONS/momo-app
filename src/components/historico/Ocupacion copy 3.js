import React, { useState, useEffect } from 'react';
import DataTable from './DataTableHistorico'; // Asegúrate de que el archivo se llama DataTable.js
import SalesChart from './SalesChart'; // Asegúrate de que el archivo se llama SalesChart.js
import GraficaBarras from './GraficaBarras';
import './styles.css'; 
import { Box,FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Ocupacion = () => {
// Suponemos que esta función se ejecuta en el año 2024 para el ejemplo dado

  const getLastUpdated = () => {
    const now = new Date();
    return now.toLocaleString(); // o podrías formatearlo como prefieras
  };
  const [lastUpdated, setLastUpdated] = useState(getLastUpdated());
  
  const [graficasData, setGraficasData] = useState({
    devoluciones: [],
    stagging: [],
    rumba: [],
    rack: [],
    // Añade más según sea necesario
  });

  const [datosTabla, setDatosTabla] = useState([]);

  const obtenerDatosOcupacion = async () => {
    try {
      const respuesta = await fetch('http://127.0.0.1:5000/api/obtener_datos_ocupacion'); // Ajusta la URL según sea necesario
      if (!respuesta.ok) {
        throw new Error(`Error en la llamada a la API: ${respuesta.status}`);
      }
      const datos = await respuesta.json();
      setDatosTabla(datos); // Suponiendo que la respuesta de la API es el array de datos directamente
    } catch (error) {
      console.error('Error al obtener datos de ocupación:', error);
    }
  };  

  const actualizarDatosDevoluciones = async () => {
    try {
      // Supongamos que necesitas enviar algunos datos al servidor, como un identificador
      const datosParaEnviar = {
        id: "algúnIdentificador" // Ajusta esto según lo que tu API requiera
      };
  
      const response = await fetch('http://127.0.0.1:5000/api/ocupacion', {
        method: 'POST', // Especifica que es una solicitud POST
        headers: {
          // Ajusta los headers según tu API. Aquí un ejemplo común:
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosParaEnviar), // Convierte tus datos a string en formato JSON
      });
  
      if (!response.ok) { // Verifica si la respuesta no es exitosa
        throw new Error(`HTTP error! status: ${response.status}`); // Lanza un error con el status
      }
  
      const data = await response.json();
      setGraficasData(data);
    } catch (error) {
      console.error('Error al actualizar datos de devoluciones:', error);
    }
  };

  useEffect(() => {
    actualizarDatosDevoluciones(); // Actualizar al montar el componente
    obtenerDatosOcupacion();
    const interval = setInterval(actualizarDatosDevoluciones, 30000); // Actualizar cada 5 minutos
    return () => clearInterval(interval); // Limpiar intervalo
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
        <GraficaBarras data1={graficasData.Devoluciones} barColor1="rgba(0, 128, 0, 0.5)" barColor2="rgba(255, 0, 0, 0.5)" />
        <GraficaBarras data1={graficasData.Rumba} barColor1="rgba(0, 128, 0, 0.5)" barColor2="rgba(255, 0, 0, 0.5)" />
        <GraficaBarras data1={graficasData.Rack} barColor1="rgba(0, 128, 0, 0.5)" barColor2="rgba(255, 0, 0, 0.5)" />
        <GraficaBarras data1={graficasData.Stagging} barColor1="rgba(0, 128, 0, 0.5)" barColor2="rgba(255, 0, 0, 0.5)" />
      </Box>
      <Box >
        <DataTable data={datosTabla} />
      </Box>
  </div>    
  );
};

export default Ocupacion;