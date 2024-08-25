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
import Collapse from '@mui/material/Collapse';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import BusinessIcon from '@mui/icons-material/Business';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import WarehouseIcon from '@mui/icons-material/Warehouse'; // Icono relacionado con minibodegas
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import ReservationIcon from '@mui/icons-material/CalendarToday';
import { useTranslation } from 'react-i18next';

import Enterprise from '../enterprise/Enterprise';
import Property from '../property/Property';
import Asset_Type from '../assettype/AssetType';
import Asset_Status from '../assetstatus/AssetStatus';
import Asset from '../asset/Asset';
import ReservationStatus from '../reservation/Reservation';
import Customer from '../customer/Customer';
import Reservation from '../reservation/Reservation';
import Status from '../status/Status';

import './Home.css';

const Sidebar = ({ open, handleDrawerClose, handleMenuItemClick, changeLanguage }) => {
  const [openSubMenu, setOpenSubMenu] = useState({});
  const { t } = useTranslation();

  const handleSubMenuClick = (item) => {
    setOpenSubMenu((prevOpenSubMenu) => ({
      ...prevOpenSubMenu,
      [item]: !prevOpenSubMenu[item],
    }));
  };

  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <List>
        <ListItem button onClick={() => handleSubMenuClick('Catalogos')} className="drawerStyle">
          <IconButton edge="start"><SettingsIcon /></IconButton>
          <ListItemText primary={t('Catálogos')} />
          {openSubMenu['Catalogos'] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSubMenu['Catalogos']} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={() => handleMenuItemClick('Empresas')}>
              <IconButton edge="start"><BusinessIcon /></IconButton>
              <ListItemText primary={t('Empresas')} />
            </ListItem>
            <ListItem button onClick={() => handleMenuItemClick('Propiedad')}>
              <IconButton edge="start"><HomeWorkIcon /></IconButton>
              <ListItemText primary={t('Propiedad')} />
            </ListItem>
            <ListItem button onClick={() => handleSubMenuClick('Asset')} className="drawerStyle">
              <IconButton edge="start"><WarehouseIcon /></IconButton>
              <ListItemText primary={t('Asset')} />
              {openSubMenu['Asset'] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenu['Asset']} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={() => handleMenuItemClick('Asset_Type')}>
                  <IconButton edge="start"><WarehouseIcon /></IconButton>
                  <ListItemText primary={t('Tipo de Asset')} />
                </ListItem>
                <ListItem button onClick={() => handleMenuItemClick('Asset_Status')}>
                  <IconButton edge="start"><WarehouseIcon /></IconButton>
                  <ListItemText primary={t('Estatus del Asset')} />
                </ListItem>
                <ListItem button onClick={() => handleMenuItemClick('Asset')}>
                  <IconButton edge="start"><WarehouseIcon /></IconButton>
                  <ListItemText primary={t('Asset')} />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={() => handleSubMenuClick('Reservaciones')} className="drawerStyle">
              <IconButton edge="start"><ReservationIcon /></IconButton>
              <ListItemText primary={t('Reservaciones')} />
              {openSubMenu['Reservaciones'] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenu['Reservaciones']} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={() => handleMenuItemClick('ReservationStatus')}>
                  <IconButton edge="start"><EventAvailableIcon /></IconButton>
                  <ListItemText primary={t('Estatus de la reservación')} />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={() => handleSubMenuClick('General')} className="drawerStyle">
              <IconButton edge="start"><SettingsIcon /></IconButton>
              <ListItemText primary={t('General')} />
              {openSubMenu['General'] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenu['General']} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={() => handleMenuItemClick('General_Status')}>
                  <IconButton edge="start"><SettingsIcon /></IconButton>
                  <ListItemText primary={t('Estatus')} />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleMenuItemClick('Clientes')} className="drawerStyle">
          <IconButton edge="start"><PeopleIcon /></IconButton>
          <ListItemText primary={t('Clientes')} />
        </ListItem>

        <ListItem button onClick={() => handleMenuItemClick('Reservaciones')} className="drawerStyle">
          <IconButton edge="start"><ReservationIcon /></IconButton>
          <ListItemText primary={t('Reservaciones')} />
        </ListItem>
      </List>
    </Drawer>
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
    case 'Empresas':
      return <Enterprise />;
    case 'Propiedad':
      return <Property />;
    case 'Asset_Type':
      return <Asset_Type />;
    case 'Asset_Status':
      return <Asset_Status />;
    case 'Asset':
      return <Asset />;
    case 'ReservationStatus':
      return <ReservationStatus />;
    case 'General_Status':
      return <Status />;
    case 'Clientes':
      return <Customer />;
    case 'Reservaciones':
      return <Reservation />;
    default:
      return <div onClick={handleContentClick} style={{ padding: 20 }}>Selecciona una opción</div>;
  }
};

const App = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start">
            <MenuIcon />
          </IconButton>
          <Button onClick={() => handleMenuItemClick('Home')} color="inherit">{t('Home')}</Button>
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
