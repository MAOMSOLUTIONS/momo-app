import React from 'react';
import BasicDataStatusForm from './BasicDataStatusForm';
import { useTranslation } from 'react-i18next';

const CreateStatusForm = ({ onStatusUpdated }) => {
  const { t } = useTranslation();
  return (
    <div>
      <BasicDataStatusForm onStatusUpdated={onStatusUpdated} />
    </div>
  );
};

export default CreateStatusForm;
