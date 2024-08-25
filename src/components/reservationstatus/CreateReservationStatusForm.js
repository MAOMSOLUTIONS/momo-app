import React from 'react';
import BasicDataReservationStatusForm from './BasicDataReservationStatusForm';
import { useTranslation } from 'react-i18next';

const CreateReservationStatusForm = ({ onStatusUpdated }) => {
  const { t } = useTranslation();
  return (
    <div>
      <BasicDataReservationStatusForm onStatusUpdated={onStatusUpdated} />
    </div>
  );
};

export default CreateReservationStatusForm;
