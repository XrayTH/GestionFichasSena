import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';

const FichaBasica = ({ ficha, onUpdate, onDelete, coordinadores = [], programas = [], gestores = [], municipios = [] }) => {
  const classes = useStyles();

  const [isEditable, setIsEditable] = useState(false);
  const [formState, setFormState] = useState(ficha || {});

  const handleEditClick = () => {
    if (isEditable) {
      onUpdate(formState);
    }
    setIsEditable(!isEditable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={classes.container}>
      {/* Fila 1: Código, Coordinador, Gestor, Programa */}
      <div className={classes.row}>
        {/* Código */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Código</label>
          <TextField
            className={classes.textField}
            name="codigo"
            value={formState.codigo || ''}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>

        {/* Coordinador */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Coordinador</label>
          <TextField
            className={classes.textField}
            name="coordinador"
            value={formState.coordinador || ''}
            select
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
          >
            {coordinadores.length > 0 ? (
              coordinadores.map((coordinador) => (
                <MenuItem key={coordinador.id} value={coordinador.nombre}>
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

        {/* Gestor */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Gestor</label>
          <TextField
            className={classes.textField}
            name="gestor"
            value={formState.gestor || ''}
            select
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
          >
            {gestores.length > 0 ? (
              gestores.map((gestor) => (
                <MenuItem key={gestor.id} value={gestor.nombre}>
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

        {/* Programa */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Programa</label>
          <TextField
            className={classes.textField}
            name="programa"
            value={formState.programa || ''}
            select
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
          >
            {programas.length > 0 ? (
              programas.map((programa) => (
                <MenuItem key={programa.id} value={programa.nombre}>
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
      </div>

      {/* Fila 2: Ambiente, Ubicación GPS, Inicio, Fin */}
      <div className={classes.row}>
        {/* Ambiente */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Ambiente</label>
          <TextField
            className={classes.textField}
            name="ambiente"
            value={formState.ambiente || ''}
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
          />
        </div>

        <div className={classes.fieldContainer}>
          <label className={classes.label}>Municipio</label>
          <TextField
            className={classes.textField}
            name="municipio"
            value={formState.municipio || ''}
            select
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
          >
            {municipios.length > 0 ? (
              municipios.map((municipio) => (
                <MenuItem key={municipio} value={municipio}>
                  {municipio}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">
                <em>Error al cargar municipios</em>
              </MenuItem>
            )}
          </TextField>
        </div>

        {/* Ubicación GPS */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Ubicación GPS</label>
          <TextField
            className={classes.textField}
            name="ubicacionGPS"
            value={formState.ubicacionGPS || ''}
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
          />
        </div>

        {/* Inicio */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Inicio</label>
          <TextField
            className={classes.textField}
            name="inicio"
            type="date"
            value={formState.inicio || ''}
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        {/* Fin */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Fin</label>
          <TextField
            className={classes.textField}
            name="fin"
            type="date"
            value={formState.fin || ''}
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>

      {/* Fila 3: Requerimientos */}
      <div className={classes.row}>
        {/* Requerimientos */}
        <div className={classes.fieldContainer}>
          <label className={classes.label}>Requerimientos</label>
          <TextField
            className={classes.textField}
            name="requerimientos"
            value={formState.requerimientos || ''}
            variant="outlined"
            multiline
            rows={4}
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Botones */}
      <div className={classes.buttonRow}>
        <Button className={classes.button} onClick={handleEditClick}>
          {isEditable ? 'Guardar' : 'Editar'}
        </Button>
        <Button className={classes.deleteButton} onClick={() => onDelete(ficha.codigo)}>Borrar</Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridGap: '10px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid black',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    flex: '1 1 150px', // Permite que los campos se redimensionen
    margin: '5px',
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
  deleteButton: {
    backgroundColor: '#b2195e',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#d81b60',
    },
  },
}));

export default FichaBasica;
