import { Button } from '@mui/material';

export const userColumns = (handleEditClient) => [
  { field: 'id_client', headerName: 'ID', width: 90, visible: true },
  { field: 'client_name', headerName: 'Nombre Cliente', width: 150, visible: true },
  { field: 'client_email', headerName: 'Email', width: 150, visible: true },
  { field: 'client_phone', headerName: 'Teléfono', width: 120, visible: true },
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
        onClick={() => handleEditClient(params.row)}
      >
        Modificar
      </Button>
    ),
  },
];
