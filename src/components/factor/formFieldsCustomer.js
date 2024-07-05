  // formConfig.js
  const formFields = [
    { id: 'id_factor', label: 'Id', sm: 3, required: false , disabled: true ,isVisible: true},
    { id: 'factor__total_devoluciones', label: 'Factor de Devoluciones', sm: 6, required: true,isVisible: true},
    { id: 'factor__porcentaje_devoluciones', label: 'Factor Porcentaje de Devoluciones', sm: 6, required: true},
    { id: 'factor_total_rumba', label: 'Factor de Rumba', sm: 6, required: true},
    { id: 'factor_total_rack', label: 'Factor de Rack', sm: 6, required: true},
    { id: 'factor_stagging', label: 'Factor de Stagging', sm: 6, required: true},
    { id: 'factor_area_stagging', label: 'Factor Area de Stagging', sm: 6, required: true},
  ];
  export default formFields;