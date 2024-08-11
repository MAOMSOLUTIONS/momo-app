import React from 'react';
import BasicDataAssetStatusForm from './BasicDataAssetStatusForm';
import { useTranslation } from 'react-i18next';

const CreateAssetStatusForm = ({ onUserUpdated }) => {
  const { t } = useTranslation();
  return (
    <div>
      <BasicDataAssetStatusForm onUserUpdated={onUserUpdated} />
    </div>
  );
};

export default CreateAssetStatusForm;
