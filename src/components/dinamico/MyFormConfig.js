  // formConfig.js
  const myformconfig = [
    { id: 'id', label: 'Id', sm: 3, required: false , disabled: true },
    { id: 'first_name', label: 'Nombre', sm: 6, required: true},
    { id: 'last_name', label: 'Apellido Paterno', sm: 6, required: true},
    { id: 'surname', label: 'Apellido Materno', sm: 6 },
    { id: 'birth_date', label: 'Fecha de nacimiento', type: 'date', sm: 6, required: true },
    { id: 'email', label: 'Correo Electrónico', type: 'email', sm: 6, required: true },
    { id: 'phone', label: 'Teléfono', sm: 6 },
    { id: 'sex', label: 'Sexo', sm: 6, type: 'select', required: true, options: ['Hombre', 'Mujer'] },
    { id: 'street', label: 'Calle', sm: 12 },
    { id: 'interior_number', label: 'Número Interior', sm: 6 },
    { id: 'exterior_number', label: 'Número Exterior', sm: 6 },
    { id: 'municipality', label: 'Delegación o Municipio', sm: 6 },
    { id: 'city', label: 'Ciudad o Estado', sm: 6 },
    { id: 'country', label: 'País', sm: 6, type: 'select', required: true, options: ['México', 'Estados Unidos', 'Canadá'] }, 
    { id: 'postal_code', label: 'Código Postal', sm: 6, required: true },
    { id: 'profile', label: 'Perfil', sm: 6, type: 'select', required: true, options: ['Administrador', 'Escritura', 'Lectura'] },
    { id: 'status', label: 'Estatus', sm: 6, type: 'select', required: true, options: ['Activo', 'Inactivo'] }
  ];
  
  export default myformconfig;
  