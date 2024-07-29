import { Button } from '@mui/material';
export const userColumns = (handleEditUser) => [

        { field: 'id_enterprise', headerName: 'ID', width: 90 , visible: true },
        { field: 'enterprise_name', headerName: 'Nombre Empresa', width: 150 , visible: true },
        { field: 'enterprise_rfc', headerName: 'RFC', width: 150 , visible: true },
        { field: 'status_name', headerName: 'Estatus', width: 120 , visible: true},
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
              onClick={() => handleEditUser(params.row)}
            >
              Modificar
            </Button>
          ),
        },
  ];