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
import { assetTypeColumns } from './AssetTypeTableConfig';
import { searchFields } from './AssetTypeListFilterConfig';

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

const AssetTypeList = ({ assetTypesUpdated, setAssetTypesUpdated, onEditAssetType }) => {
  const [assetTypes, setAssetTypes] = useState([]);
  const [searchParams, setSearchParams] = useState({
    id_asset_type: '',
    asset_type_name: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [consulting, setConsulting] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/asset_type', { params: searchParams });
      setAssetTypes(response.data);
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

  const handleEditAssetType = (assetType) => {
    onEditAssetType(assetType);
  };

  const handleConsultClick = () => {
    setConsulting(true);
  };

  useEffect(() => {
    if (consulting) {
      handleSearch();
      setAssetTypesUpdated(false);
    }
  }, [consulting, assetTypesUpdated]);

  const rawColumns = assetTypeColumns(handleEditAssetType);
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
          rows={assetTypes}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id_asset_type}
        />
      </Box>
    </ThemeProvider>
  );
};

export default AssetTypeList;
