import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';

const NewFichaBasica = ({ onSave, onCancel, coordinadores = [], programas = [], gestores = [], municipios = [] }) => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    codigo: '',
    coordinador: '',
    programa: '',
    gestor: '',
    municipio: '',
    ubicacionGPS: '',
    ambiente: '',
    inicio: '',
    fin: '',
    requerimientos: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formState);
    setFormState({
      codigo: '',
      coordinador: '',
      programa: '',
      gestor: '',
      municipio: '',
      ubicacionGPS: '',
      ambiente: '',
      inicio: '',
      fin: '',
      requerimientos: '',
    });
  };

  return (
    <div className={classes.container}>
      {/* Fila 1: Código, Coordinador, Programa, Gestor */}
      <div className={classes.fieldRow}>
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Código</label>
          <TextField
            className={classes.textField}
            name="codigo"
            value={formState.codigo}
            variant="outlined"
            onChange={handleChange}
          />
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Coordinador</label>
          <TextField
            className={classes.textField}
            name="coordinador"
            value={formState.coordinador}
            select
            variant="outlined"
            onChange={handleChange}
          >
            {coordinadores.length > 0 ? (
              coordinadores.map((coordinador) => (
                <MenuItem key={coordinador.nombre} value={coordinador.nombre}>
                  {coordinador.nombre}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">
                <em>No hay coordinadores disponibles</em>
              </MenuItem>
            )}
          </TextField>
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Programa</label>
          <TextField
            className={classes.textField}
            name="programa"
            value={formState.programa}
            select
            variant="outlined"
            onChange={handleChange}
          >
            {programas.length > 0 ? (
              programas.map((programa) => (
                <MenuItem key={programa.nombre} value={programa.nombre}>
                  {programa.nombre}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">
                <em>No hay programas disponibles</em>
              </MenuItem>
            )}
          </TextField>
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Gestor</label>
          <TextField
            className={classes.textField}
            name="gestor"
            value={formState.gestor}
            select
            variant="outlined"
            onChange={handleChange}
          >
            {gestores.length > 0 ? (
              gestores.map((gestor) => (
                <MenuItem key={gestor.nombre} value={gestor.nombre}>
                  {gestor.nombre}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">
                <em>No hay gestores disponibles</em>
              </MenuItem>
            )}
          </TextField>
        </div>
      </div>

      {/* Fila 2: Ambiente, Ubicación GPS, Inicio, Fin */}
      <div className={classes.fieldRow}>
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Ambiente</label>
          <TextField
            className={classes.textField}
            name="ambiente"
            value={formState.ambiente}
            variant="outlined"
            onChange={handleChange}
          />
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Ubicación GPS</label>
          <TextField
            className={classes.textField}
            name="ubicacionGPS"
            value={formState.ubicacionGPS}
            variant="outlined"
            onChange={handleChange}
          />
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Inicio</label>
          <TextField
            className={classes.textField}
            name="inicio"
            type="date"
            value={formState.inicio}
            variant="outlined"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Fin</label>
          <TextField
            className={classes.textField}
            name="fin"
            type="date"
            value={formState.fin}
            variant="outlined"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>

      {/* Fila 3: Requerimientos */}
      <div className={classes.fieldContainer}>
        <label className={classes.label}>Requerimientos</label>
        <TextField
          className={classes.textField}
          name="requerimientos"
          value={formState.requerimientos}
          variant="outlined"
          multiline
          rows={4}
          onChange={handleChange}
        />
      </div>

      {/* Botones */}
      <div className={classes.buttonRow}>
        <Button className={classes.button} onClick={handleSave}>
          Guardar
        </Button>
        <Button className={classes.button} onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '10px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid black',
  },
  fieldRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Ajustado para que los campos tengan un tamaño mínimo
    gridGap: '10px',
    justifyItems: 'center', // Centrar elementos dentro de cada celda
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#5eb219',
    alignSelf: 'center',
    marginBottom: '5px',
  },
  textField: {
    width: '100%',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10px',
    gridColumn: '1 / -1',
  },
  button: {
    backgroundColor: '#5eb219',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
    marginRight: '10px',
  },
}));

export default NewFichaBasica;
