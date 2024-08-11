import React, { useState, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreatePropertyForm from './CreatePropertyForm';
import PropertyList from './PropertyList';
import BasicDataPropertyForm from './BasicDataPropertyForm';
import { useTranslation } from 'react-i18next';

function Property() {
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
    setIsCreateAccordionOpen(true);
  };

  const handleUserUpdated = () => {
    setUsersUpdated(true);
    setIsCreateAccordionOpen(false);
  };

  const scrollToModifyUser = () => {
    setIsCreateAccordionOpen(true);
    if (modifyUserRef.current) {
      modifyUserRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <Accordion expanded={isCreateAccordionOpen} onChange={() => setIsCreateAccordionOpen(!isCreateAccordionOpen)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} ref={modifyUserRef}>
          <Typography>{!selectedUser ? t("Crear Propiedad") : t("Modificar Propiedad")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: '100%' }}>
            {selectedUser !== null ? (
              <BasicDataPropertyForm
                initialValues={selectedUser}
                setSelectedUser={setSelectedUser}
                isFieldsEnabled={isFieldsEnabled}
                onUserUpdated={handleUserUpdated}
                onClear={handleClearForm}
              />
            ) : (
              <CreatePropertyForm onUserUpdated={handleUserUpdated} />
            )}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{t('Consulta de Propiedad')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PropertyList onEditUser={handleEditUser} scrollToModifyUser={scrollToModifyUser} usersUpdated={usersUpdated} setUsersUpdated={setUsersUpdated}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Property;
