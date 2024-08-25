import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { statusColumns } from './ReservationStatusListTableConfig';
import { searchFields } from './ReservationStatusListFilterConfig';

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

const ReservationStatusList = ({ statusesUpdated, setStatusesUpdated, onEditStatus, scrollToModifyStatus }) => {
  const [statuses, setStatuses] = useState([]);
  const [searchParams, setSearchParams] = useState({
    id_reservation_status: '',
    reservation_status_name: '',
  });
  const [selectedStatus, setSelectedStatus] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [consulting, setConsulting] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/reservation_status', { params: searchParams });
      setStatuses(response.data);
    } catch (error) {
      console.error('Error on search:', error);
    }
  };

  const handleChange = (event) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditStatus = (status) => {
    scrollToModifyStatus();
    setSelectedStatus(status);
    onEditStatus(status);
  };

  const handleConsultClick = () => {
    setConsulting(true);
  };

  useEffect(() => {
    if (consulting) {
      handleSearch();
      setStatusesUpdated(false);
    }
  }, [consulting, statusesUpdated]);

  const rawColumns = statusColumns(onEditStatus);
  const columns = rawColumns.filter(column => column.visible).map(({ visible, ...col }) => col);

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
            <Typography variant="body2">Buscar</Typography>
          </Button>
        </Box>
        <DataGrid
          rows={statuses}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id_reservation_status} 
        />
      </Box>
    </ThemeProvider>
  );
};

export default ReservationStatusList;
