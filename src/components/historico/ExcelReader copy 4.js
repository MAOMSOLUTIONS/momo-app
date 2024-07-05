import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { Container, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileSaver from 'file-saver';
import { styled } from '@mui/material/styles';
import ResultadoOptimizacion from './ResultadoOptimizacion';
import PanelDesplegable from './PanelDesplegable';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

function ExcelReader() {
  const [productosData, setProductosData] = useState(null);
  const [paqueteriaData, setPaqueteriaData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const { t } = useTranslation();

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
        {t('Subir Archivo Excel')}
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          hidden
        />
      </Button>
      {apiResponse && apiResponse.resultados && Object.keys(apiResponse.resultados).map((paqueteria) => (
        <Accordion key={paqueteria}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{paqueteria}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PanelDesplegable titulo={t('Camiones Utilizados')}>
              {apiResponse.resultados[paqueteria].camiones_utilizados && (
                <ResultadoOptimizacion title={t('Camiones Utilizados')} data={apiResponse.resultados[paqueteria].camiones_utilizados} />
              )}
            </PanelDesplegable>

            <PanelDesplegable titulo={t('Volumetría')}>
              {apiResponse.resultados[paqueteria].volumetria && (
                <ResultadoOptimizacion title={t('Volumetría')} data={apiResponse.resultados[paqueteria].volumetria} />
              )}
            </PanelDesplegable>

            <PanelDesplegable titulo={t('Asignaciones')}>
              {apiResponse.resultados[paqueteria].asignaciones && (
                <ResultadoOptimizacion title={t('Asignaciones')} data={apiResponse.resultados[paqueteria].asignaciones} />
              )}
            </PanelDesplegable>
          </AccordionDetails>
        </Accordion>
      ))}
      {productosData && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{t('Productos')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Button variant="contained" color="primary" onClick={() => exportToExcel(productosData, 'Productos')}>
                {t('Descargar Excel')}
              </Button>
              <TableContainer component={Paper} sx={{ maxHeight: 300, overflow: 'auto', mt: 2 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>{t('CÓDIGO')}</StyledTableCell>
                      <StyledTableCell>{t('DESCRIPCION')}</StyledTableCell>
                      <StyledTableCell align="right">{t('FRENTE')}</StyledTableCell>
                      <StyledTableCell align="right">{t('ANCHO')}</StyledTableCell>
                      <StyledTableCell align="right">{t('ALTURA')}</StyledTableCell>
                      <StyledTableCell align="right">{t('PZS POR CAJA')}</StyledTableCell>
                      <StyledTableCell align="right">{t('VOLUMEN M3')}</StyledTableCell>
                      <StyledTableCell align="right">{t('CANTIDAD')}</StyledTableCell>
                      <StyledTableCell>{t('PAQUETERIA')}</StyledTableCell>
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
          </AccordionDetails>
        </Accordion>
      )}

      {paqueteriaData && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{t('Paquetería')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Button variant="contained" color="primary" onClick={() => exportToExcel(paqueteriaData, 'Paqueteria')}>
                {t('Descargar Excel')}
              </Button>
              <TableContainer component={Paper} sx={{ maxHeight: 300, overflow: 'auto', mt: 2 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>{t('PAQUETERIA')}</StyledTableCell>
                      <StyledTableCell>{t('CAMION')}</StyledTableCell>
                      <StyledTableCell align="right">{t('FRENTE')}</StyledTableCell>
                      <StyledTableCell align="right">{t('ANCHO')}</StyledTableCell>
                      <StyledTableCell align="right">{t('ALTURA')}</StyledTableCell>
                      <StyledTableCell align="right">{t('BASE M2')}</StyledTableCell>
                      <StyledTableCell align="right">{t('VOLUMEN M3')}</StyledTableCell>
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
          </AccordionDetails>
        </Accordion>
      )}
    </Container>
  );
}

export default ExcelReader;
