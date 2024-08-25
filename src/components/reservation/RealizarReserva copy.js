import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const RealizarReserva = ({ selectedClient, selectedBodega }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationInMilliseconds = endDate - startDate;
    const days = durationInMilliseconds / (1000 * 60 * 60 * 24);
    setDuration(days);
  };

  const handleReservation = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/reservations', {
        id_client: selectedClient.id_client,
        id_asset: selectedBodega.id_asset,
        start_date: startDate,
        end_date: endDate,
        duration: duration,
      });
      setSnackbarMessage('Reservación realizada con éxito');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error al realizar la reservación');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      console.error('Error al realizar la reservación:', error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <Box>

      <TextField
        label="Fecha de Inicio de Reserva"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
          calculateDuration(e.target.value, endDate);
        }}
        fullWidth
        sx={{ marginTop: 2 }}
      />

      <TextField
        label="Fecha de Fin de Reserva"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={(e) => {
          setEndDate(e.target.value);
          calculateDuration(startDate, e.target.value);
        }}
        fullWidth
        sx={{ marginTop: 2 }}
      />

      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Duración: {duration} días
      </Typography>

      <Button variant="contained" color="primary" onClick={handleReservation} sx={{ marginTop: 2 }}>
        Confirmar Reservación
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RealizarReserva;