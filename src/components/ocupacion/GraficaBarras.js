
import { Typography } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Cell, LabelList
} from 'recharts';
import { Box,Tabs, Tab } from '@mui/material';



const GraficaBarras = ({ data1, titulo, titulo2 }) => {

  if (!Array.isArray(data1) || data1.length === 0) {
    return <Typography variant="body1" align="center">No hay datos disponibles</Typography>;
  }  

  const getBarColor = (value) => {
    if (value <= 75) return '#4CAF50'; // Verde más suave
    if (value > 75 && value <= 100) return '#FFEB3B'; // Amarillo claro
    return '#F44336'; // Rojo vibrante
  };

  const CustomizedLabel = ({ x, y, width, value, isInsideBar }) => {
    return (
      <text
        x={x + width / 2}
        y={isInsideBar ? y + 20 : y} // Si es dentro de la barra, ajustamos la posición y
        dy={isInsideBar ? 0 : -6} // Ajustamos el desplazamiento solo para el porcentaje
        fill={isInsideBar ? '#fff' : '#000'} // Si es dentro de la barra, el color de la fuente podría ser blanco para mejor visibilidad
        fontWeight="bold"
        fontSize="16"
        textAnchor="middle"
      >
        {value}
      </text>
    );
  };

  const handleClick = (event, newValue) => {
    // Podrías actualizar el estado aquí o hacer algo con newValue
  };

  return (
    <Box onClick={() => handleClick(titulo)}>
      {/* Título del gráfico */}
      <Typography variant="subtitle2" component="h3" align="center" gutterBottom>
        {titulo}
      </Typography>

      <BarChart
        width={300}
        height={150}
        data={data1}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" hide={true}/>
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="real" name="Real" fill="#8884d8">
          {
            data1.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.real)} />
            ))
          }
          <LabelList dataKey="real" content={props => <CustomizedLabel {...props} isInsideBar={false} />} />
          <LabelList dataKey="name" content={props => <CustomizedLabel {...props} isInsideBar={true} value="Real" />} />

        </Bar>
        <Bar dataKey="proyectado" name="Proyectado" fill="#82ca9d">
          {
            data1.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.proyectado)} />
            ))
          }
          <LabelList dataKey="proyectado" content={props => <CustomizedLabel {...props} isInsideBar={false} />} />
          <LabelList dataKey="name" content={props => <CustomizedLabel {...props} isInsideBar={true} value="Proyectado" />} />
        </Bar>
      </BarChart>

      {/* Título del gráfico */}
      <Typography variant="subtitle2" component="h3" align="center" gutterBottom>
        {titulo2}
      </Typography>
    </Box>
  );
};

export default GraficaBarras;