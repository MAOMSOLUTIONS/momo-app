import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Divider } from '@mui/material';
import { differenceInDays, isValid } from 'date-fns';

const ReservationDetails = ({ selectedClient, selectedBodega, totalAmountPaid }) => {
  const today = new Date().toISOString().split('T')[0]; // Fecha de hoy en formato YYYY-MM-DD
  const [startDate, setStartDate] = useState(today); // Inicializar con la fecha de hoy
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState(0);
  const [months, setMonths] = useState(0); // Meses completos
  const [remainingDays, setRemainingDays] = useState(0); // Días adicionales
  const [calculatedAmount, setCalculatedAmount] = useState(0); // Monto total de la renta por el periodo
  const [pendingDeposit, setPendingDeposit] = useState(0); // Depósito pendiente
  const [totalPendingAmount, setTotalPendingAmount] = useState(0); // Total pendiente
  const [isDepositCovered, setIsDepositCovered] = useState(false); // Indica si el depósito está cubierto

  useEffect(() => {
    if (isValid(new Date(startDate)) && isValid(new Date(endDate)) && selectedBodega) {
      const days = differenceInDays(new Date(endDate), new Date(startDate));
      setDuration(days);

      // Calcular meses completos y días restantes
      const fullMonths = Math.floor(days / 30); // Cada mes se considera de 30 días
      const extraDays = days % 30;

      setMonths(fullMonths);
      setRemainingDays(extraDays);

      // Calcular el monto total de renta por el periodo
      const dailyRate = selectedBodega?.latest_price / 30;
      const amount = dailyRate * days;
      setCalculatedAmount(amount);

      const depositRemaining = Math.max(selectedBodega?.deposit_value - totalAmountPaid, 0);
      setPendingDeposit(depositRemaining);

      const totalPending = amount - totalAmountPaid;
      setTotalPendingAmount(totalPending);

      setIsDepositCovered(totalAmountPaid >= selectedBodega?.deposit_value);
    }
  }, [startDate, endDate, selectedBodega, totalAmountPaid]);

  const availabilityDate = selectedBodega?.availability_date || today;

  return (
    <Box>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>Reservación de Minibodegas</Typography>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        {/* Columna 1: Datos del cliente y minibodega */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Datos de la Reservación</Typography>
          <Typography variant="body2"><strong>Cliente:</strong> {selectedClient?.client_name || 'N/A'}</Typography>
          <Typography variant="body2"><strong>Email:</strong> {selectedClient?.client_email || 'N/A'}</Typography>
          <Typography variant="body2"><strong>Teléfono:</strong> {selectedClient?.client_phone || 'N/A'}</Typography>
          
          <Divider sx={{ marginY: 1 }} />
          
          {selectedBodega ? (
            <>
              <Typography variant="body2"><strong>Bodega:</strong> {selectedBodega.asset_name}</Typography>
              <Typography variant="body2"><strong>Tamaño:</strong> {selectedBodega.asset_m2} m² / {selectedBodega.asset_m3} m³</Typography>
              
              <Divider sx={{ marginY: 1 }} />
              
              <Typography variant="body2"><strong>Precio de Renta:</strong> ${selectedBodega.latest_price}</Typography>
              <Typography variant="body2"><strong>Depósito Mínimo:</strong> ${selectedBodega.deposit_value}</Typography>
              <Typography variant="body2"><strong>Disponibilidad:</strong> {availabilityDate}</Typography>
            </>
          ) : (
            <Typography variant="body2">No se ha seleccionado ninguna bodega.</Typography>
          )}
        </Grid>
        
        {/* Columna 2: Detalles de la reserva */}
        {selectedClient && selectedBodega && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>Fechas:</strong></Typography>
            <TextField
              label="Inicio"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              size="small"
              sx={{ marginRight: 1, width: '45%' }}
            />
            <TextField
              label="Fin"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              size="small"
              sx={{ width: '45%' }}
            />

            <Typography variant="body2" sx={{ marginTop: 2 }}>
              <strong>Duración:</strong> {duration} días ({months} meses, {remainingDays} días)
            </Typography>
            <Typography variant="body2"><strong>Monto Total:</strong> ${calculatedAmount.toFixed(2)}</Typography>
            <Typography variant="body2"><strong>Monto Pagado:</strong> ${totalAmountPaid.toFixed(2)}</Typography>
            <Typography variant="body2"><strong>Monto Pendiente:</strong> ${totalPendingAmount.toFixed(2)}</Typography>
            <Typography variant="body2"><strong>Depósito Pendiente:</strong> ${pendingDeposit.toFixed(2)}</Typography>

            <Button
              variant="contained"
              color={isDepositCovered ? 'success' : 'error'}
              sx={{ marginTop: 2 }}
              size="small"
              disabled={!isDepositCovered}
            >
              {isDepositCovered ? 'Depósito Cubierto' : 'Depósito No Cubierto'}
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ReservationDetails;
