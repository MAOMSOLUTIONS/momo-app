// AssetStatus.js
import React, { useState, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BasicDataAssetStatusForm from './BasicDataAssetStatusForm';
import AssetStatusList from './AssetStatusList';

const AssetStatus = () => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const modifyStatusRef = useRef(null);

  const handleCreateStatus = () => {
    setSelectedStatus(null);
    setIsAccordionOpen(true);
  };

  const handleEditStatus = (status) => {
    if (modifyStatusRef.current) {
      modifyStatusRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    setSelectedStatus(status);
    setIsAccordionOpen(true);
  };

  return (
    <div>
      <Accordion expanded={isAccordionOpen} onChange={() => setIsAccordionOpen(!isAccordionOpen)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} ref={modifyStatusRef}>
          <Typography>{!selectedStatus ? "Crear Estatus del Asset" : "Modificar Estatus del Asset"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BasicDataAssetStatusForm
            initialValues={selectedStatus}
            onStatusUpdated={() => setIsAccordionOpen(false)}
            onClear={() => setSelectedStatus(null)}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Consulta de Estatus del Asset</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AssetStatusList onEditStatus={handleEditStatus} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AssetStatus;
