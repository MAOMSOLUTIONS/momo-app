// ReservationDetails.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Divider } from '@mui/material';
import { differenceInDays, isValid } from 'date-fns';
import axios from 'axios';

const ReservationDetails = ({ 
  selectedClient, 
  selectedBodega, 
  totalAmountPaid, 
  currentReservationId,
  onPaymentDueDateChange,
  onReservationDetailsChange
}) => {
  const today = new Date().toISOString().split('T')[0]; // Fecha de hoy en formato YYYY-MM-DD
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState(0);
  const [months, setMonths] = useState(0);
  const [remainingDays, setRemainingDays] = useState(0);
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  const [pendingDeposit, setPendingDeposit] = useState(0);
  const [totalPendingAmount, setTotalPendingAmount] = useState(0);
  const [isDepositCovered, setIsDepositCovered] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentDueDate, setPaymentDueDate] = useState(today);

  useEffect(() => {
    // Agregar depuración
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);

    if (!startDate || !endDate || !selectedBodega) {
      // Si falta alguna fecha o no hay bodega seleccionada, no hacemos nada
      return;
    }

    if (isValid(new Date(startDate)) && isValid(new Date(endDate))) {
      const days = differenceInDays(new Date(endDate), new Date(startDate));
      setDuration(days);

      const fullMonths = Math.floor(days / 30);
      const extraDays = days % 30;

      setMonths(fullMonths);
      setRemainingDays(extraDays);

      const dailyRate = selectedBodega?.latest_price / 30;
      const amount = dailyRate * days;  // Monto total calculado en base a los días
      setCalculatedAmount(amount);

      // Si ya existe una reserva, obtenemos los datos
      if (currentReservationId) {
        axios.get(`http://localhost:5000/api/reservations/${currentReservationId}`)
          .then(response => {
            const reservation = response.data;
            const totalPaid = reservation.reservation_amount_paid;
            
            // El Monto Pendiente es igual al Monto Total - Monto Pagado
            const totalPending = amount - totalPaid;
            setTotalPendingAmount(totalPending);

            // Depósito pendiente se ajusta a cero si ya está cubierto
            const depositPending = Math.max(0, reservation.reservation_deposit_amount - totalPaid);
            setPendingDeposit(depositPending);

            // Verificamos si el depósito está cubierto
            setIsDepositCovered(totalPaid >= reservation.reservation_deposit_amount);
            setPaymentStatus(reservation.reservation_payment_status);
            setPaymentDueDate(reservation.payment_due_date || today);
            onPaymentDueDateChange(reservation.payment_due_date || today);

            // Pasar los datos a `MinibodegasTabs`
            onReservationDetailsChange({
              calculatedAmount: amount,
              totalAmountPaid: totalPaid,
              totalPendingAmount: totalPending,
              pendingDeposit: depositPending,
              startDate: startDate,
              endDate: endDate,
              duration: days,
            });

          })
          .catch(error => {
            console.error('Error al obtener la reserva:', error);
          });
      } else {
        // Si no hay reserva existente, pasar los datos calculados
        onReservationDetailsChange({
          calculatedAmount: amount,
          totalAmountPaid: totalAmountPaid || 0,
          totalPendingAmount: amount - (totalAmountPaid || 0),
          pendingDeposit: selectedBodega.deposit_value - (totalAmountPaid || 0),
          startDate: startDate,
          endDate: endDate,
          duration: days,
        });
      }

      // Recalcular cuando cambia el monto total pagado
      if (totalAmountPaid !== null && totalAmountPaid !== undefined) {
        setTotalPendingAmount(amount - totalAmountPaid);

        // Recalcular depósito pendiente basado en lo pagado
        const depositPending = Math.max(0, selectedBodega.deposit_value - totalAmountPaid);
        setPendingDeposit(depositPending);
        setIsDepositCovered(totalAmountPaid >= selectedBodega.deposit_value);
      }
    } else {
      console.error('Fechas inválidas');
    }
  }, [startDate, endDate, selectedBodega, totalAmountPaid, currentReservationId]);

  const handlePaymentDueDateChange = (e) => {
    setPaymentDueDate(e.target.value);
    onPaymentDueDateChange(e.target.value);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>Reservación de Minibodegas</Typography>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
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
              <Typography variant="body2"><strong>Disponibilidad:</strong> {selectedBodega.availability_date}</Typography>
              <Typography variant="body2"><strong>Reservación Número:</strong> {currentReservationId || 'N/A'}</Typography>
              <Typography variant="body2"><strong>Estado del Pago:</strong> {paymentStatus || 'N/A'}</Typography>

            </>
          ) : (
            <Typography variant="body2">No se ha seleccionado ninguna bodega.</Typography>
          )}
        </Grid>
        
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

            {/* Mostrar mensaje de error si falta la fecha de fin */}
            {!endDate && (
              <Typography color="error">Por favor, selecciona una fecha de fin.</Typography>
            )}

            <Typography variant="body2" sx={{ marginTop: 2 }}>
              <strong>Duración:</strong> {duration} días ({months} meses, {remainingDays} días)
            </Typography>
            <Typography variant="body2"><strong>Monto Total:</strong> ${calculatedAmount.toFixed(2)}</Typography>
            <Typography variant="body2"><strong>Monto Pagado:</strong> ${totalAmountPaid.toFixed(2)}</Typography>
            <Typography variant="body2"><strong>Monto Pendiente:</strong> ${totalPendingAmount.toFixed(2)}</Typography>
            <Typography variant="body2"><strong>Depósito Pendiente:</strong> ${pendingDeposit.toFixed(2)}</Typography>
            <Typography variant="body2"><strong>Fecha límite para completar el pago:</strong></Typography>
            <TextField
              label="Fecha límite"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={paymentDueDate}
              onChange={handlePaymentDueDateChange}
              size="small"
              fullWidth
              sx={{ marginTop: 2 }}
            />
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
