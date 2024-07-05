import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function ResultadoOptimizacion({ title, data }) {
  // Verificación para asegurarse de que 'data' es un array antes de intentar mapearlo.
  if (!Array.isArray(data)) {
    // Si 'data' no es un array, puedes decidir qué hacer aquí.
    // Por ejemplo, podrías retornar null para no renderizar nada,
    // o podrías mostrar un mensaje de error.
    return null;
  }

  return (
    <TableContainer component={Paper} style={{marginBottom: '20px'}}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
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
