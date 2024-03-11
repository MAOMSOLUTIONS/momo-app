import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  Typography, // Importa Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userColumns } from './UserListTableConfig';
import { searchFields } from './UserListFilterConfig';

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

const UsersList = ({ onEditUser , scrollToModifyUser}) => {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useState({
    idUser: '',
    firstName: '',
    lastName: '',
    email: '',
    status: '',
  });
  const [selectedUser, setSelectedUser] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [consulting, setConsulting] = useState(false);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/user', { params: searchParams });
      setUsers(response.data);
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

  const handleEditUser = (user) => {
    scrollToModifyUser();
    setSelectedUser(user);
    onEditUser(user);
//    setIsAccordionExpanded(true);
  };

  const handleConsultClick = () => {
    setConsulting(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (consulting) {
      handleSearch();
    }
  }, [consulting]);

  const rawColumns = userColumns(onEditUser);
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
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id}
        />
      </Box>
    </ThemeProvider>
  );
};
export default UsersList;