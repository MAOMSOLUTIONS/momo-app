import React, { useState, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateClientForm from './CreateClientForm';
import ClientList from './ClientList';
import BasicDataClientForm from './BasicDataClientForm';

function Client() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isCreateAccordionOpen, setIsCreateAccordionOpen] = useState(false);
  const [clientsUpdated, setClientsUpdated] = useState(false);

  const modifyClientRef = useRef(null);

  const handleCreateClient = () => {
    setSelectedClient(null);
    setIsCreateAccordionOpen(true);
  };

  const handleEditClient = (client) => {
    if (modifyClientRef.current) {
      modifyClientRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    setSelectedClient(client);
    setIsCreateAccordionOpen(true);
  };

  const handleClearForm = () => {
    setSelectedClient(null);
    setIsCreateAccordionOpen(true); 
  };

  const handleClientUpdated = () => {
    setClientsUpdated(true);
    setIsCreateAccordionOpen(false);
  };

  return (
    <div>
      <Accordion expanded={isCreateAccordionOpen} onChange={() => setIsCreateAccordionOpen(!isCreateAccordionOpen)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} ref={modifyClientRef}>
          <Typography>{!selectedClient ? "Crear Cliente" : "Modificar Cliente"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: '100%' }}>
            {selectedClient !== null ? (
              <BasicDataClientForm
                initialValues={selectedClient}
                setSelectedClient={setSelectedClient}
                onClientUpdated={handleClientUpdated}
                onClear={handleClearForm}
              />
            ) : (
              <CreateClientForm
                onClientUpdated={handleClientUpdated}
              />
            )}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Consulta de Cliente</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ClientList onEditClient={handleEditClient} clientsUpdated={clientsUpdated} setClientsUpdated={setClientsUpdated}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Client;
