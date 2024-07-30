import React from 'react';
import BasicDataEnterpriseForm from './BasicDataEnterpriseForm';
import { useTranslation } from 'react-i18next';

const CreateEnterpriseForm = ({ onUserUpdated }) => {
  const { t } = useTranslation();
  return (
    <div>
      <BasicDataEnterpriseForm onUserUpdated={onUserUpdated} />
    </div>
  );
};

export default CreateEnterpriseForm;
