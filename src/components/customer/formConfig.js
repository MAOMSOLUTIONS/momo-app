  // formConfig.js
  const formFields = [
  { id: 'id_customer', label: 'Id', sm: 3, required: false , disabled: true },
  { id: 'customer_name', label: 'Nombre ', sm: 6, required: true},
  { id: 'patern_name_customer', label: 'Apellido Paterno', sm: 6, required: true},
  { id: 'mater_name_customer', label: 'Apellido Materno', sm: 6, required: true},
  { id: 'phone_customer_one', label: 'Teléfono uno', sm: 6, required: true},
  { id: 'phone_customer_two', label: 'Teléfono dos', sm: 6, required: true},
  { id: 'email_customer_one', label: 'Email uno', sm: 6, required: true},
  { id: 'email_customer_two', label: 'Email dos', sm: 6, required: true},
  { id: 'street_customer', label: 'Calle', sm: 6, required: true},
  { id: 'internal_number_customer', label: 'Número Interno', sm: 6, required: true},
  { id: 'external_number_customer', label: 'Número Externo', sm: 6, required: true},
  { id: 'municipio_customer', label: 'Municipio', sm: 6, required: true},
  { id: 'state_customer', label: 'Estado', sm: 6, required: true},
  { id: 'country_customer', label: 'Ciudad', sm: 6, required: true},
  { id: 'postal_code_customer', label: 'CP', sm: 6, required: true},
  { id: 'id_status_customer', label: 'Estatus', sm: 6, required: true}
];


  export default formFields;