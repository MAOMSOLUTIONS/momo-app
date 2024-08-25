import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const PriceListFilterConfig = () => {
  const [assets, setAssets] = useState([]);
  const [currencies, setCurrencies] = useState(['MXN', 'USD', 'EUR']); // Monedas predeterminadas

  useEffect(() => {
    // Fetch assets
    const fetchAssets = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/assets');
        setAssets(response.data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

  return [
    {
      name: 'asset_id',
      label: 'Nombre del Asset',
      type: 'select',
      options: assets.map(asset => ({
        id: asset.id_asset,
        value: asset.asset_name || `Asset con dimensiones: ${asset.asset_depth} x ${asset.asset_front} x ${asset.asset_height} (m)`,
      })),
    },
    {
      name: 'currency',
      label: 'Moneda',
      type: 'select',
      options: [
        { id: 'all', value: 'Todas' },
        ...currencies.map(currency => ({ id: currency, value: currency })),
      ],
    },
    {
      name: 'rental_price_range',
      label: 'Rango de Precios de Renta',
      type: 'number-range',
    },
  ];
};
