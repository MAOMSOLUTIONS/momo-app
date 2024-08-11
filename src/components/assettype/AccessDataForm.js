import React from 'react';
import { TextField, Button } from '@mui/material';

const AccessDataForm = () => {
  return (
    <form>
      <TextField label="Usuario" variant="outlined" fullWidth margin="normal" />
      <TextField label="Contraseña" type="password" variant="outlined" fullWidth margin="normal" />
      <Button variant="contained" color="primary">Guardar Datos de Acceso</Button>
    </form>
  );
};

export default AccessDataForm;
