  // formConfig.js
  const formFields = [
    { id: 'id_enterprise', label: 'Id', sm: 3, required: false , disabled: true },
    { id: 'enterprise_name', label: 'Nombre Empresa', sm: 6, required: true},
    { id: 'enterprise_rfc', label: 'RFC', sm: 6, required: true},
    { id: 'enterprise_phone', label: 'Teléfono', sm: 6, required: true},
    { id: 'enterprise_email', label: 'Email', sm: 6, required: true},
    { id: 'enterprise_contact_name', label: 'Nombre Contacto', sm: 6, required: true},
    { id: 'enterpise_fiscal_name', label: 'Nombre Físcal', sm: 6, required: true},
    { id: 'enterprise_fiscal_street', label: 'Calle Físcal', sm: 6, required: true},
    { id: 'enterprise_fiscal_internal_number', label: 'Número Interno Físcal', sm: 6, required: true},
    { id: 'enterprise_fiscal_external_number', label: 'Número Externo Físcal', sm: 6, required: true},
    { id: 'enterprise_fiscal_municipio', label: 'Municipio Físcal', sm: 6, required: true},
    { id: 'enterprise_fiscal_state', label: 'Estado Físcal', sm: 6, required: true},
    { id: 'enterprise_fiscal_country', label: 'País Físcal', sm: 6, required: true},
    { id: 'enterprise_fiscal_postal_code', label: 'CP Físcal', sm: 6, required: true},
    { id: 'id_enterprise_status', label: 'Estatus Físcal', sm: 6, type: 'select', required: true, options: ['Activo', 'Inactivo'] },
    { id: 'enterpise_fiscal_email', label: 'Email Físcal', sm: 6, required: true},
    { id: 'enterprise_fiscal_phone', label: 'Teléfono Físcal', sm: 6, required: true}
  ];
  export default formFields;