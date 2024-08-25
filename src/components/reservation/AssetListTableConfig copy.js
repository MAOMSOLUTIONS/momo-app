import { Button } from '@mui/material';

export const assetColumns = (handleEditAsset) => [
  { field: 'id_asset', headerName: 'ID', width: 90, visible: true },
  { field: 'asset_name', headerName: 'Nombre', width: 150, visible: true },
  { field: 'asset_m2', headerName: 'M2', width: 120, visible: true },
  { field: 'asset_m3', headerName: 'M3', width: 120, visible: true },
  { field: 'asset_status', headerName: 'Estado', width: 120, visible: true },
  { field: 'latest_price', headerName: 'Precio de Renta', width: 150, type: 'number' },  // Nueva columna de precio
  { field: 'deposit_value', headerName: 'Depósito', width: 150, type: 'number' },  // Nueva columna de precio
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    visible: true,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => handleEditAsset(params.row)}
      >
        Seleccionar
      </Button>
    ),
  },
];
