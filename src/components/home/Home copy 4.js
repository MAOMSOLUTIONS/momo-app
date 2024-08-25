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

// Importación de componentes específicos de MiniBodegas
import Enterprise from '../enterprise/Enterprise';
import Property from '../property/Property';
import Status from '../status/Status';
import Asset_Type from '../assettype/AssetType';
import Asset_Status from '../assetstatus/AssetStatus';
import Asset from '../asset/Asset';
import Customer from '../customer/Customer';
import Reservation from '../reservation/Reservation';
import Reservation_Status from '../reservation/Reservation';

import './Home.css';
import { useLocation } from "react-router-dom";

const Sidebar = ({ open, handleDrawerClose, handleMenuItemClick }) => {
  const [openSubMenu, setOpenSubMenu] = useState({});
  const { t } = useTranslation();

  const handleSubMenuClick = (item) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleMenuItemSelect = (item) => {
    handleDrawerClose();
    handleMenuItemClick(item);
  };

  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <List>
        {/* Menú Catálogos */}
        <ListItem button onClick={() => handleSubMenuClick('Catálogos')} className="drawerStyle">
          <ListItemText primary={t('Catálogos')} />
        </ListItem>
        {openSubMenu['Catálogos'] && (
          <List>
            {/* Submenú Empresas y Propiedad */}
            <ListItem button onClick={() => handleMenuItemSelect('Empresas')}>
              <ListItemText primary={t('* Empresas')} className="listItemStyle" />
            </ListItem>
            <ListItem button onClick={() => handleMenuItemSelect('Propiedad')}>
              <ListItemText primary={t('* Propiedad')} className="listItemStyle" />
            </ListItem>

            {/* Submenú Asset */}
            <ListItem button onClick={() => handleSubMenuClick('Asset')}>
              <ListItemText primary={t('* Asset')} className="listItemStyle" />
            </ListItem>
            {openSubMenu['Asset'] && (
              <List>
                <ListItem button onClick={() => handleMenuItemSelect('Asset_Type')}>
                  <ListItemText primary={t('** Tipo de Asset')} className="listItemStyle" />
                </ListItem>
                <ListItem button onClick={() => handleMenuItemSelect('Asset_Status')}>
                  <ListItemText primary={t('** Estatus del Asset')} className="listItemStyle" />
                </ListItem>
                <ListItem button onClick={() => handleMenuItemSelect('Asset')}>
                  <ListItemText primary={t('** Asset')} className="listItemStyle" />
                </ListItem>
              </List>
            )}

            {/* Submenú Reservaciones */}
            <ListItem button onClick={() => handleSubMenuClick('Reservaciones')}>
              <ListItemText primary={t('* Reservaciones')} className="listItemStyle" />
            </ListItem>
            {openSubMenu['Reservaciones'] && (
              <List>
                <ListItem button onClick={() => handleMenuItemSelect('Reservation_Status')}>
                  <ListItemText primary={t('** Estatus de la reservación')} className="listItemStyle" />
                </ListItem>
              </List>
            )}

            {/* Submenú General */}
            <ListItem button onClick={() => handleSubMenuClick('General')}>
              <ListItemText primary={t('* General')} className="listItemStyle" />
            </ListItem>
            {openSubMenu['General'] && (
              <List>
                <ListItem button onClick={() => handleMenuItemSelect('Status')}>
                  <ListItemText primary={t('** Estatus')} className="listItemStyle" />
                </ListItem>
              </List>
            )}
          </List>
        )}

        {/* Menú Clientes */}
        <ListItem button onClick={() => handleMenuItemSelect('Clientes')}>
          <ListItemText primary={t('Clientes')} />
        </ListItem>

        {/* Menú Reservaciones */}
        <ListItem button onClick={() => handleMenuItemSelect('Reservaciones')}>
          <ListItemText primary={t('Reservaciones')} />
        </ListItem>
      </List>
    </Drawer>
  );
};

const Content = ({ selectedMenuItem, handleDrawerClose }) => {
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
    case 'Empresas':
      return (
        <Enterprise />
      );
    case 'Propiedad':
      return (
        <Property />
      );
    case 'Estatus':
      return (
        <Status />
      );
    case 'Asset_Type':
      return (
        <Asset_Type />
      );
    case 'Asset_Status':
      return (
        <Asset_Status />
      );
    case 'Asset':
      return (
        <Asset />
      );
    case 'Clientes':
      return (
        <Customer />
      );
    case 'Reservaciones':
      return (
        <Reservation />
      );
    case 'Reservation_Status':
      return (
        <Reservation_Status />
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

  const [userName, setUserName] = useState('');
  useEffect(() => {
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

          <div style={{ flex: 1 }}></div>
          <div>{userName}</div>
        </Toolbar>
      </AppBar>
      <Sidebar
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleMenuItemClick={handleMenuItemClick}
      />
      <Content selectedMenuItem={selectedMenuItem} handleDrawerClose={handleDrawerClose} />
    </div>
  );
};

export default App;
