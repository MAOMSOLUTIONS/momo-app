import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { Container, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileSaver from 'file-saver';
import { styled } from '@mui/material/styles';
import ResultadoOptimizacion from './ResultadoOptimizacion'; // Importa el componente que creaste
import PanelDesplegable from './PanelDesplegable';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

function ExcelReader() {
  const [productosData, setProductosData] = useState(null);
  const [paqueteriaData, setPaqueteriaData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const exportToExcel = (jsonData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(jsonData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(data, fileName + '.xlsx');
  };

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
        console.log("DATOS DE ENTRADA",response.data)
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
      {apiResponse ? (
        <>
          <Typography variant="body1" gutterBottom>
            <strong>Respuesta de e-CUBIC::</strong>
          </Typography>
          <PanelDesplegable titulo="Camiones Utilizados">
            {apiResponse && apiResponse.resultados && apiResponse.resultados.camiones_utilizados && (
              <ResultadoOptimizacion title="Camiones Utilizados" data={apiResponse.resultados.camiones_utilizados} />
            )}
          </PanelDesplegable>
          <PanelDesplegable titulo="Volumetría">
            {apiResponse && apiResponse.resultados && apiResponse.resultados.volumetria && (
              <ResultadoOptimizacion title="Volumetría" data={apiResponse.resultados.volumetria} />
            )}
          </PanelDesplegable>

          <PanelDesplegable titulo="Asignaciones">
            {apiResponse && apiResponse.resultados && apiResponse.resultados.asignaciones && (
              <ResultadoOptimizacion title="Asignaciones" data={apiResponse.resultados.asignaciones} />
            )}
          </PanelDesplegable>          
        </>
      ) : (
        <Typography variant="body1" gutterBottom>
          Presiona "SUBIR ARCHIVO EXCEL" para obtener los resultados de e-CUBIC.
        </Typography>
      )}
      {productosData && (
        <div>
          <Typography variant="h6" gutterBottom>
            Productos
          </Typography>
          <Button variant="contained" color="primary" onClick={() => exportToExcel(productosData, 'Productos')}>
            Descargar Excel
          </Button>          
          <TableContainer component={Paper} sx={{ maxHeight: 300, overflow: 'auto', mt: 2 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>CÓDIGO</StyledTableCell>
                  <StyledTableCell>DESCRIPCION</StyledTableCell>
                  <StyledTableCell align="right">FRENTE</StyledTableCell>
                  <StyledTableCell align="right">ANCHO</StyledTableCell>
                  <StyledTableCell align="right">ALTURA</StyledTableCell>
                  <StyledTableCell align="right">PZS POR CAJA</StyledTableCell>
                  <StyledTableCell align="right">VOLUMEN M3</StyledTableCell>
                  <StyledTableCell align="right">CANTIDAD</StyledTableCell>
                  <StyledTableCell>PAQUETERIA</StyledTableCell>
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
          <Button variant="contained" color="primary" onClick={() => exportToExcel(paqueteriaData, 'Paqueteria')}>
            Descargar Excel
          </Button>          
          <TableContainer component={Paper} sx={{ maxHeight: 300, overflow: 'auto', mt: 2 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>PAQUETERIA</StyledTableCell>
                  <StyledTableCell>CAMION</StyledTableCell>
                  <StyledTableCell align="right">FRENTE</StyledTableCell>
                  <StyledTableCell align="right">ANCHO</StyledTableCell>
                  <StyledTableCell align="right">ALTURA</StyledTableCell>
                  <StyledTableCell align="right">BASE M2</StyledTableCell>
                  <StyledTableCell align="right">VOLUMEN M3</StyledTableCell>
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

    </Container>
  );
}

export default ExcelReader;
