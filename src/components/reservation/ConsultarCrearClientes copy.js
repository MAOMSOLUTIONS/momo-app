import React, { useState, useEffect } from 'react';

// Componente principal para consultar o crear clientes
function ConsultarCrearClientes() {
  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null); // Cliente seleccionado
  const [mostrarFormularioCrear, setMostrarFormularioCrear] = useState(false); // Mostrar formulario de crear cliente

  // Simulación de una consulta a la API para obtener la lista de clientes
  useEffect(() => {
    const obtenerClientes = async () => {
      const respuesta = await fetch('/api/clientes'); // Ajustar la URL a tu API
      const data = await respuesta.json();
      setClientes(data);
    };

    obtenerClientes();
  }, []);

  // Maneja la selección de un cliente
  const seleccionarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
  };

  // Muestra u oculta el formulario de crear cliente
  const handleMostrarFormularioCrear = () => {
    setMostrarFormularioCrear(!mostrarFormularioCrear);
  };

  return (
    <div>
      <h2>Consultar o Crear Clientes</h2>
      {!mostrarFormularioCrear && (
        <div>
          <h3>Lista de Clientes</h3>
          <ul>
            {clientes.map((cliente) => (
              <li key={cliente.id} onClick={() => seleccionarCliente(cliente)}>
                {cliente.nombre}
              </li>
            ))}
          </ul>
          {clienteSeleccionado && (
            <div>
              <h3>Cliente Seleccionado</h3>
              <p>Nombre: {clienteSeleccionado.nombre}</p>
              {/* Puedes agregar más detalles del cliente aquí */}
            </div>
          )}
          <button onClick={handleMostrarFormularioCrear}>
            Crear Nuevo Cliente
          </button>
        </div>
      )}
      {mostrarFormularioCrear && <FormularioCrearCliente onCreate={handleMostrarFormularioCrear} />}
    </div>
  );
}

// Componente para crear un nuevo cliente
function FormularioCrearCliente({ onCreate }) {
  const [nombre, setNombre] = useState('');

  const handleCrearCliente = async () => {
    // Simulación de una llamada a la API para crear un nuevo cliente
    const nuevoCliente = { nombre };
    await fetch('/api/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoCliente),
    });

    onCreate(); // Regresar a la lista de clientes después de crear
  };

  return (
    <div>
      <h3>Crear Nuevo Cliente</h3>
      <input
        type="text"
        placeholder="Nombre del Cliente"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={handleCrearCliente}>Crear Cliente</button>
      <button onClick={onCreate}>Cancelar</button>
    </div>
  );
}

export default ConsultarCrearClientes;
