import React, { useState } from 'react';
import {
  Button,
  Container,
  Snackbar,
  Alert,
} from '@mui/material';
import DynamicFormFields from './DynamicFormFields'; // Asegúrate de importar DynamicFormFields
import formFields from './MyFormConfig'; // Asegúrate de importar DynamicFormFields



const MyForm = () => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí puedes realizar la validación y envío de datos a la API
    // Por ejemplo, validar campos requeridos, hacer una solicitud POST, etc.

    // Simulación de una solicitud exitosa
    setSnackbarMessage('Datos enviados con éxito');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <DynamicFormFields
          formConfig={formFields} // Pasa la configuración de campos específica para este formulario
          formValues={formValues}
          errors={errors}
          handleInputChange={handleInputChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
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
    </Container>
  );
};

export default MyForm;
