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
import { assetColumns } from './AssetListTableConfig';
import { searchFields } from './AssetListFilterConfig';

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

const AssetList = ({ assetsUpdated, setAssetsUpdated, onEditAsset, scrollToModifyAsset }) => {
  const [assets, setAssets] = useState([]);
  const [searchParams, setSearchParams] = useState({
    idAsset: '',
    assetName: '',
    status: '',
  });
  const [selectedAsset, setSelectedAsset] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [consulting, setConsulting] = useState(false);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/assets', { params: searchParams });
      setAssets(response.data);
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

  const handleEditAsset = (asset) => {
    scrollToModifyAsset();
    setSelectedAsset(asset);
    onEditAsset(asset);
  };

  const handleConsultClick = () => {
    setConsulting(true);
  };

  useEffect(() => {
    if (consulting) {
      handleSearch();
      setAssetsUpdated(false);
    }
  }, [consulting, assetsUpdated]);

  const rawColumns = assetColumns(onEditAsset);
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
          rows={assets}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id_asset} // Cambiado a id_asset
        />
      </Box>
    </ThemeProvider>
  );
};

export default AssetList;
