// AssetStatusList.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { userColumns } from './AssetStatusListTableConfig';
import { searchFields } from './AssetStatusListFilterConfig';

const AssetStatusList = ({ onEditStatus }) => {
  const [statuses, setStatuses] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/asset_status', { params: searchParams });
      setStatuses(response.data);
    } catch (error) {
      setSnackbarMessage('Error al buscar estatus');
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

  const handleEditUser = (status) => {
    onEditStatus(status);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        {searchFields.map((field) => (
          <TextField
            key={field.name}
            size={field.size}
            name={field.name}
            label={field.label}
            variant={field.variant}
            onChange={handleChange}
          />
        ))}
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </Box>
      <DataGrid
        rows={statuses}
        columns={userColumns(handleEditUser)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.id_status}
      />
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AssetStatusList;
