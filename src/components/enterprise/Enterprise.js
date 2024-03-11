import React, { useState,useRef,useEffect  } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateEnterpriseForm from './CreateEnterpriseForm';
import EnterpriseList from './EnterpriseList';
import BasicDataEnterpriseForm from './BasicDataEnterpriseForm';

import { useTranslation } from 'react-i18next';

function Enterprise() {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateAccordionOpen, setIsCreateAccordionOpen] = useState(false);
  const [isFieldsEnabled, setIsFieldsEnabled] = useState(true);
  const [usersUpdated, setUsersUpdated] = useState(false);

  const modifyUserRef = useRef(null);

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsCreateAccordionOpen(true);
  };

  const handleEditUser = (user) => {
    if (modifyUserRef.current) {
      modifyUserRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (user.birth_date) {
      const formattedBirthDate = new Date(user.birth_date).toISOString().slice(0, 10);
      user.birth_date = formattedBirthDate;
    }
    setSelectedUser(user);
    setIsCreateAccordionOpen(true);

  };
  const handleClearForm = () => {
    setSelectedUser(null);
    setIsCreateAccordionOpen(true); // Mantiene el acordeón abierto
  };
  const handleUserUpdated = () => {
    setUsersUpdated(true);
  };
  
  const scrollToModifyUser = () => {
    setIsCreateAccordionOpen(true);
    // Retrasa el desplazamiento para dar tiempo al contenido para que se renderice.
      if (modifyUserRef.current) {
        modifyUserRef.current.scrollIntoView({ behavior: 'smooth', block: 'start'  });
      }
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{t('Consulta de Empresa')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EnterpriseList onEditUser={handleEditUser} scrollToModifyUser={scrollToModifyUser} usersUpdated={usersUpdated} setUsersUpdated={setUsersUpdated}/>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={isCreateAccordionOpen} onChange={() => setIsCreateAccordionOpen(!isCreateAccordionOpen)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} ref={modifyUserRef}>
          <Typography>{!selectedUser ? t("Crear Empresa") : t("Modificar Empresa")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: '100%' }}>
            {selectedUser !== null ? (
              <BasicDataEnterpriseForm
                initialValues={selectedUser}
                setSelectedUser={setSelectedUser}
                isFieldsEnabled={isFieldsEnabled}
//                onUserUpdated={handleUserUpdated}
                onClear={handleClearForm}
              />
            ) : (
              <CreateEnterpriseForm
                selectedUser={selectedUser}
                onCreateUser={handleCreateUser}
              />
            )}
          </div>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}

export default Enterprise;
