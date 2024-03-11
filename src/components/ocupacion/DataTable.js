import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DataTable = ({ data }) => {
  // Encabezados de las columnas basados en tu imagen
  const columns = [
    "SKU", "Tipo", "8", "9", "10", "Venta Acumulada", "Demanda Diaria",
    "Inventario Actual (Disponible)", "Inventario Óptimo (15 días)",
    "Punto de Reorden", "Cantidad a Solicitar", "Inven.Act (M2)", "Inven.Opt. (M2)"
  ];

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="tabla simple">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((value, cellIndex) => (
                <TableCell key={cellIndex}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DataTable;