import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';
import axios from 'axios';
import { columnGroupsStateInitializer } from '@mui/x-data-grid/internals';

const GenerarPago = ({ 
  selectedClient, 
  selectedBodega, 
  onPaymentUpdate, 
  reservationId, 
  paymentDueDate,
  calculatedAmount,  // Recibir los detalles
  totalAmountPaid,
  totalPendingAmount,
  pendingDeposit,
  startDate,
  endDate,
  duration,
}) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [accountNumber, setAccountNumber] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [payments, setPayments] = useState([]);
  const [currentReservationId, setCurrentReservationId] = useState(reservationId);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [amountPaid, setAmountPaid] = useState(totalAmountPaid || 0);
  const [totalRemaining, setTotalRemaining] = useState(totalPendingAmount || 0);
  const [depositRemaining, setDepositRemaining] = useState(pendingDeposit || 0);
  const [isProcessing, setIsProcessing] = useState(false);  // Estado para mostrar indicador de procesamiento

 // Fetch pagos y detalles de la reservación desde la API
 useEffect(() => {
  if (currentReservationId && !isProcessing) {
    setIsProcessing(true); // Evitar duplicación de llamadas mientras se procesa

    const fetchPaymentsAndDetails = async () => {
      try {
        // Llamada para obtener los pagos
        console.log("dentro del useeffect")
        const paymentsResponse = await axios.get(`http://localhost:5000/api/reservations/${currentReservationId}/payments`);
        const fetchedPayments = paymentsResponse.data.payments;
        setPayments(fetchedPayments);

        const totalPagado = fetchedPayments.reduce((acc, payment) => acc + payment.payment_amount, 0);
        setAmountPaid(totalPagado);
        setTotalRemaining(calculatedAmount - totalPagado);
        const depositPagado = totalPagado > selectedBodega.deposit_value ? selectedBodega.deposit_value : totalPagado;
        setDepositRemaining(selectedBodega.deposit_value - depositPagado);

        // Llamada para obtener los detalles de la reservación
        const reservationResponse = await axios.get(`http://localhost:5000/api/reservations/${currentReservationId}`);
        const reservation = reservationResponse.data;
        setPaymentStatus(reservation.reservation_payment_status);
      } catch (error) {
        console.error('Error al obtener la información de pagos o reservación:', error);
      } finally {
        setIsProcessing(false); // Finalizar procesamiento
      }
    };

    // Asegurarnos de que no haya otro proceso en curso
    fetchPaymentsAndDetails();
  }
}, [currentReservationId]); // Solo se dispara cuando `currentReservationId` cambia

const handlePaymentSubmit = async () => {
  if (isProcessing) return; // Evitar procesamiento múltiple

  setIsProcessing(true);  // Mostrar el indicador de procesamiento

  try {
      // Validación de datos necesarios
      if (!startDate || !endDate || !duration || !calculatedAmount || !paymentAmount) {
          alert('Por favor, completa todos los detalles antes de proceder.');
          setIsProcessing(false);
          return;
      }

      let newReservationId = currentReservationId;

      // Datos para crear o actualizar la reservación
      const dataToSend = {
          id_client: selectedClient.id_client,
          id_asset: selectedBodega.id_asset,
          reservation_deposit_amount: selectedBodega.deposit_value,
          reservation_total_amount: calculatedAmount,
          reservation_amount_paid: parseFloat(paymentAmount),
          reservation_expiration_date: endDate,
          payment_due_date: paymentDueDate,
          start_date: startDate,
          end_date: endDate,
          duration: duration,
      };

      console.log('Datos que se enviarán al backend:', dataToSend);

      // Si no existe una reservación, crearla
      if (!currentReservationId) {
          console.log('SE CREA UNA NUEVA RESERVA');
          const reservationResponse = await axios.post('http://localhost:5000/api/reservations', dataToSend);
          newReservationId = reservationResponse.data.id_reservation;
          setCurrentReservationId(newReservationId);
          onPaymentUpdate(parseFloat(paymentAmount), newReservationId); // Actualizar el estado con el ID de la reserva
      } else {
          // Si ya existe una reservación, actualizarla con el pago adicional
          console.log('SE ACTUALZIA LA RESERVA');
          await axios.put(`http://localhost:5000/api/reservations/${currentReservationId}`, {
              additional_payment: parseFloat(paymentAmount),
              payment_due_date: paymentDueDate,
          });
      }

      // Agregar el pago a la base de datos
      console.log('AGREGA EL ÁGO');
      await axios.post(`http://localhost:5000/api/reservations/${newReservationId}/payments`, {
          payment_method: paymentMethod,
          payment_amount: parseFloat(paymentAmount),
          payment_date: paymentDate,
          card_type: cardType,
          card_number: cardNumber,
          account_number: accountNumber,
      });

      // Actualizar manualmente los pagos sin volver a hacer una solicitud a la API
      const newPayment = {
        payment_method: paymentMethod,
        payment_amount: parseFloat(paymentAmount),
        payment_date: paymentDate,
        card_type: cardType,
        card_number: cardNumber,
        account_number: accountNumber,
      };

      setPayments(prevPayments => [...prevPayments, newPayment]);
      const totalPagado = payments.reduce((acc, payment) => acc + payment.payment_amount, parseFloat(paymentAmount));
      setAmountPaid(totalPagado);
      setTotalRemaining(calculatedAmount - totalPagado);

      // Actualizar los detalles de la reservación después del pago
      onPaymentUpdate(totalPagado, newReservationId, paymentStatus);

      // Reiniciar el formulario después de completar el pago
      resetForm();
  } catch (error) {
      console.error('Error al generar el pago:', error);
  } finally {
      setIsProcessing(false);  // Detener el indicador de procesamiento
  }
};

  const resetForm = () => {
    setPaymentMethod('');
    setPaymentAmount(0);
    setAccountNumber('');
    setPaymentDate('');
    setCardType('');
    setCardNumber('');
  };

  const handlePaymentCancel = async (paymentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/payments/${paymentId}`);
      setPayments(payments.filter(payment => payment.id_payment !== paymentId));

      // Recalcular los totales después de la cancelación
      const updatedPayments = payments.filter(payment => payment.id_payment !== paymentId);
      const totalPagado = updatedPayments.reduce((acc, payment) => acc + payment.payment_amount, 0);
      setAmountPaid(totalPagado);
      setTotalRemaining(calculatedAmount - totalPagado);

      const depositPagado = totalPagado > selectedBodega.deposit_value ? selectedBodega.deposit_value : totalPagado;
      setDepositRemaining(selectedBodega.deposit_value - depositPagado);
    } catch (error) {
      console.error('Error al cancelar el pago:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Generar el Pago</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {/* Mostrar detalles de la reservación */}
          <Typography variant="body1"><strong>Monto Total Calculado:</strong> ${calculatedAmount ? calculatedAmount.toFixed(2) : '0.00'}</Typography>
          <Typography variant="body1"><strong>Total Pagado:</strong> ${amountPaid.toFixed(2)}</Typography>
          <Typography variant="body1"><strong>Total Pendiente:</strong> ${totalRemaining.toFixed(2)}</Typography>
          <Typography variant="body1"><strong>Depósito Pendiente:</strong> ${depositRemaining.toFixed(2)}</Typography>
          <Typography variant="body1"><strong>Fecha límite para completar el pago:</strong> {paymentDueDate || 'No establecida'}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Método de Pago"
            select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            fullWidth
            size="small"
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="efectivo">Efectivo</MenuItem>
            <MenuItem value="transferencia">Transferencia</MenuItem>
            <MenuItem value="tarjeta">Tarjeta</MenuItem>
          </TextField>

          <TextField
            label="Cantidad"
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            fullWidth
            size="small"
            sx={{ marginBottom: 2 }}
          />

          {paymentMethod === 'efectivo' && (
            <TextField
              label="Fecha del Pago"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              fullWidth
              size="small"
              sx={{ marginBottom: 2 }}
            />
          )}

          {paymentMethod === 'transferencia' && (
            <>
              <TextField
                label="Número de Cuenta"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                fullWidth
                size="small"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Fecha del Pago"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                fullWidth
                size="small"
                sx={{ marginBottom: 2 }}
              />
            </>
          )}

          {paymentMethod === 'tarjeta' && (
            <>
              <TextField
                label="Tipo de Tarjeta"
                select
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                fullWidth
                size="small"
                sx={{ marginBottom: 2 }}
              >
                <MenuItem value="debito">Débito</MenuItem>
                <MenuItem value="credito">Crédito</MenuItem>
              </TextField>
              <TextField
                label="Número de Tarjeta"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                fullWidth
                size="small"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Fecha del Pago"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                fullWidth
                size="small"
                sx={{ marginBottom: 2 }}
              />
            </>
          )}

          {/* Mostrar el botón de pago y el indicador de procesamiento */}
          {isProcessing ? (
            <CircularProgress sx={{ marginTop: 2 }} />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handlePaymentSubmit}
              sx={{ marginTop: 2 }}
              disabled={!paymentAmount || !paymentMethod || !paymentDate}
            >
              Confirmar Pago
            </Button>
          )}
        </Grid>
      </Grid>

      {/* Mostrar la reservación y el estado de pago */}
      {currentReservationId && <Box sx={{ marginTop: 2 }}></Box>}

      {/* Tabla de pagos */}
      <Typography variant="h6" sx={{ marginTop: 4 }}>Pagos Realizados</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Método de Pago</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id_payment}>
              <TableCell>{payment.payment_method}</TableCell>
              <TableCell>${payment.payment_amount.toFixed(2)}</TableCell>
              <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handlePaymentCancel(payment.id_payment)}
                >
                  Cancelar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default GenerarPago;
