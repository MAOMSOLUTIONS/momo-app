import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Box
} from '@mui/material';
import formFields from './formConfig';
import tabConfig from './tabConfig';

import DynamicFormFields from '../dinamico/DynamicFormFields';

import axios from 'axios';
import { format, parse } from 'date-fns';
const BasicDataEnterpriseForm = ({ onUserUpdated,initialValues, setSelectedUser, isFieldsEnabled, onClear  }) => {
  const [formValues, setFormValues] = useState(initialValues || {});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isCreating, setIsCreating] = useState(true);
  const [accordionLabel, setAccordionLabel] = useState('Crear Usuario');
  const [errors, setErrors] = useState({});
  const basicFields = formFields.filter((field) => field.section === 'basic');
  const fiscalFields = formFields.filter((field) => field.section === 'fiscal');
  const [activeTab, setActiveTab] = useState(0);
  const [tabFields, setTabFields] = useState([]); // Inicialmente mostramos los campos de la primera pestaña



  useEffect(() => {
    setFormValues(initialValues || {});
    setIsCreating(!initialValues);
    handleTabChange(null, activeTab);
  }, [initialValues]);

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
    onClear(); // Notifica al componente padre para resetear el usuario seleccionado
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Si es un campo de tipo 'select', el valor es la id de la opción seleccionada
    const selectedOptionId = value;
    
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: selectedOptionId, // Asigna solo la id de la opción seleccionada
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isCreating ? 'post' : 'put';
    const url = isCreating ? 'http://127.0.0.1:5000/api/enterprises' : `http://127.0.0.1:5000/api/enterprises/${formValues.id_user}`;
    // Verifica si los campos obligatorios están vacíos antes de enviar el formulario
    const requiredFields = formFields.filter((field) => field.required);
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formValues[field.id] || (Array.isArray(formValues[field.id]) && formValues[field.id].length === 0)) {
        newErrors[field.id] = 'Campo obligatorio';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSnackbarMessage('Campos obligatorios están vacíos');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    try {
      console.log("aqui esta la información 2")
      const dataToSend = {
        id_enterprise: formValues.id_enterprise,
        enterprise_name: formValues.enterprise_name,
        rfc: formValues.rfc,
        id_status: formValues.id_enterprise_status ? formValues.id_enterprise_status.id : null,
        status: formValues.id_enterprise_status ? formValues.id_enterprise_status.value : null,
      };
      console.log("aqui")
      const response = await axios[method](url, dataToSend);
      if (response.status === 201 || response.status === 200) { // Asumiendo que 201 es para creación y 200 para actualización
          const action = isCreating ? 'creado' : 'actualizado';
          const userId = response.data.idUser; // Asegúrate de que la respuesta contenga este campo para ambos casos
          setSnackbarMessage(`Usuario ${action} con éxito. ID: ${userId}`);
          setSnackbarSeverity('success');

          setOpenSnackbar(true);

          setTimeout(() => {
            setFormValues({});
            setIsCreating(true);
            if (typeof onClear === 'function') {
              onClear();// Notifica al componente padre para resetear el usuario seleccionado
            }
            //onUserUpdated();
            setErrors({});
          }, 3000); // Espera 3 segundos antes de limpiar
//          handleClearFields();
      } else {
        throw new Error(`Respuesta no esperada del servidor: ${response.status}`);
      }
    } catch (error) {
      console.error('Hubo un error al enviar el formulario:', error);
      const defaultErrorMessage = isCreating ? 'Error al crear la empresa' : 'Error al actualizar el usuario';      
      if (error.response && error.response.data && error.response.data.message) {
        // Utiliza el mensaje de error de la API
        setSnackbarMessage(`Error al crear la empresa: ${error.response.data.message}`);
      } else {
        // Si no hay un mensaje de error específico, usa un mensaje genérico
        setSnackbarMessage('Error al crear la empresa');
      }
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setOpenSnackbar(true);
    }finally {
      setOpenSnackbar(true);
      if (isCreating) {
          setFormValues({}); // Limpia los campos solo si es creación
      }
      setIsCreating(true); // Esto podría necesitar revisión dependiendo de cómo quieras manejar el estado después de enviar
      setErrors({});
  }


  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const getAccordionLabel = () => {
    return isCreating ? 'Crear Empresa' : 'Modificar Empresa';
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Pestañas */}

            <Tabs value={activeTab} onChange={handleTabChange}>
            {tabConfig.map((tab, index) => (
                <Tab key={index} label={tab.label.toString()} />
              ))}
            </Tabs>            
          </Grid>

          {/* Sección Dinámica */}
          {tabFields.length > 0 && (
            <DynamicFormFields
              formConfig={tabFields}
              formValues={formValues}
              errors={errors}
              handleInputChange={handleInputChange}
            />
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {getAccordionLabel()}
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

export default BasicDataEnterpriseForm;
