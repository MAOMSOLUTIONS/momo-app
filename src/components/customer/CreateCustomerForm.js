import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Importa tus componentes para los datos básicos y de acceso
import BasicDataCustomerForm from './BasicDataCustomerForm';
import { useTranslation } from 'react-i18next';


const CreateCustomerForm = () => {
  // Puedes manejar el estado y la lógica aquí si es necesario
  const { t } = useTranslation();
  return (
    <div>
      <BasicDataCustomerForm />
    </div>
  );
};

export default CreateCustomerForm;