// formConfig.js
const enterpriseFormConfig = (statuses = []) => [
  { id: 'id_enterprise', label: 'Id', sm: 3, required: false, disabled: true, section: 'basic' },
  { id: 'enterprise_name', label: 'Nombre Empresa', sm: 6, required: true, section: 'basic' },
  { id: 'enterprise_rfc', label: 'RFC', sm: 6, required: true, section: 'fiscal' },
  { id: 'enterprise_phone', label: 'Teléfono', sm: 6, required: false, section: 'basic' },
  { id: 'enterprise_email', label: 'Email', sm: 6, required: false, section: 'basic' },
  { id: 'enterprise_contact_name', label: 'Nombre Contacto', sm: 6, required: false, section: 'basic' },
  { id: 'enterpise_fiscal_name', label: 'Nombre Fiscal', sm: 6, required: false, section: 'fiscal' },
  { id: 'enterprise_fiscal_street', label: 'Calle Fiscal', sm: 6, required: false, section: 'fiscal' },
  { id: 'enterprise_fiscal_internal_number', label: 'Número Interno Fiscal', sm: 6, required: false, section: 'fiscal' },
  { id: 'enterprise_fiscal_external_number', label: 'Número Externo Fiscal', sm: 6, required: false, section: 'fiscal' },
  { id: 'enterprise_fiscal_municipio', label: 'Municipio Fiscal', sm: 6, required: false, section: 'fiscal' },
  { id: 'enterprise_fiscal_state', label: 'Estado Fiscal', sm: 6, required: false, section: 'fiscal' },
  { id: 'enterprise_fiscal_country', label: 'País Fiscal', sm: 6, required: false, section: 'fiscal' },
  { id: 'enterprise_fiscal_postal_code', label: 'CP Fiscal', sm: 6, required: false, section: 'fiscal' },
  {
    id: 'enterprise_id_status',
    label: 'Estatus',
    sm: 6,
    type: 'select',
    required: true,
    options: statuses,
    section: 'basic'
  },
  { id: 'enterpise_fiscal_email', label: 'Email Fiscal', sm: 6, required: false, section: 'fiscal' },
  { id: 'enterprise_fiscal_phone', label: 'Teléfono Fiscal', sm: 6, required: false, section: 'fiscal' }
];

export default enterpriseFormConfig;
