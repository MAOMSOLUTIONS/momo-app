const priceFormConfig = () => [
    { id: 'rental_price', label: 'Precio de Renta', sm: 6, required: true, type: 'number', section: 'basic' },
    { id: 'deposit_type', label: 'Tipo de Depósito', sm: 6, required: true, type: 'select', section: 'basic', options: [{ id: 'percentage', value: 'Porcentaje' }, { id: 'fixed', value: 'Monto Fijo' }] },
    { id: 'deposit_value', label: 'Valor de Depósito', sm: 6, required: true, type: 'number', section: 'basic' },
    { id: 'currency', label: 'Moneda', sm: 6, required: true, type: 'select', section: 'basic', options: [{ id: 'MXN', value: 'MXN' }, { id: 'USD', value: 'USD' }, { id: 'EUR', value: 'EUR' }] },
  ];
  
  export default priceFormConfig;
  