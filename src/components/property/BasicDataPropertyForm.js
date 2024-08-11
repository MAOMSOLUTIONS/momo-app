import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Snackbar, Alert, Tabs, Tab, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import getFormFields from './formConfig';
import tabConfig from './tabConfig';
import axios from 'axios';

const BasicDataPropertyForm = ({ onUserUpdated, initialValues, onClear }) => {
  const [formValues, setFormValues] = useState(initialValues || {});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isCreating, setIsCreating] = useState(true);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [tabFields, setTabFields] = useState([]);
  const [options, setOptions] = useState({ enterprises: [], statuses: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enterprisesResponse, statusesResponse] = await Promise.all([
          axios.get('http://127.0.0.1:5000/api/enterprise_active'),
          axios.get('http://127.0.0.1:5000/api/status')
        ]);

        const enterprises = enterprisesResponse.data.map(ent => ({ id: ent.id_enterprise, value: ent.enterprise_name }));
        const statuses = statusesResponse.data.map(stat => ({ id: stat.id_status, value: stat.status_name }));

        setOptions({ enterprises, statuses });

        if (enterprises.length > 0 && !formValues.enterprise_id) {
          setFormValues(prevValues => ({
            ...prevValues,
            enterprise_id: enterprises[0].id
          }));
        }
        if (statuses.length > 0 && !formValues.property_id_status) {
          setFormValues(prevValues => ({
            ...prevValues,
            property_id_status: statuses[0].id
          }));
        }

      } catch (error) {
        console.error('Error fetching options data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFormValues(initialValues || {});
    setIsCreating(!initialValues);
    handleTabChange(null, activeTab);
  }, [initialValues]);

  useEffect(() => {
    const fieldsForTab = getFieldsForTab(activeTab);
    setTabFields(fieldsForTab);
  }, [options]);

  const getFieldsForTab = (tabIndex) => {
    const section = tabConfig[tabIndex]?.section;
    const formFields = getFormFields(options.enterprises, options.statuses);
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
    const url = isCreating ? 'http://127.0.0.1:5000/api/properties' : `http://127.0.0.1:5000/api/properties/${formValues.id_property}`;

    const requiredFields = getFormFields().filter((field) => field.required);
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
        setSnackbarMessage(`Propiedad ${action} con éxito. ID: ${response.data.property_id}`);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        setTimeout(() => {
          setFormValues({});
          setIsCreating(true);
          if (typeof onClear === 'function') onClear();
          if (typeof onUserUpdated === 'function') onUserUpdated();
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

  const getAccordionLabel = () => (isCreating ? 'Crear Propiedad' : 'Modificar Propiedad');

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
                <Tab key={index} label={tab.label} />
              ))}
            </Tabs>
          </Grid>

          <Grid item xs={12}>
            {tabFields.map((field) => (
              <Grid item xs={12} sm={field.sm} key={field.id}>
                {field.type === 'select' ? (
                  <FormControl fullWidth margin="normal" required={field.required}>
                    <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
                    <Select
                      labelId={`${field.id}-label`}
                      id={field.id}
                      name={field.id}
                      value={formValues[field.id] && options[field.optionsKey]?.some(option => option.id === formValues[field.id]) ? formValues[field.id] : ''}
                      onChange={handleInputChange}
                      label={field.label}
                      disabled={field.disabled}
                    >
                      {field.options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    id={field.id}
                    name={field.id}
                    label={field.label}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    size="small"
                    value={formValues[field.id] || ''}
                    onChange={handleInputChange}
                    type={field.type || 'text'}
                    InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                    required={field.required}
                    disabled={field.disabled}
                  />
                )}
              </Grid>
            ))}
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

export default BasicDataPropertyForm;
