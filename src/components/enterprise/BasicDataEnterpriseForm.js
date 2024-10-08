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
import formFields from './EnterpriseformConfig';
import tabConfig from './EnterprisetabConfig';
import DynamicFormFields from '../dinamico/DynamicFormFields';
import axios from 'axios';





const BasicDataEnterpriseForm = ({ onUserUpdated, initialValues, onClear }) => {
  const [formValues, setFormValues] = useState(initialValues || {});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isCreating, setIsCreating] = useState(true);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [tabFields, setTabFields] = useState([]);
  const [options, setOptions] = useState({ statuses: [] });

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/status');
        setOptions({ statuses: response.data.map(stat => ({ id: stat.id_status, value: stat.status_name })) });
      } catch (error) {
        console.error('Error fetching statuses', error);
      }
    };

    fetchStatuses();
  }, []);

  useEffect(() => {
    setFormValues(initialValues || { enterprise_id_status: options.statuses[0]?.id || '' });
    setIsCreating(!initialValues);
    handleTabChange(null, activeTab);
  }, [initialValues, options.statuses]);

  useEffect(() => {
    const fieldsForTab = getFieldsForTab(activeTab);
    setTabFields(fieldsForTab);
  }, [options]);

  const getFieldsForTab = (tabIndex) => {
    const section = tabConfig[tabIndex]?.section;
    return formFields(options.statuses).filter((field) => field.section === section);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    const fieldsForTab = getFieldsForTab(newValue);
    setTabFields(fieldsForTab);
  };

  const handleClearFields = () => {
    setFormValues({ enterprise_id_status: options.statuses[0]?.id || '' });
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
    const url = isCreating ? 'http://127.0.0.1:5000/api/enterprises' : `http://127.0.0.1:5000/api/enterprises/${formValues.id_enterprise}`;

    // Validación de campos obligatorios
    const requiredFields = formFields(options.statuses).filter((field) => field.required);
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
        const action = isCreating ? 'creada' : 'actualizada';
        setSnackbarMessage(`Empresa ${action} con éxito. ID: ${response.data.enterprise_id}`);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        setTimeout(() => {
          setFormValues({ enterprise_id_status: options.statuses[0]?.id || '' });
          setIsCreating(true);
          if (typeof onClear === 'function') onClear();
          if (typeof onUserUpdated === 'function') onUserUpdated(); // Llamada para actualizar el grid
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

  const getAccordionLabel = () => (isCreating ? 'Crear Empresa' : 'Modificar Empresa');

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
