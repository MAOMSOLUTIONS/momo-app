import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import { useTranslation } from 'react-i18next';
import Herramientas from '../cubicuadraje/Cubicuadraje';
import ExcelReader from '../cubicuadraje/ExcelReader';

import User from '../users/User';
import Enterprise from '../enterprise/Enterprise';
import Property from '../property/Property';
import Asset from '../asset/Asset';
import Customer from '../customer/Customer';
import Reservation from '../reservation/Reservation';


import Forecast from '../forecast/Forecast';
import MyForm from '../dinamico/MyForm';

import './Home.css';
import { useLocation } from "react-router-dom";

const Sidebar = ({ open, handleDrawerClose, handleMenuItemClick, changeLanguage }) => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { t } = useTranslation();

  const location = useLocation();

  const handleSubMenuClick = (item) => {
    if (openSubMenu === item) {
      setOpenSubMenu(null);
      handleDrawerClose();
    } else {
      setOpenSubMenu(item);
    }
  };

  const handleMenuItemSelect = (item) => {
    handleDrawerClose();
    handleMenuItemClick(item);
  };

  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <List>
      <ListItem button onClick={() => handleSubMenuClick('Catálogos')} className="drawerStyle">
          <ListItemText primary={t('Catálogos')} />
        </ListItem>
        {openSubMenu === 'Catálogos' && (
          <List>
            <ListItem button onClick={() => handleMenuItemSelect('Empresas')}>
              <ListItemText primary={t('- Empresas')} className="listItemStyle" />
            </ListItem>
            <ListItem button onClick={() => handleMenuItemSelect('Clientes')}>
              <ListItemText primary={t('- Clientes')} className="listItemStyle" />
            </ListItem>
            <ListItem button onClick={() => handleMenuItemSelect('Usuarios')}>
              <ListItemText primary={t('- Usuarios')} className="listItemStyle" />
            </ListItem>
            <ListItem button onClick={() => handleMenuItemSelect('Productos')}>
              <ListItemText primary={t('- Productos')} className="listItemStyle" />
            </ListItem>
            <ListItem button onClick={() => handleMenuItemSelect('Tiendas')}>
              <ListItemText primary={t('- Tiendas')} className="listItemStyle" />
            </ListItem>
          </List>
        )}      
      <ListItem button onClick={() => handleSubMenuClick('Herramientas')} className="drawerStyle">
        <ListItemText primary={t('Herramientas')} />
      </ListItem>
      {openSubMenu === 'Herramientas' && (
        <List>
          <ListItem button onClick={() => handleMenuItemSelect('Cubicuadraje')}>
            <ListItemText primary={t('- Cubicuadraje')} className="listItemStyle" />
          </ListItem>
        </List>
      )}
      <ListItem button onClick={() => handleSubMenuClick('Reportes')} className="drawerStyle">
        <ListItemText primary={t('Reportes')} />
      </ListItem>
      {openSubMenu === 'Reportes' && (
        <List>
          <ListItem button onClick={() => handleMenuItemSelect('Recolecciones')}>
            <ListItemText primary={t('- Recolecciones')} className="listItemStyle" />
          </ListItem>
        </List>
      )}

      </List>
    </Drawer>
  );
};

const Cubicuadraje = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h2>{t('Cubicuadraje')}</h2>
      <ExcelReader />
    </div>    
  );
};
const ForecastComponent  = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <h2>{t('Forecast de Pedidos')}</h2>
      <Forecast />
    </div>
  );
};

const Usuarios = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <h2>{t('Usuarios')}</h2>
      <User />
    </div>
  );
};
const Empresas = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <h2>{t('Empresas')}</h2>
      <Enterprise />
    </div>
  );
};
const Clientes = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <h2>{t('Clientes')}</h2>
      <Property />
    </div>
  );
};
const Ejemplo = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h2>{t('Administración de Usuarios')}</h2>
      <MyForm />
    </div>
  );
};

const Content = ({ selectedMenuItem, handleDrawerClose, changeLanguage }) => {
  useEffect(() => {
    handleDrawerClose();
  }, [selectedMenuItem]);

  const handleContentClick = () => {
    handleDrawerClose();
  };

  switch (selectedMenuItem) {
    case 'Home':
      return (
        <div onClick={handleContentClick} className="contentStyle">
        </div>
      );
    case 'Catálogos':
        return (
      <Catálogos/>
    );              
    case 'Clientes':
        return (
          <Clientes />
    );
    case 'Usuarios':
        return (
          <Usuarios />
    );


    case 'Pedidos':
      return (
        <div onClick={handleContentClick} className="contentStyle">
        </div>
      );
    case 'Inventarios':
      return (
        <div onClick={handleContentClick} className="contentStyle">
        </div>
      );
    case 'Devoluciones':
      return (
        <div onClick={handleContentClick} className="contentStyle">
        </div>
      );

    case 'Herramientas':
      return (
        <Herramientas />
      );      
    case 'Cubicuadraje':
      return (
        <Cubicuadraje />
      );
    case 'Forecast':
        return (
          <ForecastComponent/>
        );
  
    case 'Usuarios':
        return (
          <Usuarios/>
        );
    case 'Empresas':
        return (
            <Empresas/>
        );
    case 'Propiedad':
          return (
              <Propiedad/>
          );            
    case 'Asset':
            return (
          <Asset/>
          );              
    case 'Customer':
            return (
          <Customer/>
          );              
    case 'Reservation':
            return (
          <Reservation/>
          );              

    case 'Ejemplo':
      return (
        <MyForm />
      );
          
    default:
      return (
        <div onClick={handleContentClick} style={{ backgroundColor: 'blue', color: 'white' }}>
        </div>
      );
  }
};

const App = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Home');
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const [userName, setUserName] = useState(''); // Estado para almacenar el nombre de usuario
  useEffect(() => {
    // Cuando el componente se monta, verifica si hay un nombre de usuario guardado
    // en el almacenamiento local y actualiza el estado
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="menuStyle">
          <IconButton color="white" aria-label="open drawer" onClick={handleDrawerOpen} edge="start">
            <MenuIcon />
          </IconButton>
          <Button onClick={() => handleMenuItemClick('Home')} className="buttonStyle">{t('Home')}</Button>
          <Button onClick={() => handleMenuItemClick('Devoluciones')} className="buttonStyle">{t('Devoluciones')}</Button>
          <Button onClick={() => handleMenuItemClick('Recolección')} className="buttonStyle">{t('Recolección')}</Button>
          <Button onClick={() => handleMenuItemClick('F&F')} className="buttonStyle">{t('F&F')}</Button>
          <Button onClick={() => handleMenuItemClick('Destrucción')} className="buttonStyle">{t('Destrucción')}</Button>

          <div style={{ flex: 1 }}></div>
          <div>{userName}</div> 
        </Toolbar>
      </AppBar>
      <Sidebar
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleMenuItemClick={handleMenuItemClick}
      />
      <Content selectedMenuItem={selectedMenuItem} handleDrawerClose={handleDrawerClose} changeLanguage={changeLanguage} />
    </div>
  );
};

export default App;
