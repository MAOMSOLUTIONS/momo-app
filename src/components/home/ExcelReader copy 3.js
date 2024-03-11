import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { Container, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function ExcelReader() {
  const [productosData, setProductosData] = useState(null);
  const [paqueteriaData, setPaqueteriaData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      alert('Selecciona un archivo de Excel antes de cargarlo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' });

      const productosWorksheet = workbook.Sheets['Productos'];
      const productosJsonData = XLSX.utils.sheet_to_json(productosWorksheet);
      setProductosData(productosJsonData);

      const paqueteriaWorksheet = workbook.Sheets['Paqueteria'];
      const paqueteriaJsonData = XLSX.utils.sheet_to_json(paqueteriaWorksheet);
      setPaqueteriaData(paqueteriaJsonData);

      axios.post('http://127.0.0.1:5000/api/cubicuadraje', {
        productos: productosJsonData,
        paqueteria: paqueteriaJsonData,
      })
      .then((response) => {
        setApiResponse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Container>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
      >
        Subir Archivo Excel
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          hidden
        />
      </Button>

      {productosData && (
        <div>
          <Typography variant="h6" gutterBottom>
            Productos
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>CÓDIGO</TableCell>
                  <TableCell>DESCRIPCION</TableCell>
                  <TableCell align="right">FRENTE</TableCell>
                  <TableCell align="right">ANCHO</TableCell>
                  <TableCell align="right">ALTURA</TableCell>
                  <TableCell align="right">PZS POR CAJA</TableCell>
                  <TableCell align="right">VOLUMEN M3</TableCell>
                  <TableCell align="right">CANTIDAD</TableCell>
                  <TableCell>PAQUETERIA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productosData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.CÓDIGO}
                    </TableCell>
                    <TableCell>{row.DESCRIPCION}</TableCell>
                    <TableCell align="right">{row.FRENTE}</TableCell>
                    <TableCell align="right">{row.ANCHO}</TableCell>
                    <TableCell align="right">{row.ALTURA}</TableCell>
                    <TableCell align="right">{row['PZS POR CAJA']}</TableCell>
                    <TableCell align="right">{row['VOLUMEN M3']}</TableCell>
                    <TableCell align="right">{row.CANTIDAD}</TableCell>
                    <TableCell>{row.PAQUETERIA}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {paqueteriaData && (
        <div>
          <Typography variant="h6" gutterBottom>
            Paqueteria
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 300, overflow: 'auto' }}>
            <Table stickyHeader aria-label="sticky table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>PAQUETERIA</TableCell>
                  <TableCell>CAMION</TableCell>
                  <TableCell align="right">FRENTE</TableCell>
                  <TableCell align="right">ANCHO</TableCell>
                  <TableCell align="right">ALTURA</TableCell>
                  <TableCell align="right">BASE M2</TableCell>
                  <TableCell align="right">VOLUMEN M3</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paqueteriaData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.PAQUETERIA}
                    </TableCell>
                    <TableCell>{row.CAMION}</TableCell>
                    <TableCell align="right">{row.FRENTE}</TableCell>
                    <TableCell align="right">{row.ANCHO}</TableCell>
                    <TableCell align="right">{row.ALTURA}</TableCell>
                    <TableCell align="right">{row['BASE M2']}</TableCell>
                    <TableCell align="right">{row['VOLUMEN M3']}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {apiResponse && (
        <Typography variant="body1" gutterBottom>
          <strong>Respuesta de la API:</strong> {apiResponse.message}
        </Typography>
      )}
    </Container>
  );
}

export default ExcelReader;
