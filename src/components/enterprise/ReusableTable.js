import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const ReusableTable = ({ rows, columns, pageSize, rowsPerPageOptions, getRowId, initialState }) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      rowsPerPageOptions={rowsPerPageOptions}
      getRowId={getRowId}
      initialState={initialState}
    />
  );
};

export default ReusableTable;
