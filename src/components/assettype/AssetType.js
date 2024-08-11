import React, { useState, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateAssetTypeForm from './CreateAssetTypeForm';
import AssetTypeList from './AssetTypeList';
import BasicDataAssetTypeForm from './BasicDataAssetTypeForm';
import { useTranslation } from 'react-i18next';

function AssetType() {
  const { t } = useTranslation();
  const [selectedAssetType, setSelectedAssetType] = useState(null);
  const [isCreateAccordionOpen, setIsCreateAccordionOpen] = useState(false);
  const [isFieldsEnabled, setIsFieldsEnabled] = useState(true);
  const [assetTypesUpdated, setAssetTypesUpdated] = useState(false);

  const modifyAssetTypeRef = useRef(null);

  const handleCreateAssetType = () => {
    setSelectedAssetType(null);
    setIsCreateAccordionOpen(true);
  };

  const handleEditAssetType = (assetType) => {
    if (modifyAssetTypeRef.current) {
      modifyAssetTypeRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    setSelectedAssetType(assetType);
    setIsCreateAccordionOpen(true);
  };

  const handleClearForm = () => {
    setSelectedAssetType(null);
    setIsCreateAccordionOpen(true); // Mantiene el acordeón abierto
  };

  const handleAssetTypeUpdated = () => {
    setAssetTypesUpdated(true);
    setIsCreateAccordionOpen(false); // Contrae el acordeón después de la actualización
  };

  return (
    <div>
      {/* Acordeón para Crear/Modificar Tipo de Asset */}
      <Accordion expanded={isCreateAccordionOpen} onChange={() => setIsCreateAccordionOpen(!isCreateAccordionOpen)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} ref={modifyAssetTypeRef}>
          <Typography>{!selectedAssetType ? t("Crear Tipo de Asset") : t("Modificar Tipo de Asset")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: '100%' }}>
            {selectedAssetType !== null ? (
              <BasicDataAssetTypeForm
                initialValues={selectedAssetType}
                setSelectedAssetType={setSelectedAssetType}
                isFieldsEnabled={isFieldsEnabled}
                onAssetTypeUpdated={handleAssetTypeUpdated}
                onClear={handleClearForm}
              />
            ) : (
              <CreateAssetTypeForm
                onAssetTypeUpdated={handleAssetTypeUpdated} // Aquí también para la creación
              />
            )}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Acordeón para Consulta de Tipos de Asset */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{t('Consulta de Tipo de Asset')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AssetTypeList onEditAssetType={handleEditAssetType} assetTypesUpdated={assetTypesUpdated} setAssetTypesUpdated={setAssetTypesUpdated}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AssetType;
