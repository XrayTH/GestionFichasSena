import React, { useState } from 'react';
import axios from 'axios';
import Municipios from '../data/municipios.json';

const DireccionBuscador = () => {
  const [municipio, setMunicipio] = useState('');
  const [direccion, setDireccion] = useState('');
  const [coordenadas, setCoordenadas] = useState('');
  const [error, setError] = useState('');

  const municipiosList = Municipios.municipios || [];

  const buscarPorDireccion = async () => {
    if (!municipio || !direccion) {
      setError('Por favor, selecciona un municipio y escribe una dirección.');
      return;
    }

    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: `${direccion}, ${municipio}, Valle del Cauca, Colombia`,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
      });

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoordenadas(`${lat}, ${lon}`);
        setError('');
      } else {
        setError('No se encontraron coordenadas para la dirección especificada.');
      }
    } catch (err) {
      setError('Error al buscar las coordenadas. Intenta de nuevo.');
    }
  };

  const obtenerUbicacionActual = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCoordenadas(`${latitude}, ${longitude}`);
      }, (err) => {
        setError('No se pudo obtener la ubicación actual.');
      });
    } else {
      setError('La geolocalización no es soportada por este navegador.');
    }
  };

  return (
    <div style={styles.container}>
      <select
        style={styles.select}
        value={municipio}
        onChange={(e) => setMunicipio(e.target.value)}
      >
        <option value="" disabled>Selecciona un municipio</option>
        {municipiosList.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>

      <input
        type="text"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        placeholder="Ingresa la dirección"
        style={styles.input}
      />

      <button onClick={buscarPorDireccion} style={styles.button}>Buscar por dirección</button>
      <button onClick={obtenerUbicacionActual} style={styles.button}>Mi ubicación actual</button>

      <input
        type="text"
        value={coordenadas}
        readOnly
        placeholder="Coordenadas"
        style={styles.lockedInput}
      />
      
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  select: {
    marginRight: '0.5rem',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    flex: '1',
    minWidth: '150px',
  },
  input: {
    marginRight: '0.5rem',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    flex: '2',
    minWidth: '200px',
  },
  lockedInput: {
    marginLeft: '0.5rem',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    flex: '2',
    minWidth: '200px',
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#5eb219',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    marginRight: '0.5rem',
    minWidth: '150px',
  },
  error: {
    color: 'red',
    marginTop: '0.5rem',
  },
};

export default DireccionBuscador;
