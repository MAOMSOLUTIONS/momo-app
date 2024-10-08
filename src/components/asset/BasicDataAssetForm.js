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
import DynamicFormFields from '../dinamico/DynamicFormFields';
import AssetTabConfig from './AssetTabConfig';
import AssetFormFields from './AssetFormConfig';
import axios from 'axios';

const BasicDataAssetForm = ({ onAssetUpdated, initialValues, onClear }) => {
  const [formValues, setFormValues] = useState(initialValues || {});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isCreating, setIsCreating] = useState(true);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [tabFields, setTabFields] = useState([]);
  const [options, setOptions] = useState({
    statuses: [],
    assetTypes: [],
    properties: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusesRes, assetTypesRes, propertiesRes] = await Promise.all([
          axios.get('http://127.0.0.1:5000/api/asset_status'),
          axios.get('http://127.0.0.1:5000/api/asset_type'),
          axios.get('http://127.0.0.1:5000/api/properties'),
        ]);

        setOptions({
          statuses: statusesRes.data.map(status => ({ id: status.id_status, value: status.status_name })),
          assetTypes: assetTypesRes.data.map(type => ({ id: type.id_asset_type, value: type.asset_type_name })),
          properties: propertiesRes.data.map(property => ({ id: property.id_property, value: property.property_name })),
        });
      } catch (error) {
        console.error('Error fetching options', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFormValues(initialValues || {
      asset_status: options.statuses[0]?.id || '',
      asset_type: options.assetTypes[0]?.id || '',
      id_property: options.properties[0]?.id || ''
    });
    setIsCreating(!initialValues);
    handleTabChange(null, activeTab);
  }, [initialValues, options]);

  useEffect(() => {
    const fieldsForTab = getFieldsForTab(activeTab);
    setTabFields(fieldsForTab);
  }, [options]);

  const getFieldsForTab = (tabIndex) => {
    const section = AssetTabConfig[tabIndex]?.section;
    return AssetFormFields(options.statuses, options.assetTypes, options.properties).filter((field) => field.section === section);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    const fieldsForTab = getFieldsForTab(newValue);
    setTabFields(fieldsForTab);
  };

  const handleClearFields = () => {
    setFormValues({
      asset_status: options.statuses[0]?.id || '',
      asset_type: options.assetTypes[0]?.id || '',
      id_property: options.properties[0]?.id || ''
    });
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
    const url = isCreating ? 'http://127.0.0.1:5000/api/assets' : `http://127.0.0.1:5000/api/assets/${formValues.id_asset}`;

    // Validación de campos obligatorios
    const requiredFields = AssetFormFields(options.statuses, options.assetTypes, options.properties).filter((field) => field.required);
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
        setSnackbarMessage(`Asset ${action} con éxito. ID: ${response.data.id_asset}`);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        setTimeout(() => {
          setFormValues({
            asset_status: options.statuses[0]?.id || '',
            asset_type: options.assetTypes[0]?.id || '',
            id_property: options.properties[0]?.id || ''
          });
          setIsCreating(true);
          if (typeof onClear === 'function') onClear();
          if (typeof onAssetUpdated === 'function') onAssetUpdated(); // Llamada para actualizar el grid
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

  const getAccordionLabel = () => (isCreating ? 'Crear Asset' : 'Modificar Asset');

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
              {AssetTabConfig.map((tab, index) => (
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

export default BasicDataAssetForm;
