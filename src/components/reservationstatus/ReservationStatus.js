import React, { useState, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateReservationStatusForm from './CreateReservationStatusForm';
import ReservationStatusList from './ReservationStatusList';
import BasicDataReservationStatusForm from './BasicDataReservationStatusForm';
import { useTranslation } from 'react-i18next';

function ReservationStatus() {
  const { t } = useTranslation();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isCreateAccordionOpen, setIsCreateAccordionOpen] = useState(false);
  const [statusesUpdated, setStatusesUpdated] = useState(false);

  const modifyStatusRef = useRef(null);

  const handleCreateStatus = () => {
    setSelectedStatus(null);
    setIsCreateAccordionOpen(true);
  };

  const handleEditStatus = (status) => {
    if (modifyStatusRef.current) {
      modifyStatusRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    setSelectedStatus(status);
    setIsCreateAccordionOpen(true);
  };

  const handleClearForm = () => {
    setSelectedStatus(null);
    setIsCreateAccordionOpen(true); // Mantiene el acordeón abierto
  };

  const handleStatusUpdated = () => {
    setStatusesUpdated(true);
    setIsCreateAccordionOpen(false); // Contrae el acordeón después de la actualización
  };

  const scrollToModifyStatus = () => {
    setIsCreateAccordionOpen(true);
    // Retrasa el desplazamiento para dar tiempo al contenido para que se renderice.
    if (modifyStatusRef.current) {
      modifyStatusRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {/* Acordeón para Crear/Modificar Estado de Reservación */}
      <Accordion expanded={isCreateAccordionOpen} onChange={() => setIsCreateAccordionOpen(!isCreateAccordionOpen)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} ref={modifyStatusRef}>
          <Typography>{!selectedStatus ? t("Crear Estado de Reservación") : t("Modificar Estado de Reservación")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: '100%' }}>
            {selectedStatus !== null ? (
              <BasicDataReservationStatusForm
                initialValues={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                onStatusUpdated={handleStatusUpdated}
                onClear={handleClearForm}
              />
            ) : (
              <CreateReservationStatusForm
                onStatusUpdated={handleStatusUpdated} 
              />
            )}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Acordeón para Consulta de Estado de Reservación */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{t('Consulta de Estados de Reservación')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ReservationStatusList onEditStatus={handleEditStatus} scrollToModifyStatus={scrollToModifyStatus} statusesUpdated={statusesUpdated} setStatusesUpdated={setStatusesUpdated}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ReservationStatus;
