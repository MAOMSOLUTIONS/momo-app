import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, MenuItem, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';

const GenerarPago = ({ selectedClient, selectedBodega, onPaymentUpdate, reservationId }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [accountNumber, setAccountNumber] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [payments, setPayments] = useState([]);
  const [currentReservationId, setCurrentReservationId] = useState(reservationId);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [amountPaid, setAmountPaid] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(selectedBodega.latest_price);
  const [depositRemaining, setDepositRemaining] = useState(selectedBodega.deposit_value);

  // Fetch pagos y detalles de la reservación desde la API
  useEffect(() => {
    if (currentReservationId) {
      axios.get(`http://localhost:5000/api/reservations/${currentReservationId}/payments`)
        .then(response => {
          const fetchedPayments = response.data.payments;
          setPayments(fetchedPayments);

          // Debugging log
          console.log('Pagos obtenidos:', fetchedPayments);

          // Calcular el total pagado a partir de los pagos obtenidos
          const totalPagado = fetchedPayments.reduce((acc, payment) => acc + payment.payment_amount, 0);
          console.log('Total pagado calculado:', totalPagado);
          setAmountPaid(totalPagado);

          // Actualizar el monto restante y depósito pendiente
          setTotalRemaining(selectedBodega.latest_price - totalPagado);
          const depositPagado = totalPagado > selectedBodega.deposit_value ? selectedBodega.deposit_value : totalPagado;
          setDepositRemaining(selectedBodega.deposit_value - depositPagado);
        })
        .catch(error => {
          console.error('Error al obtener los pagos:', error);
        });

      axios.get(`http://localhost:5000/api/reservations/${currentReservationId}`)
        .then(response => {
          const reservation = response.data;
          setPaymentStatus(reservation.reservation_payment_status);
        })
        .catch(error => {
          console.error('Error al obtener la reservación:', error);
        });
    }
  }, [currentReservationId, selectedBodega]);

  const handlePaymentSubmit = async () => {
    try {
      let newReservationId = currentReservationId;

      // Generar la reserva si no existe
      if (!currentReservationId) {
        const reservationResponse = await axios.post('http://localhost:5000/api/reservations', {
          id_client: selectedClient.id_client,
          id_asset: selectedBodega.id_asset,
          reservation_deposit_amount: selectedBodega.deposit_value,
          reservation_total_amount: selectedBodega.latest_price,
          reservation_amount_paid: parseFloat(paymentAmount),
          reservation_expiration_date: selectedBodega.availability_date,
        });

        newReservationId = reservationResponse.data.id_reservation;
        setCurrentReservationId(newReservationId);
        onPaymentUpdate(parseFloat(paymentAmount), newReservationId); // Actualizar el estado con el ID de la reserva
      }

      // Añadir el pago a la reserva existente o recién creada
      await axios.post(`http://localhost:5000/api/reservations/${newReservationId}/payments`, {
        payment_method: paymentMethod,
        payment_amount: parseFloat(paymentAmount),
        payment_date: paymentDate,
        card_type: cardType,
        card_number: cardNumber,
        account_number: accountNumber,
      });

      // Actualizar el grid de pagos realizados
      const paymentsResponse = await axios.get(`http://localhost:5000/api/reservations/${newReservationId}/payments`);
      const fetchedPayments = paymentsResponse.data.payments;
      const totalPagado = fetchedPayments.reduce((acc, payment) => acc + payment.payment_amount, 0);

      setAmountPaid(totalPagado);
      setTotalRemaining(selectedBodega.latest_price - totalPagado);
      setPayments(fetchedPayments);

  

      // Debugging log
      console.log('Pagos después del nuevo pago:', fetchedPayments);

      // Calcular el total pagado después de registrar el nuevo pago
      setAmountPaid(totalPagado);
      setTotalRemaining(selectedBodega.latest_price - totalPagado);
  
      const depositPagado = totalPagado > selectedBodega.deposit_value ? selectedBodega.deposit_value : totalPagado;
      setDepositRemaining(selectedBodega.deposit_value - depositPagado);
  
      // Actualizar los detalles de la reservación después del pago
      onPaymentUpdate(totalPagado, newReservationId, paymentStatus);  



      // Fetch el estado actualizado de la reservación
      const reservationResponse = await axios.get(`http://localhost:5000/api/reservations/${newReservationId}`);
      setPaymentStatus(reservationResponse.data.reservation_payment_status);

      resetForm(); // Limpiar el formulario después del pago

    } catch (error) {
      console.error('Error al generar el pago:', error);
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
      setTotalRemaining(selectedBodega.latest_price - totalPagado);

      // Calcular el depósito pendiente
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

          <Button
            variant="contained"
            color="primary"
            onClick={handlePaymentSubmit}
            sx={{ marginTop: 2 }}
            disabled={!paymentAmount || !paymentMethod}
          >
            Confirmar Pago
          </Button>
        </Grid>
      </Grid>

      {/* Mostrar la reservación y el estado de pago */}
      {currentReservationId && (
        <Box sx={{ marginTop: 2 }}>
        </Box>
      )}

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
