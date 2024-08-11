import { Button } from '@mui/material';

export const assetColumns = (handleEditAsset) => [
  { field: 'id_asset', headerName: 'ID', width: 90, visible: true },
  { field: 'asset_number', headerName: 'Número de Asset', width: 150, visible: true },
  { field: 'asset_name', headerName: 'Nombre Asset', width: 150, visible: true },
  { field: 'property_name', headerName: 'Propiedad', width: 150, visible: true },  // Aquí asegúrate de usar 'property_name'
  { field: 'asset_type_name', headerName: 'Tipo de Asset', width: 150, visible: true },  // Aquí asegúrate de usar 'asset_type_name'
  { field: 'asset_status_name', headerName: 'Estatus', width: 120, visible: true },  // Aquí asegúrate de usar 'asset_status_name'
  {
    field: 'actionsView',
    headerName: 'Acciones',
    width: 150,
    visible: true,
    renderCell: (params) => (
      <Button
        variant="text"
        color="primary"
        size="small"
        onClick={() => handleEditAsset(params.row)}
      >
        Modificar
      </Button>
    ),
  },
];
