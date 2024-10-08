import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import formFields from './ReservationStatusFormConfig';
import tabConfig from './ReservationStatusTabConfig';
import DynamicFormFields from '../dinamico/DynamicFormFields';
import axios from 'axios';

const BasicDataReservationStatusForm = ({ onStatusUpdated, initialValues, onClear }) => {
  const [formValues, setFormValues] = useState(initialValues || {});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isCreating, setIsCreating] = useState(true);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [tabFields, setTabFields] = useState([]);

  useEffect(() => {
    setFormValues(initialValues || {});
    setIsCreating(!initialValues);
    handleTabChange(null, activeTab);
  }, [initialValues]);

  useEffect(() => {
    const fieldsForTab = getFieldsForTab(activeTab);
    setTabFields(fieldsForTab);
  }, []);

  const getFieldsForTab = (tabIndex) => {
    const section = tabConfig[tabIndex]?.section;
    return formFields.filter((field) => field.section === section);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    const fieldsForTab = getFieldsForTab(newValue);
    setTabFields(fieldsForTab);
  };

  const handleClearFields = () => {
    setFormValues({});
    setIsCreating(true);
    if (typeof onClear === 'function') onClear();
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isCreating ? 'post' : 'put';
    const url = isCreating ? 'http://127.0.0.1:5000/api/reservationstatus' : `http://127.0.0.1:5000/api/reservationstatus/${formValues.id_reservation_status}`;

    try {
      const response = await axios[method](url, formValues);
      if (response.status === 201 || response.status === 200) {
        const action = isCreating ? 'creado' : 'actualizado';
        setSnackbarMessage(`Estatus de reservación ${action} con éxito.`);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        setTimeout(() => {
          setFormValues({});
          setIsCreating(true);
          if (typeof onClear === 'function') onClear();
          if (typeof onStatusUpdated === 'function') onStatusUpdated();
          setErrors({});
        }, 2000);
      } else {
        throw new Error(`Respuesta no esperada del servidor: ${response.status}`);
      }
    } catch (error) {
      console.error('Hubo un error al enviar el formulario:', error);
      setSnackbarMessage('Error al procesar la solicitud');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              {tabConfig.map((tab, index) => (
                <Tab key={index} label={tab.label.toString()} />
              ))}
            </Tabs>
          </Grid>

          <Grid item xs={12}>
            <DynamicFormFields formConfig={tabFields} formValues={formValues} errors={errors} handleInputChange={handleInputChange} />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {isCreating ? 'Crear Estatus de Reservación' : 'Actualizar Estatus de Reservación'}
            </Button>
            {!isCreating && (
              <Button variant="outlined" color="secondary" onClick={handleClearFields}>
                Limpiar Campos
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default BasicDataReservationStatusForm;
