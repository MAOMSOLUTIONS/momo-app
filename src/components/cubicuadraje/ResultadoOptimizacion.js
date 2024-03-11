import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';
import { utils, writeFile } from 'xlsx';

function ResultadoOptimizacion({ title, data }) {
  
  // Función para descargar los datos en Excel
  const descargarExcel = (dataToExport) => {
    const ws = utils.json_to_sheet(dataToExport);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Datos');
    const blob = writeFile(wb, { bookType: 'xlsx', type: 'blob' });
    saveAs(blob, 'datos.xlsx');
  }

  return (
    <TableContainer component={Paper} style={{ marginBottom: '20px', maxHeight: '400px', overflow: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'blue', padding: '10px', color: 'white' }}>
        <Typography variant="h6">
          {title}
        </Typography>
        <Button variant="contained" onClick={() => descargarExcel(data)}>
          Descargar Excel
        </Button>
      </div>
      <Table>
        <TableHead style={{ backgroundColor: 'blue' }}>
          <TableRow>
            <TableCell style={{ color: 'white', position: 'sticky', top: 0 }}>Descripción</TableCell>
            <TableCell style={{ color: 'white', position: 'sticky', top: 0 }} align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data[0].map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">{row[0]}</TableCell>
              <TableCell align="right">{row[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResultadoOptimizacion;
