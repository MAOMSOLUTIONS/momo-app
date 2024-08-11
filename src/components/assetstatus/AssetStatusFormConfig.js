// AssetStatusFormConfig.js
const assetStatusFormConfig = () => [
  { id: 'id_status', label: 'ID', sm: 3, required: false, disabled: true, section: 'basic' },
  { id: 'status_name', label: 'Nombre del Estatus del Asset', sm: 9, required: true, section: 'basic' },
];

export default assetStatusFormConfig;

