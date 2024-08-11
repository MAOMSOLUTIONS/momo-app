import { Button } from '@mui/material';

export const assetTypeColumns = (handleEditAssetType) => [
  { field: 'id_asset_type', headerName: 'ID', width: 90, visible: true },
  { field: 'asset_type_name', headerName: 'Nombre Tipo de Asset', width: 150, visible: true },
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
        onClick={() => handleEditAssetType(params.row)}
      >
        Modificar
      </Button>
    ),
  },
];
