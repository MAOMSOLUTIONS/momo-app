import React, { useState, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateAssetForm from './CreateAssetForm';
import AssetList from './AssetList';
import BasicDataAssetForm from './BasicDataAssetForm';

function Asset() {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isCreateAccordionOpen, setIsCreateAccordionOpen] = useState(false);
  const [assetsUpdated, setAssetsUpdated] = useState(false);

  const modifyAssetRef = useRef(null);

  const handleCreateAsset = () => {
    setSelectedAsset(null);
    setIsCreateAccordionOpen(true);
  };

  const handleEditAsset = (asset) => {
    if (modifyAssetRef.current) {
      modifyAssetRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    setSelectedAsset(asset);
    setIsCreateAccordionOpen(true);
  };

  const handleClearForm = () => {
    setSelectedAsset(null);
    setIsCreateAccordionOpen(true); // Mantiene el acordeón abierto
  };

  const handleAssetUpdated = () => {
    setAssetsUpdated(true);
    setIsCreateAccordionOpen(false); // Contrae el acordeón después de la actualización
  };

  const scrollToModifyAsset = () => {
    setIsCreateAccordionOpen(true);
    if (modifyAssetRef.current) {
      modifyAssetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {/* Acordeón para Crear/Modificar Asset */}
      <Accordion expanded={isCreateAccordionOpen} onChange={() => setIsCreateAccordionOpen(!isCreateAccordionOpen)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} ref={modifyAssetRef}>
          <Typography>{!selectedAsset ? 'Crear Asset' : 'Modificar Asset'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: '100%' }}>
            {selectedAsset !== null ? (
              <BasicDataAssetForm
                initialValues={selectedAsset}
                setSelectedAsset={setSelectedAsset}
                onAssetUpdated={handleAssetUpdated}
                onClear={handleClearForm}
              />
            ) : (
              <CreateAssetForm onAssetUpdated={handleAssetUpdated} />
            )}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Acordeón para Consulta de Assets */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Consulta de Assets</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AssetList onEditAsset={handleEditAsset} scrollToModifyAsset={scrollToModifyAsset} assetsUpdated={assetsUpdated} setAssetsUpdated={setAssetsUpdated}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Asset;
