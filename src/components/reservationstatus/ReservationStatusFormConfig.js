const reservationStatusFormConfig = [
  {
    id: 'id_reservation_status',
    label: 'ID',
    type: 'text',
    sm: 3,
    required: false,
    disabled: true,
    section: 'general'
  },
  {
    id: 'reservation_status_name',
    label: 'Nombre del Estatus',
    type: 'text',
    sm: 9,
    required: true,
    section: 'general'
  },
];

export default reservationStatusFormConfig;
