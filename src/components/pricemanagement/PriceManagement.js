import React, { useState, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BasicDataPriceForm from './BasicDataPriceForm';
import PriceList from './PriceList';

const PriceManagement = () => {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const modifyPriceRef = useRef(null);

  const handleCreatePrice = () => {
    setSelectedPrice(null);
    setIsAccordionOpen(true);
  };

  const handleEditPrice = (price) => {
    if (modifyPriceRef.current) {
      modifyPriceRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    setSelectedPrice(price);
    setIsAccordionOpen(true);
  };

  return (
    <div>
      <Accordion expanded={isAccordionOpen} onChange={() => setIsAccordionOpen(!isAccordionOpen)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} ref={modifyPriceRef}>
          <Typography>{!selectedPrice ? "Crear Precio del Asset" : "Modificar Precio del Asset"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BasicDataPriceForm
            initialValues={selectedPrice}
            onPriceUpdated={() => setIsAccordionOpen(false)}
            onClear={() => setSelectedPrice(null)}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Consulta Lista de Precios</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PriceList onEditPrice={handleEditPrice} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PriceManagement;
