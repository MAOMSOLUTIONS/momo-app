import React from 'react';
import GenericForm from './GenericForm';
import formFields from './formConfig';

const MyComponent = () => {
  const initialValues = { /* tus valores iniciales aquí */ };
  
  const handleFormSubmit = (formValues) => {
    // manejar el envío del formulario
  };

  return (
    <GenericForm
      formFields={formFields}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
    />
  );
};
export default MyComponent;
