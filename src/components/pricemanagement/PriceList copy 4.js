import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const PriceList = () => {
  const [prices, setPrices] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [assets, setAssets] = useState([]);
  const [currencies, setCurrencies] = useState(['MXN', 'USD', 'EUR']);

  // Fetch assets for the dropdown
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/assets');
        setAssets(response.data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/prices', { params: searchParams });
      setPrices(response.data);
    } catch (error) {
      setSnackbarMessage('Error al buscar precios');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleChange = (event) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  // Define columns
  const columns = [
    { field: 'id_price', headerName: 'ID', width: 90 },
    { field: 'asset_name', headerName: 'Nombre del Asset', width: 150 },
    { field: 'rental_price', headerName: 'Precio de Renta', width: 150 },
    { field: 'currency', headerName: 'Moneda', width: 150 },
    {
      field: 'created_at',
      headerName: 'Fecha de Creación',
      width: 200,
      type: 'date',
      valueGetter: (params) => new Date(params.row.created_at),
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        {/* Asset Filter */}
        <FormControl fullWidth>
          <InputLabel>Asset</InputLabel>
          <Select
            name="asset_id"
            value={searchParams.asset_id || ''}
            onChange={handleChange}
          >
            <MenuItem value="">Todos</MenuItem>
            {assets.map((asset) => (
              <MenuItem key={asset.id_asset} value={asset.id_asset}>
                {asset.asset_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Currency Filter */}
        <FormControl fullWidth>
          <InputLabel>Moneda</InputLabel>
          <Select
            name="currency"
            value={searchParams.currency || ''}
            onChange={handleChange}
          >
            <MenuItem value="">Todos</MenuItem>
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Date Range Filter */}
        <TextField
          name="start_date"
          label="Fecha Inicial"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />

        <TextField
          name="end_date"
          label="Fecha Final"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />

        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </Box>

      <DataGrid
        rows={prices}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.id_price}
      />

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PriceList;
