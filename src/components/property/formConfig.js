const getFormFields = (enterpriseOptions = [], statusOptions = []) => {
  return [
    { id: 'id_property', label: 'Id', sm: 3, required: false, disabled: true, section: 'basic' },
    { id: 'property_name', label: 'Nombre Propiedad', sm: 6, required: true, section: 'basic' },
    { id: 'enterprise_id', label: 'Empresa', sm: 6, type: 'select', required: true, optionsKey: 'enterprises', options: enterpriseOptions, section: 'basic' },
    { id: 'property_id_status', label: 'Estatus', sm: 6, type: 'select', required: true, optionsKey: 'statuses', options: statusOptions, section: 'basic' }
  ];
};

export default getFormFields;
