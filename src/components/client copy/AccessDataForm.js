import React from 'react';
import { TextField, Button } from '@mui/material';

const AccessDataForm = () => {
  // La lógica para manejar los datos de acceso del usuario

  return (
    <form>
      {/* Los campos para los datos de acceso */}
      <TextField label="Usuario" variant="outlined" fullWidth margin="normal" />
      <TextField label="Contraseña" type="password" variant="outlined" fullWidth margin="normal" />
      {/* Puedes agregar más campos si es necesario */}
      <Button variant="contained" color="primary">Guardar Datos de Acceso</Button>
    </form>
  );
};

export default AccessDataForm;
