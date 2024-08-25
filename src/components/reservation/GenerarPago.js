import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, MenuItem, Divider } from '@mui/material';

const GenerarPago = ({ selectedClient, selectedBodega, totalAmountPaid, onPaymentUpdate }) => {
  const [paymentMethod, setPaymentMethod] = useState(''); // Método de pago seleccionado
  const [paymentAmount, setPaymentAmount] = useState(0); // Cantidad del pago
  const [accountNumber, setAccountNumber] = useState(''); // Número de cuenta para transferencia
  const [paymentDate, setPaymentDate] = useState(''); // Fecha del pago
  const [cardType, setCardType] = useState(''); // Tipo de tarjeta (débito/crédito)
  const [cardNumber, setCardNumber] = useState(''); // Número de tarjeta

  const handlePaymentSubmit = () => {
    // Aquí se procesaría el pago y se actualizaría el total pagado
    const newTotalPaid = totalAmountPaid + parseFloat(paymentAmount);
    onPaymentUpdate(newTotalPaid); // Actualiza el total pagado en el estado del componente padre
    resetForm(); // Resetea el formulario después de realizar el pago
  };

  const resetForm = () => {
    setPaymentMethod('');
    setPaymentAmount(0);
    setAccountNumber('');
    setPaymentDate('');
    setCardType('');
    setCardNumber('');
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Generar el Pago</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2"><strong>Total a Pagar:</strong> ${selectedBodega.latest_price.toFixed(2)}</Typography>
          <Typography variant="body2"><strong>Monto Restante:</strong> ${(selectedBodega.latest_price - totalAmountPaid).toFixed(2)}</Typography>
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
    </Box>
  );
};

export default GenerarPago;
