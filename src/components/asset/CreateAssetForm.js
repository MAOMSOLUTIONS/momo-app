import React from 'react';
import BasicDataAssetForm from './BasicDataAssetForm';

const CreateAssetForm = ({ onAssetUpdated }) => {
  return (
    <div>
      <BasicDataAssetForm onAssetUpdated={onAssetUpdated} />
    </div>
  );
};

export default CreateAssetForm;
