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
} from '@mui/material';
import formFields from './formConfig';
import DynamicFormFields from '../dinamico/DynamicFormFields';

import axios from 'axios';
import { format, parse } from 'date-fns';
const BasicDataCustomerForm = ({ onUserUpdated,initialValues, setSelectedUser, isFieldsEnabled, onClear  }) => {
  const [formValues, setFormValues] = useState(initialValues || {});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isCreating, setIsCreating] = useState(true);
  const [accordionLabel, setAccordionLabel] = useState('Crear Reservación');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormValues(initialValues || {});
    setIsCreating(!initialValues);
  }, [initialValues]);

  const handleClearFields = () => {
    setFormValues({});
    setIsCreating(true);
    onClear(); // Notifica al componente padre para resetear el usuario seleccionado
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
    console.log("aqui esta la información")

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSnackbarMessage('Campos obligatorios están vacíos');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    try {
      const dataToSend = {
        id_enterprise: formValues.id_enterprise,
        enterprise_name: formValues.enterprise_name,
        rfc: formValues.rfc,
        status: formValues.status
      };
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
      const defaultErrorMessage = isCreating ? 'Error al crear el usuario' : 'Error al actualizar el usuario';      
      if (error.response && error.response.data && error.response.data.message) {
        // Utiliza el mensaje de error de la API
        setSnackbarMessage(`Error al crear el usuario: ${error.response.data.message}`);
      } else {
        // Si no hay un mensaje de error específico, usa un mensaje genérico
        setSnackbarMessage('Error al crear el usuario');
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
    return isCreating ? 'Crear Reservación' : 'Modificar Reservación';
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
          <DynamicFormFields
            formConfig={formFields}
            formValues={formValues}
            errors={errors}
            handleInputChange={handleInputChange}
          />
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

export default BasicDataCustomerForm;