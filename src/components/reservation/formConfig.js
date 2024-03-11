  // formConfig.js
  const formFields = [
  { id: 'id_asset', label: 'MiniBodega', sm: 3, required: false , disabled: true },
  { id: 'id_reservation', label: 'Id de la reservación ', sm: 6, required: true},
  { id: 'id_type_reservation', label: 'Tipo de Reservación', sm: 6, required: true},
  { id: 'date_start_reservation', label: 'Inicio de la reservación', sm: 6, required: true},
  { id: 'date_end_reservation', label: 'Fin de la reservación', sm: 6, required: true},
  { id: 'price_reservation', label: 'Precio', sm: 6, required: true},
  { id: 'id_unit_coin', label: 'UM', sm: 6, required: true},
  { id: 'id_status_reservation', label: 'Estatus', sm: 6, required: true}
];


  export default formFields;