import { Button } from '@mui/material';

export const statusColumns = (handleEditStatus) => [
  { field: 'id_reservation_status', headerName: 'ID', width: 90, visible: true },
  { field: 'reservation_status_name', headerName: 'Nombre del Estado de Reservación', width: 150, visible: true },
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
        onClick={() => handleEditStatus(params.row)}
      >
        Modificar
      </Button>
    ),
  },
];
