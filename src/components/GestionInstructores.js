import React, { useState, useMemo } from 'react';
import Instructor from './Instructor';
import NewInstructor from './NewInstructor';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const GestionInstructores = () => {
  const classes = useStyles();

  const [instructores, setInstructores] = useState([
    { documento: '123', nombre: 'Diego Torres', email: 'diego@example.com' },
    { documento: '456', nombre: 'Ana Martínez', email: 'ana@example.com' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showNewInstructorForm, setShowNewInstructorForm] = useState(false);

  const handleNewInstructorClick = () => setShowNewInstructorForm(true);

  const handleSaveNewInstructor = (newInstructor) => {
    setInstructores((prevInstructores) => [...prevInstructores, newInstructor]);
    setShowNewInstructorForm(false);
  };

  const handleCancelNewInstructor = () => setShowNewInstructorForm(false);

  const handleUpdateInstructor = (updatedInstructor) => {
    setInstructores((prevInstructores) =>
      prevInstructores.map((instructor) =>
        instructor.documento === updatedInstructor.documento ? updatedInstructor : instructor
      )
    );
  };

  const filteredInstructores = useMemo(() => {
    return instructores.filter((instructor) =>
      instructor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.documento.includes(searchTerm)
    );
  }, [instructores, searchTerm]);

  return (
    <div className={classes.container}>
      <TextField
        variant="outlined"
        placeholder="Buscar por Documento o Nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={classes.searchField}
      />

      <Button variant="contained" onClick={handleNewInstructorClick} className={classes.newInstructorButton}>
        Nuevo Instructor
      </Button>

      {showNewInstructorForm && (
        <NewInstructor 
          onSave={handleSaveNewInstructor}
          onCancel={handleCancelNewInstructor}
        />
      )}

      <div className={classes.instructorList}>
        {filteredInstructores.map((instructor) => (
          <Instructor
            key={instructor.documento}
            instructor={instructor}
            onUpdate={handleUpdateInstructor}
          />
        ))}
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    width: '100%',
    margin: '0 auto',
  },
  searchField: {
    width: '85%',
    marginBottom: '20px',
  },
  newInstructorButton: {
    backgroundColor: '#5eb219',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
    marginBottom: '20px',
  },
  instructorList: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '10px',
  },
}));

export default GestionInstructores;
