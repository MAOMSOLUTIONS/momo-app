import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import formFields from './ClientFormConfig';
import axios from 'axios';

const BasicDataClientForm = ({ onClientUpdated, initialValues, onClear }) => {
  const [formValues, setFormValues] = useState(initialValues || {});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isCreating, setIsCreating] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormValues(initialValues || {});
    setIsCreating(!initialValues);
  }, [initialValues]);

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
    const url = isCreating ? 'http://127.0.0.1:5000/api/clients' : `http://127.0.0.1:5000/api/clients/${formValues.id_client}`;

    // Validación de campos obligatorios
    const requiredFields = formFields().filter((field) => field.required);
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formValues[field.id]) {
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
      const response = await axios[method](url, formValues);
      if (response.status === 201 || response.status === 200) {
        const action = isCreating ? 'creado' : 'actualizado';
        setSnackbarMessage(`Cliente ${action} con éxito. ID: ${response.data.client_id}`);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        setTimeout(() => {
          setFormValues({});
          setIsCreating(true);
          if (typeof onClear === 'function') onClear();
          if (typeof onClientUpdated === 'function') onClientUpdated(); 
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
          {formFields().map((field) => (
            <Grid item xs={12} sm={field.sm} key={field.id}>
              <TextField
                id={field.id}
                name={field.id}
                label={field.label}
                variant="outlined"
                fullWidth
                margin="normal"
                value={formValues[field.id] || ''}
                onChange={handleInputChange}
                error={Boolean(errors[field.id])}
                helperText={errors[field.id]}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {isCreating ? 'Crear Cliente' : 'Actualizar Cliente'}
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

export default BasicDataClientForm;
