import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { assetColumns } from './AssetListTableConfig';

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

const ConsultarMiniBodegas = ({ onSelectBodega }) => {
  const [miniBodegas, setMiniBodegas] = useState([]);
  const [searchParams, setSearchParams] = useState({
    asset_number: '',
    asset_name: '',
    asset_status: '',
    available_from: '',
    available_to: ''
  });

  const [advancedFilters, setAdvancedFilters] = useState({
    asset_front_min: '',
    asset_front_max: '',
    asset_depth_min: '',
    asset_depth_max: '',
    asset_height_min: '',
    asset_height_max: '',
    asset_m2_min: '',
    asset_m2_max: '',
    rental_price_min: '',
    rental_price_max: '',
    deposit_value_min: '',
    deposit_value_max: ''
  });

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/available', { params: { ...searchParams, ...advancedFilters } });
      if (response && response.data) {
        setMiniBodegas(response.data);
      } else {
        console.error("No data returned from the API");
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const handleChange = (event) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdvancedChange = (event) => {
    setAdvancedFilters({
      ...advancedFilters,
      [event.target.name]: event.target.value,
    });
  };

  // Define las columnas, evitando duplicación
  const columns = assetColumns(onSelectBodega);  // assetColumns ya incluye las columnas necesarias

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: 400, width: '100%' }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Filtros de Búsqueda
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, flexWrap: 'wrap' }}>
          <TextField
            name="asset_number"
            label="Número de Bodega"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            name="asset_name"
            label="Nombre de Bodega"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            name="asset_status"
            label="Estado"
            variant="outlined"
            onChange={handleChange}
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Todos</option>
            <option value="1">Disponible</option>
            <option value="2">Ocupada</option>
            <option value="3">Mantenimiento</option>
          </TextField>
          <TextField
            name="available_from"
            label="Disponible Desde"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
          <TextField
            name="available_to"
            label="Disponible Hasta"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
        </Box>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Filtros Avanzados</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                name="asset_front_min"
                label="Frente Mínimo"
                variant="outlined"
                onChange={handleAdvancedChange}
                type="number"
              />
              <TextField
                name="asset_front_max"
                label="Frente Máximo"
                variant="outlined"
                onChange={handleAdvancedChange}
                type="number"
              />
              <TextField
                name="asset_depth_min"
                label="Profundidad Mínima"
                variant="outlined"
                onChange={handleAdvancedChange}
                type="number"
              />
              <TextField
                name="asset_depth_max"
                label="Profundidad Máxima"
                variant="outlined"
                onChange={handleAdvancedChange}
                type="number"
              />
              <TextField
                name="asset_height_min"
                label="Altura Mínima"
                variant="outlined"
                onChange={handleAdvancedChange}
                type="number"
              />
              <TextField
                name="asset_height_max"
                label="Altura Máxima"
                variant="outlined"
                onChange={handleAdvancedChange}
                type="number"
              />
              <TextField
                name="asset_m2_min"
                label="Mínimo M2"
                variant="outlined"
                onChange={handleAdvancedChange}
                type="number"
              />
              <TextField
                name="asset_m2_max"
                label="Máximo M2"
                variant="outlined"
                onChange={handleAdvancedChange}
                type="number"
              />

              {/* Nuevos Filtros de Precio de Renta y Depósito */}
              <TextField
                name="rental_price_min"
                label="Precio de Renta Mínimo"
                variant="outlined"
                onChange={handleAdvancedChange}
                type="number"
              />
              <TextField
                name="rental_price_max"
                label="Precio de Renta Máximo"
                variant="outlined"
                onChange={handleAdvancedChange}
                type="number"
              />
              <TextField
                name="deposit_value_min"
                label="Depósito Mínimo"
                variant="outlined"
                onChange={handleAdvancedChange}
                type="number"
              />
              <TextField
                name="deposit_value_max"
                label="Depósito Máximo"
                variant="outlined"
                onChange={handleAdvancedChange}
                type="number"
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          sx={{ marginTop: 2 }}
        >
          Buscar
        </Button>

        <DataGrid
          rows={miniBodegas}
          columns={columns}  // Usamos las columnas definidas en assetColumns, sin duplicar
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id_asset}
          sx={{ marginTop: 2 }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default ConsultarMiniBodegas;
