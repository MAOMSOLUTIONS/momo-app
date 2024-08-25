import { Button } from '@mui/material';

export const userColumns = (handleEditPrice) => [
  { field: 'id_price', headerName: 'ID', width: 90 },
  { field: 'asset_name', headerName: 'Nombre del Asset', width: 150 },
  { field: 'rental_price', headerName: 'Precio de Renta', width: 150 },
  { field: 'currency', headerName: 'Moneda', width: 100 },
  { field: 'created_at', headerName: 'Fecha de Creación', width: 150, type: 'date' },  // Nueva columna para la fecha de creación
  {
    field: 'actionsView',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <Button
        variant="text"
        color="primary"
        size="small"
        onClick={() => handleEditPrice(params.row)}
      >
        Modificar
      </Button>
    ),
  },
];