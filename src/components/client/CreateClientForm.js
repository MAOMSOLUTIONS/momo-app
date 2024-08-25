import React from 'react';
import BasicDataClientForm from './BasicDataClientForm';

const CreateClientForm = ({ onClientUpdated }) => {
  return (
    <div>
      <BasicDataClientForm onClientUpdated={onClientUpdated} />
    </div>
  );
};

export default CreateClientForm;
