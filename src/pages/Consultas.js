import Calendario from './../components/Calendario';
import PanelGestion from './../components/PanelGestion';
import { makeStyles } from '@mui/styles';
import { FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material';
import { useState } from 'react';

const Consultas = () => {
  const classes = useStyles();

  const [selectedFilter1, setSelectedFilter1] = useState('');
  const [filter2Options, setFilter2Options] = useState([]);

  const [fichas, setFichas] = useState([
    { id: 1, coordinador: 'Juan Perez', gestor: 'Diego Torres', programa: 'Programación', ambiente: 'Laboratorio 101', inicio: '2024-10-01', fin: '2024-12-15', requerimientos: 'Proyector, PC con software especializado' },
    { id: 2, coordinador: 'Maria Gómez', gestor: 'Ana Martínez', programa: 'Diseño Gráfico', ambiente: 'Laboratorio 202', inicio: '2024-09-01', fin: '2024-11-30', requerimientos: 'Mesa de trabajo, iMac' },
    { id: 3, coordinador: 'Carlos Rodriguez', gestor: 'Luis Fernández', programa: 'Redes', ambiente: 'Laboratorio 303', inicio: '2024-08-15', fin: '2024-12-01', requerimientos: 'Router, Switch' },
    { id: 4, coordinador: 'Lucía López', gestor: 'Diego Torres', programa: 'Marketing', ambiente: 'Laboratorio 404', inicio: '2024-09-15', fin: '2024-12-01', requerimientos: 'Proyector, Computadora' },
  ]);

  const [Instructores, setInstructores] = useState([
    { Documento: "123456789", Nombre: "Diego Torres", Email: "diego.torres@email.com" },
    { Documento: "987654321", Nombre: "Ana Martínez", Email: "ana.martinez@email.com" },
    { Documento: "456789123", Nombre: "Luis Fernández", Email: "luis.fernandez@email.com" }
  ]);

  const [coordinadores, setCoordinadores] = useState([
    { Documento: "321654987", Nombre: "Carlos Mendoza", Email: "carlos.mendoza@email.com" },
    { Documento: "654987321", Nombre: "Lucía Gómez", Email: "lucia.gomez@email.com" },
    { Documento: "987321654", Nombre: "Roberto Salinas", Email: "roberto.salinas@email.com" }
  ]);

  const programas = [
    "Ingeniería de Sistemas",
    "Administración de Empresas",
    "Derecho",
    "Medicina",
    "Arquitectura",
    "Psicología",
    "Contaduría Pública",
    "Comunicación Social",
    "Ingeniería Industrial",
    "Diseño Gráfico",
    "Economía",
    "Ciencias Políticas",
    "Ingeniería Civil",
    "Trabajo Social",
    "Marketing",
    "Relaciones Internacionales",
    "Educación",
    "Biología",
    "Química",
    "Filosofía"
  ];

  const handleFilter1Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter1(selectedValue);

    switch (selectedValue) {
      case 'Ficha':
        setFilter2Options(fichas.map(ficha => ficha.id)); 
        break;
      case 'Instructor':
        setFilter2Options(Instructores.map(inst => inst.Nombre)); 
        break;
      case 'Coordinador':
        setFilter2Options(coordinadores.map(coord => coord.Nombre)); 
        break;
      case 'Gestor':
        setFilter2Options(Instructores.map(inst => inst.Nombre)); 
        break;
      case 'Programa':
        setFilter2Options(programas); 
        break;
      default:
        setFilter2Options([]);
        break;
    }
  };

  return (
    <div className={classes.root}>
      <Box className={classes.panel}>
        <PanelGestion />
        <div className={classes.filtros}>
          <label className={classes.label}>Filtrar por:</label>
          <FormControl fullWidth className={classes.dropdown}>
            <InputLabel id="filter1-label">Tabla</InputLabel>
            <Select
              labelId="filter1-label"
              value={selectedFilter1}
              onChange={handleFilter1Change} 
            >
              <MenuItem value="Ficha">Ficha</MenuItem>
              <MenuItem value="Instructor">Instructor</MenuItem>
              <MenuItem value="Coordinador">Coordinador</MenuItem>
              <MenuItem value="Gestor">Gestor</MenuItem>
              <MenuItem value="Programa">Programa</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className={classes.dropdown}>
            <InputLabel id="filter2-label">Elemento</InputLabel>
            <Select labelId="filter2-label">
              {filter2Options.map((option, index) => (
                <MenuItem key={index} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Box>

      <div className={classes.content}>
        <Calendario />
      </div>

      <Button variant="contained" className={classes.enviarButton}>
        Enviar por correo
      </Button>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center',
    position: 'relative',
  },
  panel: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    padding: '20px',
    gap: '20px',
    alignItems: 'center',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  },
  filtros: {
    flex: '1 1 60%',
    backgroundColor: '#f0f0f0',
    padding: '15px',
    borderRadius: '8px',
  },
  label: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  dropdown: {
    marginTop: '10px',
  },
  content: {
    flex: '1 1 40%',
    minWidth: '80%',
  },
  enviarButton: {
    margin: '20px',
  },
});

export default Consultas;



