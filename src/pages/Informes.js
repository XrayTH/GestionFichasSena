import React, { useState, useEffect } from 'react';
import { getFichas } from '../service/fichaService';
import { getJornadas } from '../service/jornadaService';
import { getInstructores } from './../service/intructorService';
import { getAllAsignaciones } from './../service/asignacionService';
import { getCoordinadores } from './../service/coordinadorService';
import { obtenerAmbientes } from './../service/ambienteService';
import { obtenerProgramas } from './../service/programaService';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

const Informes = () => {
  const [filtros, setFiltros] = useState([]);
  const [filtrosEstadisticos, setFiltrosEstadisticos] = useState([]);
  const [opcionesFiltro, setOpcionesFiltro] = useState({
    ficha: [],
    instructor: [],
    coordinador: [],
    gestor: [],
    programa: [],
    jornadas: [],
    dia: [],
    ambiente: []
  });
  const [asignaciones, setAsignaciones] = useState([]);
  const [fichas, setFichas] = useState([]);
  const [asignacionesFiltradas, setAsignacionesFiltradas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [fichasData, jornadas, instructores, coordinadores, ambientes, programas, asignaciones] = await Promise.all([
        getFichas(),
        getJornadas(),
        getInstructores(),
        getCoordinadores(),
        obtenerAmbientes(),
        obtenerProgramas(),
        getAllAsignaciones()
      ]);

      setOpcionesFiltro({
        ficha: fichasData,
        instructor: instructores,
        coordinador: coordinadores,
        gestor: instructores,
        programa: programas,
        jornada: jornadas,
        dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'], 
        ambiente: ambientes
      });

      setAsignaciones(asignaciones);
      setFichas(fichasData);

      formatearAsignaciones(asignaciones, fichasData);
    };

    fetchData();
  }, []);

  const formatearAsignaciones = (asignaciones, fichas) => {
    const datosFiltrados = asignaciones.map(asignacion => {
      const ficha = fichas.find(f => f.codigo === asignacion.ficha);
      return {
        'Ficha': asignacion.ficha,
        'Coordinador': ficha ? ficha.coordinador : 'N/A',
        'Programa': ficha ? ficha.programa : 'N/A',
        'Gestor': ficha ? ficha.gestor : 'N/A',
        'Ambiente': ficha ? ficha.ambiente : 'N/A',
        'Instructor': asignacion.instructor,
        'Jornada': asignacion.jornada,
        'Dia': asignacion.dia,
        'Fecha Inicio': asignacion.inicio,
        'Fecha Fin': asignacion.fin
      };
    });

    setAsignacionesFiltradas(datosFiltrados);
  };

  const addFiltro = () => {
    setFiltros([...filtros, { campo: '', valor: '' }]);
  };

  const addFiltroEstadistico = () => {
    setFiltrosEstadisticos([...filtrosEstadisticos, { campo: '', valor: '' }]);
  };

  const handleFiltroChange = (index, key, value) => {
    const updatedFiltros = [...filtros];
    updatedFiltros[index][key] = value;
    setFiltros(updatedFiltros);
    filtrarAsignaciones(updatedFiltros); 
  };

  const handleFiltroEstadisticoChange = (index, key, value) => {
    const updatedFiltrosEstadisticos = [...filtrosEstadisticos];
    updatedFiltrosEstadisticos[index][key] = value;
    setFiltrosEstadisticos(updatedFiltrosEstadisticos);
  };

  const removeFiltro = (index) => {
    const updatedFiltros = filtros.filter((_, i) => i !== index);
    setFiltros(updatedFiltros);
    filtrarAsignaciones(updatedFiltros);
  };

  const removeFiltroEstadistico = (index) => {
    const updatedFiltrosEstadisticos = filtrosEstadisticos.filter((_, i) => i !== index);
    setFiltrosEstadisticos(updatedFiltrosEstadisticos);
  };

  const filtrarAsignaciones = (filtros) => {
    const filtered = asignaciones.filter(asignacion => {
      return filtros.every(filtro => {
        if (!filtro.campo || !filtro.valor) return true;
        
        const filtroValor = String(filtro.valor).toLowerCase();
  
        if (['ficha', 'dia', 'jornada', 'instructor', 'inicio', 'fin'].includes(filtro.campo)) {
          const asignacionCampoValor = String(asignacion[filtro.campo]).toLowerCase();
          return asignacionCampoValor === filtroValor;
        }
        
        const ficha = fichas.find(f => f.codigo === asignacion.ficha);
  
        if (filtro.campo === 'programa' && ficha) {
          return String(ficha.programa).toLowerCase() === filtroValor;
        }
  
        if (filtro.campo === 'coordinador' && ficha) {
          return String(ficha.coordinador).toLowerCase() === filtroValor;
        }
  
        if (filtro.campo === 'gestor' && ficha) {
          return String(ficha.gestor).toLowerCase() === filtroValor;
        }
  
        if (filtro.campo === 'ambiente' && ficha) {
          return String(ficha.ambiente).toLowerCase() === filtroValor;
        }
  
        return false;
      });
    });
  
    const datosFiltrados = filtered.map(asignacion => {
      const ficha = fichas.find(f => f.codigo === asignacion.ficha); 
      return {
        'Ficha': asignacion.ficha,
        'Coordinador': ficha ? ficha.coordinador : 'N/A',
        'Programa': ficha ? ficha.programa : 'N/A',
        'Gestor': ficha ? ficha.gestor : 'N/A',
        'Ambiente': ficha ? ficha.ambiente : 'N/A',
        'Instructor': asignacion.instructor,
        'Jornada': asignacion.jornada,
        'Dia': asignacion.dia,
        'Fecha Inicio': asignacion.inicio,
        'Fecha Fin': asignacion.fin
      };
    });
  
    setAsignacionesFiltradas(datosFiltrados);
  };

  const contarOcurrencias = (campo, valor) => {
    if (!campo || !valor) return 0;

    const capitalizeCampo = campo.charAt(0).toUpperCase() + campo.slice(1);   

    return asignacionesFiltradas.filter(asignacion => {
      const valorCampo = String(asignacion[capitalizeCampo]).toLowerCase();
      return valorCampo === String(valor).toLowerCase();
    }).length;
  };

  const generarResumenEstadistico = () => {
    const resumen = {};

    resumen['Total de asignaciones filtradas'] = asignacionesFiltradas.length;

    filtrosEstadisticos.forEach(filtro => {
        if (filtro.campo && filtro.valor) {
            const count = contarOcurrencias(filtro.campo, filtro.valor);
            resumen[`${filtro.campo.charAt(0).toUpperCase() + filtro.campo.slice(1)}: ${filtro.valor}`] = count;
        }
    });

    return resumen;
};

  const generarExcel = () => {
    const ws1 = XLSX.utils.json_to_sheet(asignacionesFiltradas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, 'Asignaciones');

    const resumenEstadistico = generarResumenEstadistico();
    const ws2 = XLSX.utils.json_to_sheet([resumenEstadistico]);
    XLSX.utils.book_append_sheet(wb, ws2, 'Resumen Estadístico');

    XLSX.writeFile(wb, 'Informe_Asignaciones.xlsx');
  };

  const generarPDF = () => {
    const doc = new jsPDF('landscape');
    const margin = 10; 
    const lineHeight = 20; 
    const startX = margin; 
    let yPosition = margin; 

    doc.setFontSize(16);
    doc.text('Informe de Asignaciones', startX, yPosition);
    yPosition += lineHeight * 2; 

    doc.setFontSize(12);
    const resumenEstadistico = generarResumenEstadistico();

    Object.entries(resumenEstadistico).forEach(([key, value]) => {
        doc.text(`${key}: ${value}`, startX, yPosition);
        yPosition += lineHeight; 
    });

    const headers = ['Ficha', 'Coordinador', 'Programa', 'Gestor', 'Ambiente', 'Instructor', 'Jornada', 'Dia', 'Fecha Inicio', 'Fecha Fin'];
    const headerYPosition = yPosition + 10; 

    headers.forEach((header, index) => {
        doc.text(header, startX + index * 29, headerYPosition); 
    });

    yPosition = headerYPosition + lineHeight; 

    const maxLength = 10; 
    const pageHeight = doc.internal.pageSize.height; 

    asignacionesFiltradas.forEach(asignacion => {
        const rowData = [
            asignacion.Ficha ?? '', 
            asignacion.Coordinador ?? '',
            asignacion.Programa ?? '',
            asignacion.Gestor ?? '',
            asignacion.Ambiente ?? '',
            asignacion.Instructor ?? '',
            asignacion.Jornada ?? '',
            asignacion.Dia ?? '',
            asignacion['Fecha Inicio'] ?? '',
            asignacion['Fecha Fin'] ?? ''
        ];

        rowData.forEach((data, index) => {
            const truncatedData = String(data).length > maxLength 
                ? String(data).substring(0, maxLength) + '...' 
                : String(data);
            doc.text(truncatedData, startX + index * 29, yPosition); 
        });

        yPosition += lineHeight; 
        if (yPosition + lineHeight > pageHeight - margin) {
            doc.addPage();
            yPosition = margin; 
        }
    });

    doc.save('Informe_Asignaciones.pdf');
};

  return (
    <div>
      <h2>Generar Informe</h2>

      <button onClick={addFiltro}>Añadir Filtro</button>
      <button onClick={generarExcel}>Generar Excel</button>
      <button onClick={generarPDF}>Generar PDF</button>

      {filtros.map((filtro, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={filtro.campo}
            onChange={(e) => handleFiltroChange(index, 'campo', e.target.value)}
          >
            <option value="">Seleccione Campo</option>
            {Object.keys(opcionesFiltro).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={filtro.valor}
            onChange={(e) => handleFiltroChange(index, 'valor', e.target.value)}
          >
            <option value="">Seleccione Valor</option>
            {filtro.campo &&
              opcionesFiltro[filtro.campo].map((opcion, i) => (
                <option key={i} value={opcion.nombre || opcion.codigo || opcion}>
                  {opcion.nombre || opcion.codigo || opcion}
                </option>
              ))}
          </select>

          <button onClick={() => removeFiltro(index)}>Eliminar</button>
        </div>
      ))}

      <h2>Filtros Estadísticos</h2>

      <button onClick={addFiltroEstadistico}>Añadir Filtro Estadístico</button>

      {filtrosEstadisticos.map((filtroEstadistico, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={filtroEstadistico.campo}
            onChange={(e) => handleFiltroEstadisticoChange(index, 'campo', e.target.value)}
          >
            <option value="">Seleccione Campo</option>
            {Object.keys(opcionesFiltro).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={filtroEstadistico.valor}
            onChange={(e) => handleFiltroEstadisticoChange(index, 'valor', e.target.value)}
          >
            <option value="">Seleccione Valor</option>
            {filtroEstadistico.campo &&
              opcionesFiltro[filtroEstadistico.campo].map((opcion, i) => (
                <option key={i} value={opcion.nombre || opcion.codigo || opcion}>
                  {opcion.nombre || opcion.codigo || opcion}
                </option>
              ))}
          </select>

          <button onClick={() => removeFiltroEstadistico(index)}>Eliminar</button>
          <span>
            Ocurrencias: {contarOcurrencias(filtroEstadistico.campo, filtroEstadistico.valor)}
          </span>
        </div>
      ))}

      <h3>Resumen Estadístico</h3>
      <ul>
        {Object.keys(generarResumenEstadistico()).length > 0 ? (
          Object.entries(generarResumenEstadistico()).map(([key, value], index) => (
            <li key={index}>{key}: {value}</li>
          ))
        ) : (
          <li>No hay estadísticas disponibles</li>
        )}
      </ul>

      <h3>Previsualización de Datos Filtrados</h3>
      {asignacionesFiltradas.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              {Object.keys(asignacionesFiltradas[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {asignacionesFiltradas.map((fila, index) => (
              <tr key={index}>
                {Object.values(fila).map((valor, i) => (
                  <td key={i}>{valor}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay datos para mostrar</p>
      )}
    </div>
  );
};

export default Informes;
