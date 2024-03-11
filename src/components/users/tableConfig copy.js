// tableConfig.js
export const columns = [
    // Tus definiciones de columna aquí...
    // Ejemplo:
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'first_name', headerName: 'Nombre', width: 150 },
    // ...más columnas
  ];
  
  export const initialState = {
    columns: {
      columnVisibilityModel: {
        // Tu modelo de visibilidad de columnas aquí...
        phone: false, // Ejemplo
        sex: false,
        // ...más columnas
      },
    },
  };
  