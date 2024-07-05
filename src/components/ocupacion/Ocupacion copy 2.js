import React, { useState, useEffect } from 'react';
import DataTable from './DataTable'; // Asegúrate de que el archivo se llama DataTable.js
import SalesChart from './SalesChart'; // Asegúrate de que el archivo se llama SalesChart.js
import GraficaBarras from './GraficaBarras';
import './styles.css'; 
import { Box,FormControl, InputLabel, Select, MenuItem,Tabs, Tab,Typography } from '@mui/material';


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

  const [selectedTab, setSelectedTab] = useState('general');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleBarClick = (chartName) => {
    console.log('Bar clicked:', chartName);
    // Aquí puedes manejar la lógica para actualizar el estado o realizar otras acciones
  };
  const actualizarDatosDevoluciones = async () => {
    try {
      // Supongamos que necesitas enviar algunos datos al servidor, como un identificador
      const datosParaEnviar = {
        "id": 1 // Ajusta esto según lo que tu API requiera
      };
//      const response = await fetch(process.env.REACT_APP_API_ENDPOINT, {
      const response = await fetch("https://6tymdphleg.execute-api.us-east-2.amazonaws.com/default/ocupacion", {
        method: 'POST', // Especifica que es una solicitud POST
        headers: {
          'Access-Control-Allow-Origin': 'http://ecinlat.s3-website.us-east-2.amazonaws.com',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'true',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosParaEnviar), // Convierte tus datos a string en formato JSON
      });

      console.log("ANTES")
      const responseData = await response.json();
      console.log("DESPUES",responseData)
      if (responseData.message) {
        setGraficasData(responseData.message.indicadores);
        setDatosTabla(responseData.message.datos_ocupacion); // Suponiendo que la respuesta de la API es el array de datos directamente
      } else {
          console.error("La respuesta no tiene la propiedad message esperada:", responseData);
      }    
    } catch (error) {
      console.error('Error al actualizar datos de devoluciones:', error);
    }
  };

  useEffect(() => {
    actualizarDatosDevoluciones(); // Actualizar al montar el componente
    const interval = setInterval(actualizarDatosDevoluciones, 300000); // Actualizar cada 5 minutos
    return () => clearInterval(interval); // Limpiar intervalo
  }, []);


  const TabPanel = ({ children, value, index, ...other }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

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
        <GraficaBarras data1={graficasData.Devoluciones} titulo="DEVOLUCIONES (Proyectado 1 mes)" titulo2="Capacidad 240 Pallets" barColor1="rgba(0, 128, 0, 0.5)" barColor2="rgba(255, 0, 0, 0.5)" />
        <GraficaBarras data1={graficasData.Rumba} titulo="RUMBA (Proyectado 15 días)" titulo2="Capacidad 1932 m2" barColor1="rgba(0, 128, 0, 0.5)" barColor2="rgba(255, 0, 0, 0.5)" />
        <GraficaBarras data1={graficasData.Rack}  titulo="RACK (Proyectado 15 días)" titulo2="Capacidad 400 pallets" barColor1="rgba(0, 128, 0, 0.5)" barColor2="rgba(255, 0, 0, 0.5)" />
        <GraficaBarras data1={graficasData.Stagging} titulo="STAGGING (Hoy)" titulo2="Capacidad 1500 m2" barColor1="rgba(0, 128, 0, 0.5)" barColor2="rgba(255, 0, 0, 0.5)" />
      </Box>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="basic tabs example">
        <Tab label="General" value="general"/>
        <Tab label="Devoluciones" />
            <Tab label="RUMBA" />
            <Tab label="RACK" />
            <Tab label="STAGGING" />
      </Tabs>
    </Box>
    <TabPanel value={selectedTab} index="general">
      {/* Solo se mostrará si selectedTab es "general" */}
      <DataTable data={datosTabla} />
    </TabPanel>

      
  </div>    
  );
};

export default Ocupacion;