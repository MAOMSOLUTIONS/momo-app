import React from 'react';
import BasicDataPropertyForm from './BasicDataPropertyForm';
import { useTranslation } from 'react-i18next';

const CreatePropertyForm = ({ onUserUpdated }) => {
  const { t } = useTranslation();
  return (
    <div>
      <BasicDataPropertyForm onUserUpdated={onUserUpdated} />
    </div>
  );
};

export default CreatePropertyForm;
