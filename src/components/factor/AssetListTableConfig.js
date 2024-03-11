import { Button } from '@mui/material';
export const userColumns = (handleEditUser) => [

        { field: 'id_factor', headerName: 'ID', width: 90 , visible: true },
        { field: 'factor__total_devoluciones', headerName: 'Devoluciones', width: 150 , visible: true },
        { field: 'factor__porcentaje_devoluciones', headerName: '% Devoluciones', width: 150 , visible: true },
        { field: 'factor_total_rumba', headerName: 'Rumba', width: 150 , visible: true },
        { field: 'factor_total_rack', headerName: 'Rack', width: 150 , visible: true },
        { field: 'factor_stagging', headerName: 'Stagging', width: 150 , visible: true },
        { field: 'factor_area_stagging', headerName: 'Area Stagging', width: 150 , visible: true },
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