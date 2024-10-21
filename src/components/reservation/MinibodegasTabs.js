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
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const [currentReservationId, setCurrentReservationId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentDueDate, setPaymentDueDate] = useState('');

  const [reservationDetails, setReservationDetails] = useState({
    calculatedAmount: 0,
    totalAmountPaid: 0,
    totalPendingAmount: 0,
    pendingDeposit: 0,
    startDate: '',
    endDate: '',
    duration: 0,
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setSelectedTab(1); // Avanzar a la siguiente pestaña automáticamente
  };

  const handleSelectBodega = (bodega) => {
    setSelectedBodega(bodega);
    setSelectedTab(2); // Avanzar a la siguiente pestaña automáticamente
  };

  const handlePaymentUpdate = (amount, reservationId, paymentStatus) => {
    setTotalAmountPaid(amount);
    setCurrentReservationId(reservationId);
    setPaymentStatus(paymentStatus);
  };

  const handlePaymentDueDateChange = (date) => {
    console.log("Nueva fecha límite de pago:", date);  // Verifica si se recibe correctamente

    setPaymentDueDate(date);
  };  

  const handleReservationDetailsChange = (details) => {
    setReservationDetails(details);
    // Depuración
    console.log('Detalles de la reservación actualizados:', details);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <ReservationDetails 
          selectedClient={selectedClient} 
          selectedBodega={selectedBodega} 
          totalAmountPaid={totalAmountPaid}
          currentReservationId={currentReservationId}
          paymentStatus={paymentStatus}
          
          onPaymentDueDateChange={handlePaymentDueDateChange}
          onReservationDetailsChange={handleReservationDetailsChange}
        />
      </Paper>

      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Consultar/Crear Clientes" />
        <Tab label="Consultar MiniBodegas Disponibles" disabled={!selectedClient} />
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
          onPaymentUpdate={handlePaymentUpdate}
          reservationId={currentReservationId}
          paymentDueDate={paymentDueDate}
          {...reservationDetails}  // Pasar todos los detalles de la reservación
        />
      )}
    </Box>
  );
}

export default MinibodegasTabs;
