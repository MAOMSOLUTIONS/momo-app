import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, CircularProgress, Container, Typography, Box, Button } from '@mui/material';

const Factores = () => {
  const [factores, setFactores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener los factores
  const fetchFactores = async () => {
    const id = 2;
    const url = `https://6tymdphleg.execute-api.us-east-2.amazonaws.com/default/ocupacion?id=${id}`;
    try {
        console.log("aqui estamos")
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {        
            console.log("LOS DATOS",data); // Haz algo con los datos
            console.log("LOS factores",data.message); // Haz algo con los datos
            setFactores(data.message);
            setIsLoading(false);
    
        } else {
            throw new Error(data.message || 'Error al hacer la solicitud GET');
        }
        } catch (error) {
        console.error("Error al obtener los factores:", error);
        setIsLoading(false);            
    }
};
      
  // Función para actualizar un factor
  const updateFactor = async (id_registro, valor) => {
    const id = 3;
    const url = `https://6tymdphleg.execute-api.us-east-2.amazonaws.com/default/ocupacion?id=${id}&id_registro=${id_registro}&valor_factores=${valor}`;
    try {
        const response = await axios.get(url);
        console.log("Respuesta de la actualización:", response.data);
        fetchFactores(); // Recargar los factores después de la actualización
    } catch (error) {
      console.error("Error al actualizar el factor:", error);
    }
  };

  useEffect(() => {
    fetchFactores();
  }, []);

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Factores
      </Typography>
      {factores.map((factor) => (
        <Box key={factor.id_factores} my={2}>
          <TextField
            fullWidth
            label={factor.nombre_factores}
            variant="outlined"
            value={factor.valor_factores}
            onChange={(e) => updateFactor(factor.id_factores, e.target.value)}
            type="number" // Considera usar "number" si el valor debe ser numérico
          />
        </Box>
      ))}
    </Container>
  );
};

export default Factores;