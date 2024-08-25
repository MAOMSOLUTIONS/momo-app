const clientFormConfig = () => [
  { id: 'id_client', label: 'Id', sm: 3, required: false, disabled: true },
  { id: 'client_name', label: 'Nombre Cliente', sm: 6, required: true },
  { id: 'client_email', label: 'Email', sm: 6, required: true },
  { id: 'client_phone', label: 'Teléfono', sm: 6, required: true },
  { id: 'client_address', label: 'Dirección', sm: 12, required: false }
];

export default clientFormConfig;

