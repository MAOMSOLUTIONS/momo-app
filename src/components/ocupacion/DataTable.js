import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Checkbox, FormControlLabel, Box, Button } from '@mui/material';
import * as XLSX from 'xlsx';

  // Definir las columnas de tu tabla
  const headCells = [
    { id: 'sku', numeric: false, label: 'SKU', isVisible: true  },
    { id: 'sku_tipo', numeric: false, label: 'TIPO', isVisible: true },
    { id: 'actual_factor_inventario', numeric: true, label: 'FACTOR' , isVisible: false },
    { id: 'actual_inventario', numeric: true, label: 'INVENTARIO DISPONIBLE', isVisible: true  },
    { id: 'actual_venta', numeric: true, label: 'VENTA ACTUAL' , isVisible: false },
    { id: 'actual_area', numeric: true, label: 'AREA(M3)' , isVisible: false },
    { id: 'devoluciones_factor_inventario', numeric: true, label: 'FACTOR DEVOLUCIONES', isVisible: false  },
    { id: 'devoluciones_inventario', numeric: true, label: 'INVENTARIO DEVOLUCIONES' , isVisible: false },
    { id: 'devoluciones_area', numeric: true, label: 'AREA DEVOLUCIONES(M3)' , isVisible: false },
    { id: 'mensual_venta', numeric: true, label: 'VENTA MENSUAL' , isVisible: false },
    { id: 'mensual_venta_devoluciones', numeric: true, label: 'VENTA MENSUAL DEVOLUCIONES' , isVisible: false },    
    { id: 'stagging_factor_inventario', numeric: true, label: 'FACTOR INVENTARIO STAGGING' , isVisible: false },
    { id: 'stagging_inventario', numeric: true, label: 'INVENTARIO STAGGING' , isVisible: false },
    { id: 'stagging_area', numeric: true, label: 'AREA STAGGING(M3) ' , isVisible: false },
    { id: 'pronostico_diario', numeric: true, label: 'PRONOSTICO HOY' , isVisible: false },
    { id: 'pronostico_optimo', numeric: true, label: 'PRONOSTICO OPTIMO(15días)' , isVisible: true },
    { id: 'area_pronostico_optimo', numeric: true, label: 'AREA PRONOSTICO OPTIMO(M3)' , isVisible: false },
    { id: 'inventario_seguridad', numeric: true, label: 'INVENTARIO SEGURIDAD' , isVisible: false },
    { id: 'punto_reorden', numeric: true, label: 'PUNTO REORDEN' , isVisible: true},
    { id: 'cantidad_solicitar', numeric: true, label: 'CANTIDAD SOLICITAR', isVisible: true },
  ];

  const exportToExcel = (apiData, fileName, visibleColumns) => {
    // Primero, construye un mapa de visibilidad de columnas basado en headCells
    const columnVisibility = headCells.reduce((acc, cell) => {
      acc[cell.id] = cell.isVisible ?? false; // Usa el valor de isVisible o false si no está definido
      return acc;
    }, {});

    // Luego, filtra y transforma los datos basándose en la visibilidad de las columnas
    const filteredData = apiData.map(row => {
      const filteredRow = {};
      Object.keys(row).forEach(key => {
        // Comprueba si la columna está marcada como visible antes de agregarla
        if (columnVisibility[key]) {
          filteredRow[key] = row[key];
        }
      });
      return filteredRow;
    });

    // A partir de aquí, el proceso de creación y descarga de Excel sigue igual
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Crea un Blob con los datos en formato Excel
    let excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
    
    // Crea y simula un click en un elemento <a> para descargar el archivo
    const link = document.createElement('a');
    link.href = URL.createObjectURL(data);
    link.setAttribute('download', fileName + '.xlsx');
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

function DataTable({ data }) {
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
          onClick={() => exportToExcel(data, 'ocupación')}
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
                    <TableCell key={cell.id} align={cell.numeric ? 'right' : 'left'}>
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

export default DataTable;