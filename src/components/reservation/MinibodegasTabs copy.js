import React, { useState } from 'react';
import { Tabs, Tab, Box, Paper } from '@mui/material';
import Client from '../client/Client'; 
import ConsultarMiniBodegas from './ConsultarMiniBodegas';
import GenerarPago from './GenerarPago';
import ReservationDetails from './ReservationDetails';

function MinibodegasTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null);   
  const [selectedBodega, setSelectedBodega] = useState(null);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);  // Total pagado
  const [currentReservationId, setCurrentReservationId] = useState(null);  // Nueva línea: Definir el estado para el ID de la reservación
  const [paymentStatus, setPaymentStatus] = useState('');  // Nueva línea: Definir el estado para el estado del pago


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
  };

  const handleSelectBodega = (bodega) => {
    setSelectedBodega(bodega);
  };

  const handlePaymentUpdate = (amount, reservationId, paymentStatus) => {
    setTotalAmountPaid(amount);
    setCurrentReservationId(reservationId);  // Actualiza el ID de la reservación
    setPaymentStatus(paymentStatus);  // Actualiza el estado del pago

  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Mostrar ReservationDetails siempre */}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <ReservationDetails 
          selectedClient={selectedClient} 
          selectedBodega={selectedBodega} 
          totalAmountPaid={totalAmountPaid}  // Pasar la cantidad pagada
          currentReservationId={currentReservationId}  // Pasar el ID de la reservación
          paymentStatus={paymentStatus}  // Pasar el estado del pago
 
        />

      </Paper>

      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Consultar/Crear Clientes" />
        <Tab label="Consultar MiniBodegas Disponibles" />
        <Tab label="Generar el Pago" disabled={!selectedClient || !selectedBodega} />
      </Tabs>

      {selectedTab === 0 && (
        <Client
          isReservation={true}
          onSelectClient={handleSelectClient}  
        />
      )}
      {selectedTab === 1 && (
        <ConsultarMiniBodegas onSelectBodega={handleSelectBodega} />
      )}
      {selectedTab === 2 && selectedClient && selectedBodega && (
        <GenerarPago 
          selectedClient={selectedClient}
          selectedBodega={selectedBodega}
          onPaymentUpdate={handlePaymentUpdate}  // Actualizar los pagos
          reservationId={currentReservationId}  // Pasar el ID de la reservación
        />
      )}
    </Box>
  );
}

export default MinibodegasTabs;
