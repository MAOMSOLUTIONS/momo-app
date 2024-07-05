import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Checkbox, FormControlLabel, Box, Button } from '@mui/material';
import * as XLSX from 'xlsx';

  // Definir las columnas de tu tabla
  const headCells = [
    { id: 'ano_datos_historicos', numeric: false, label: 'Año', isVisible: true },
    { id: 'sku_datos_historicos', numeric: false, label: 'SKU', isVisible: true },
    { id: 'modelo_datos_historicos', numeric: false, label: 'Modelo', isVisible: true },
    { id: 'tipo_enser_datos_historicos', numeric: false, label: 'Tipo de Enser', isVisible: true },
    { id: 'clasificacion_enser_datos_historicos', numeric: false, label: 'Clasificación', isVisible: true },
    { id: 'ventas_datos_historicos', numeric: true, label: 'Ventas', isVisible: true },
    { id: 'fecha_datos_historicos', numeric: false, label: 'Fecha', isVisible: true },
    { id: 'semana_datos_historicos', numeric: true, label: 'Semana', isVisible: true },
    { id: 'tipo', numeric: false, label: 'Tipo', isVisible: true },
  ];


  const exportToExcel = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
    // Buffer para permitir la descarga de archivos en navegadores modernos
    XLSX.write(wb, {bookType: 'xlsx', type: 'buffer'});
    
    // Crea un Blob con los datos en formato Excel
    XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
    
    // Crea un objeto Blob
    let excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
    
    // Crea y simula un click en un elemento <a> para descargar el archivo
    const link = document.createElement('a');
    link.href = URL.createObjectURL(data);
    link.setAttribute('download', fileName + '.xlsx'); // Nombre del archivo Excel
    document.body.appendChild(link);
    link.click();
  }

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Función para ordenar el array
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function DataTableHistorico({ data }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('sku');
  // Estado para las columnas visibles
  const [visibleColumns, setVisibleColumns] = useState(headCells.reduce((acc, headCell) => ({ ...acc, [headCell.id]: true }), {}));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Función para manejar la visibilidad de las columnas
  const handleColumnVisibilityChange = (columnId) => {
    setVisibleColumns(prevVisibleColumns => ({ ...prevVisibleColumns, [columnId]: !prevVisibleColumns[columnId] }));
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end', // Alinea el contenido (el botón) hacia el final (derecha)
          p: 1 // Aplica padding alrededor del contenedor para dar espacio
        }}
      >
        <Button
          variant="contained"
          color="info"
          size="small" // Hace el botón más pequeño
          onClick={() => exportToExcel(data, 'historico')}
        >
          Descarga Excel
        </Button>
      </Box>
      <TableContainer component={Paper} style={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headCells.filter(cell => cell.isVisible).map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align="center" 
                  sx={{
                    fontWeight: 'bold', 
                    textAlign: 'center',
                    backgroundColor: 'primary.main', // Color de fondo azul
                    color: 'common.white', // Texto blanco
                    fontSize: '0.75rem'
                  }}                  
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(data, getComparator(order, orderBy))
              .map((row, index) => (
                <TableRow 
                  hover 
                  tabIndex={-1} 
                  key={row.sku + index}
                  sx={{
                    // Alternar el color de fondo de cada fila
                    // Usamos operador módulo (%) para alternar colores
                    // `index % 2` será 0 (falso) para índices pares y 1 (verdadero) para índices impares
                    backgroundColor: index % 2 ? 'action.hover' : 'background.paper',
                  }}
                >
                {headCells.filter(cell => cell.isVisible).map((cell) => (
                  <TableCell key={row.id + cell.id} align={cell.numeric ? 'right' : 'left'}>
                    {row[cell.id]}
                  </TableCell>
                ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DataTableHistorico;