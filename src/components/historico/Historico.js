import React, { useState, useEffect } from 'react';
import DataTableHistorico from './DataTableHistorico'; // Asegúrate de que el archivo se llama DataTable.js
import GraficaBarrasHistorico from './GraficaBarrasHistorico';
import './styles.css'; 
import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

const Historico = () => {
  const [datosTablaHistorico, setDatosTablaHistorico] = useState([]);

  const actualizarDatosHistoricos = async () => {
    try {
      // Supongamos que necesitas enviar algunos datos al servidor, como un identificador
      const datosParaEnviar = {
        id: "algúnIdentificador" // Ajusta esto según lo que tu API requiera
      };
  
      const response = await fetch('http://127.0.0.1:5000/api/obtener_datos_historicos', {
        method: 'POST', // 
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
      setDatosTablaHistorico(data);
      console.log("aqui",data)
    } catch (error) {
      console.error('Error al actualizar datos de devoluciones:', error);
    }
  };

  useEffect(() => {
    actualizarDatosHistoricos(); 
//        const interval = setInterval(actualizarDatosHistoricos, 300000); // Actualizar cada 5 minutos
//#    return () => clearInterval(interval); // Limpiar intervalo
  }, []);




  return (
      <Box className="contenedor-principal"
        sx={{
          flexGrow: 1,
          backgroundColor: 'grey.100',
          width: '100vw',   // 100% del viewport width
          height: '100vh',  // 100% del viewport height
          backgroundColor: 'grey.100',
          overflow: 'auto', // Asegúrate de que cualquier contenido que se desborde se pueda desplazar
          margin: 0,        // Remueve márgenes predeterminados
          padding: 0,       // Remueve paddings predeterminados
        }}            
      >
        <Grid container justify="space-between" alignItems="center" spacing={2}>

          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <CardHeader 
                title={
                  <Typography variant="subtitle1" component="h2" sx={{ fontSize: '1rem' }}>
                    Historico + Pronóstico
                  </Typography>
                }              
              />              
              <CardContent>
                <DataTableHistorico data={datosTablaHistorico} />
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Box>
  );
};

export default Historico;

