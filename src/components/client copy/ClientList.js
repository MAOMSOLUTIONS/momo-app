import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userColumns } from './ClientListTableConfig';
import { searchFields } from './ClientListFilterConfig';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
  },
});

const ClientList = ({ clientsUpdated, setClientsUpdated, onEditClient }) => {
  const [clients, setClients] = useState([]);
  const [searchParams, setSearchParams] = useState({
    id_client: '',
    client_name: '',
    client_email: '',
    client_phone: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [consulting, setConsulting] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/client', { params: searchParams });
      setClients(response.data);
    } catch (error) {
      console.error('Error on search:', error);
      setSnackbarMessage('Error en la búsqueda');
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

  const handleEditClient = (client) => {
    onEditClient(client);
  };

  const handleConsultClick = () => {
    setConsulting(true);
  };

  useEffect(() => {
    if (consulting || clientsUpdated) {
      handleSearch();
      setClientsUpdated(false);
      setConsulting(false);
    }
  }, [consulting, clientsUpdated]);

  const rawColumns = userColumns(handleEditClient);
  const columns = rawColumns.filter(column => column.visible).map(({ visible, ...col }) => col);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: 400, width: '100%' }}>
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          {searchFields.map(field => (
            <TextField
              key={field.name}
              size={field.size}
              name={field.name}
              label={field.label}
              variant={field.variant}
              onChange={handleChange}
            />
          ))}
          <Button variant="text" onClick={handleConsultClick} sx={{ display: 'flex', alignItems: 'center' }}>
            <SearchIcon />
            Buscar
          </Button>
        </Box>
        <DataGrid
          rows={clients}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id_client}
        />
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default ClientList;
