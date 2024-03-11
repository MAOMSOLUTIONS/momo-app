import { Button } from '@mui/material';
export const userColumns = (handleEditUser) => [

        { field: 'id', headerName: 'ID', width: 90 , visible: true },
        { field: 'first_name', headerName: 'Nombre', width: 150 , visible: true },
        { field: 'last_name', headerName: 'Apellido Paterno', width: 150 , visible: true },
        { field: 'surname', headerName: 'Apellido Materno', width: 150 , visible: false},
        { field: 'birth_date', headerName: 'Fecha de Nacimiento', width: 150 , visible: false},
        { field: 'email', headerName: 'Correo', width: 200 , visible: true},
        { field: 'phone', headerName: 'Teléfono', width: 150, hide: true , visible: false}, // Oculta la columna "Teléfono"
        { field: 'sex', headerName: 'Sexo', width: 100, hide: true , visible: false}, // Oculta la columna "Sexo"
        { field: 'street', headerName: 'Calle', width: 150, hide: true , visible: false}, // Oculta la columna "Calle"
        { field: 'interior_number', headerName: 'Número Interior', width: 150, hide: true , visible: false}, // Oculta la columna "Número Interior"
        { field: 'exterior_number', headerName: 'Número Exterior', width: 150, hide: true , visible: false}, // Oculta la columna "Número Exterior"
        { field: 'municipality', headerName: 'Municipio', width: 150, hide: true , visible: false}, // Oculta la columna "Municipio"
        { field: 'city', headerName: 'Ciudad', width: 150, hide: true , visible: false}, // Oculta la columna "Ciudad"
        { field: 'country', headerName: 'País', width: 150, hide: true , visible: false}, // Oculta la columna "País"
        { field: 'postal_code', headerName: 'Código Postal', width: 150, hide: true , visible: false}, // Oculta la columna "Código Postal"
        { field: 'profile', headerName: 'Perfil', width: 150, hide: true , visible: false}, // Oculta la columna "Perfil"
        { field: 'status', headerName: 'Estatus', width: 120 , visible: true},
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