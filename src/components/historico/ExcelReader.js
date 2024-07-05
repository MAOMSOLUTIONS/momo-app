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
      <ResultadoOptimizacion title='Camiones Utilizados' data={apiResponse.resultados[paqueteria].camiones_utilizados} />
    </Container>
  );
}

export default ExcelReader;
