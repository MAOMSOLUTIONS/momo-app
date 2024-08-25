import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import priceFormConfig from './PriceFormConfig';
import DynamicFormFields from '../dinamico/DynamicFormFields';

const BasicDataPriceForm = ({ onPriceUpdated, initialValues, onClear }) => {
  const [formValues, setFormValues] = useState(initialValues || {});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isCreating, setIsCreating] = useState(true);
  const [errors, setErrors] = useState({});
  const [calculatedDeposit, setCalculatedDeposit] = useState('');
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    setFormValues(initialValues || {});
    setIsCreating(!initialValues);

    // Fetch assets
    const fetchAssets = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/assets');
        setAssets(response.data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, [initialValues]);

  useEffect(() => {
    // Calcular el depósito mínimo
    const rentalPrice = parseFloat(formValues.rental_price) || 0;
    if (formValues.deposit_type === 'percentage') {
      const percentage = parseFloat(formValues.deposit_value) || 0;
      setCalculatedDeposit((percentage / 100) * rentalPrice);
    } else {
      setCalculatedDeposit(formValues.deposit_value);
    }
  }, [formValues.deposit_value, formValues.deposit_type, formValues.rental_price]);

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
    const url = isCreating ? 'http://127.0.0.1:5000/api/prices' : `http://127.0.0.1:5000/api/prices/${formValues.id}`;

    // Validaciones
    const requiredFields = priceFormConfig().filter((field) => field.required);
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
      const data = {
        ...formValues,
        deposit_amount: calculatedDeposit,
      };
      const response = await axios[method](url, data);
      if (response.status === 201 || response.status === 200) {
        const action = isCreating ? 'creado' : 'actualizado';
        setSnackbarMessage(`Precio ${action} con éxito.`);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        setTimeout(() => {
          setFormValues({});
          setIsCreating(true);
          if (typeof onClear === 'function') onClear();
          if (typeof onPriceUpdated === 'function') onPriceUpdated();
          setErrors({});
        }, 2000);
      } else {
        throw new Error(`Respuesta no esperada del servidor: ${response.status}`);
      }
    } catch (error) {
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
          {/* Renderizando los campos del formulario */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Asset</InputLabel>
              <Select
                value={formValues.asset_id || ''}
                onChange={handleInputChange}
                name="asset_id"
              >
                {assets && assets.length > 0 ? (
                  assets.map((asset) => (
                    <MenuItem key={asset.id_asset} value={asset.id_asset}>
                      {asset.asset_name || `Asset con dimensiones: ${asset.asset_depth} x ${asset.asset_front} x ${asset.asset_height} (m)`}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No hay assets disponibles</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <DynamicFormFields formConfig={priceFormConfig()} formValues={formValues} errors={errors} handleInputChange={handleInputChange} />

          {calculatedDeposit && (
            <Grid item xs={12}>
              <TextField
                label="Depósito Calculado"
                value={calculatedDeposit}
                variant="outlined"
                fullWidth
                disabled
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {isCreating ? 'Crear Precio' : 'Modificar Precio'}
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

export default BasicDataPriceForm;
