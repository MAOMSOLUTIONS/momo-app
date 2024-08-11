const formFields = (statuses = [], assetTypes = [], properties = []) => [
  { id: 'id_asset', label: 'ID Asset', sm: 3, required: false, disabled: true, section: 'basic' },
  { id: 'asset_name', label: 'Nombre del Asset', sm: 6, required: true, section: 'basic' },
  { id: 'asset_number', label: 'Número del Asset', sm: 6, required: true, section: 'basic' },
  {
    id: 'id_property',
    label: 'Propiedad',
    sm: 6,
    type: 'select',
    required: true,
    options: properties,
    section: 'basic'
  },
  {
    id: 'asset_type',
    label: 'Tipo de Asset',
    sm: 6,
    type: 'select',
    required: true,
    options: assetTypes,
    section: 'basic'
  },
  {
    id: 'asset_status',
    label: 'Estatus del Asset',
    sm: 6,
    type: 'select',
    required: true,
    options: statuses,
    section: 'basic'
  },
  { id: 'asset_front', label: 'Frente (m)', sm: 6, required: false, section: 'dimensions' },
  { id: 'asset_depth', label: 'Profundidad (m)', sm: 6, required: false, section: 'dimensions' },
  { id: 'asset_height', label: 'Altura (m)', sm: 6, required: false, section: 'dimensions' },
  { id: 'asset_m2', label: 'Área (m²)', sm: 6, required: false, section: 'dimensions' },
  { id: 'asset_m3', label: 'Volumen (m³)', sm: 6, required: false, section: 'dimensions' },
  { id: 'asset_comments', label: 'Comentarios', sm: 12, required: false, multiline: true, section: 'additional' },
  { id: 'asset_photo1', label: 'Foto 1', sm: 6, required: false, section: 'photos', type: 'file' },
  { id: 'asset_photo2', label: 'Foto 2', sm: 6, required: false, section: 'photos', type: 'file' },
  { id: 'asset_photo3', label: 'Foto 3', sm: 6, required: false, section: 'photos', type: 'file' },
  { id: 'asset_photo4', label: 'Foto 4', sm: 6, required: false, section: 'photos', type: 'file' },
  { id: 'asset_photo5', label: 'Foto 5', sm: 6, required: false, section: 'photos', type: 'file' }
];

export default formFields;
