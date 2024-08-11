import React from 'react';
import BasicDataAssetTypeForm from './BasicDataAssetTypeForm';
import { useTranslation } from 'react-i18next';

const CreateAssetTypeForm = ({ onUserUpdated }) => {
  const { t } = useTranslation();
  return (
    <div>
      <BasicDataAssetTypeForm onUserUpdated={onUserUpdated} />
    </div>
  );
};

export default CreateAssetTypeForm;
