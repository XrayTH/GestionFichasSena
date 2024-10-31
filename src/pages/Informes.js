import React, { useState, useEffect } from 'react';
import { getFichas } from '../service/fichaService';
import { getJornadas } from '../service/jornadaService';
import { getInstructores } from './../service/intructorService';
import { getAllAsignaciones } from './../service/asignacionService';
import { getCoordinadores } from './../service/coordinadorService';
import { obtenerAmbientes } from './../service/ambienteService';
import { obtenerProgramas } from './../service/programaService';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel, Button, Typography, List, ListItem, ListItemText, Autocomplete, TextField } from '@mui/material';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import Sidebar from './../components/Sidebar';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      setLoading(false);
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
  <>
    <Sidebar/>
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" style={{ color: '#468513', margin: '20px 0' }}>Generar Informe</Typography>

      <Button variant="contained" style={{ backgroundColor: '#2119b2', color: 'white', margin: '5px' }} onClick={addFiltro}>
        Añadir Filtro
      </Button>
      <Button variant="contained" style={{ backgroundColor: '#5eb219', color: 'white', margin: '5px' }} onClick={generarExcel}>
        Generar Excel
      </Button>
      <Button variant="contained" style={{ backgroundColor: '#b2195e', color: 'white', margin: '5px' }} onClick={generarPDF}>
        Generar PDF
      </Button>

      {filtros.map((filtro, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FormControl fullWidth>
            <InputLabel>Seleccione Campo</InputLabel>
            <Select
              value={filtro.campo}
              onChange={(e) => handleFiltroChange(index, 'campo', e.target.value)}
              label="Seleccione Campo"
            >
              <MenuItem value=""><em>Seleccione Campo</em></MenuItem>
              {Object.keys(opcionesFiltro).map((key) => (
                <MenuItem key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Autocomplete
              options={filtro.campo ? opcionesFiltro[filtro.campo] : []}
              getOptionLabel={(option) => option.nombre || option.codigo || option}
              onChange={(event, newValue) => handleFiltroChange(index, 'valor', newValue ? (newValue.nombre || newValue.codigo) : '')}
              renderInput={(params) => <TextField {...params} label="Seleccione Valor" />}
              value={filtro.valor ? opcionesFiltro[filtro.campo]?.find(opcion => opcion.nombre === filtro.valor || opcion.codigo === filtro.valor) || null : null}
            />
          </FormControl>

          <Button variant="contained" style={{ backgroundColor: '#6d19b2', color: 'white', margin: '5px' }} onClick={() => removeFiltro(index)}>
            Eliminar
          </Button>
        </div>
      ))}

      <Typography variant="h4" style={{ color: '#468513', margin: '20px 0' }}>Filtros Estadísticos</Typography>

      <Button variant="contained" style={{ backgroundColor: '#2119b2', color: 'white', margin: '5px' }} onClick={addFiltroEstadistico}>
        Añadir Filtro Estadístico
      </Button>

      {filtrosEstadisticos.map((filtroEstadistico, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FormControl fullWidth>
            <InputLabel>Seleccione Campo</InputLabel>
            <Select
              value={filtroEstadistico.campo}
              onChange={(e) => handleFiltroEstadisticoChange(index, 'campo', e.target.value)}
              label="Seleccione Campo"
            >
              <MenuItem value=""><em>Seleccione Campo</em></MenuItem>
              {Object.keys(opcionesFiltro).map((key) => (
                <MenuItem key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Autocomplete
              options={filtroEstadistico.campo ? opcionesFiltro[filtroEstadistico.campo] : []}
              getOptionLabel={(option) => option.nombre || option.codigo || option}
              onChange={(event, newValue) => handleFiltroEstadisticoChange(index, 'valor', newValue ? (newValue.nombre || newValue.codigo) : '')}
              renderInput={(params) => <TextField {...params} label="Seleccione Valor" />}
              value={filtroEstadistico.valor ? opcionesFiltro[filtroEstadistico.campo]?.find(opcion => opcion.nombre === filtroEstadistico.valor || opcion.codigo === filtroEstadistico.valor) || null : null}
            />
          </FormControl>

          <Button variant="contained" style={{ backgroundColor: '#6d19b2', color: 'white', margin: '5px' }} onClick={() => removeFiltroEstadistico(index)}>
            Eliminar
          </Button>
        </div>
      ))}

    <Typography variant="h5" style={{ color: '#468513', margin: '20px 0' }}>Resumen Estadístico</Typography>
        <List>
          {Object.keys(generarResumenEstadistico()).length > 0 ? (
            Object.entries(generarResumenEstadistico()).map(([key, value], index) => (
              <ListItem key={index}>
                <ListItemText primary={`${key}: ${value}`} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No hay estadísticas disponibles" />
            </ListItem>
          )}
        </List>
      
        <Typography variant="h3" style={{ color: '#468513', margin: '20px 0' }}>Previsualización de Datos Filtrados</Typography>
          {loading ? ( 
              <CircularProgress />
          ) : (
              <>
                  <TableContainer component={Paper}>
                      <Table>
                          <TableHead>
                              {asignacionesFiltradas.length > 0 && (
                                  <TableRow>
                                      {Object.keys(asignacionesFiltradas[0]).map((header, index) => (
                                          <TableCell key={index} style={{ backgroundColor: '#5eb219', color: 'white', fontWeight: 'bold', border: '1px solid #3b6f10' }}>
                                              {header}
                                          </TableCell>
                                      ))}
                                  </TableRow>
                              )}
                          </TableHead>
                          <TableBody>
                              {asignacionesFiltradas.length > 0 ? (
                                  asignacionesFiltradas.map((fila, index) => (
                                      <TableRow key={index}>
                                          {Object.values(fila).map((valor, i) => (
                                              <TableCell key={i} style={{ backgroundColor: 'rgba(131,227,53,0.5)', padding: '10px', border: '1px solid #5eb219' }}>
                                                  {valor}
                                              </TableCell>
                                          ))}
                                      </TableRow>
                                  ))
                              ) : (
                                  <TableRow>
                                      <TableCell colSpan={10} style={{ textAlign: 'center' }}>No hay datos filtrados para mostrar.</TableCell>
                                  </TableRow>
                              )}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </>
          )}
    </div>
  </>
);
};

export default Informes;
