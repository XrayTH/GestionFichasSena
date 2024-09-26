import React from 'react';
import { makeStyles } from '@mui/styles';

const ImageList = () => {
  const classes = useStyles();

  return (
    <div className={classes.imageListContainer}>
      {/* Aquí irán las imágenes */}
    </div>
  );
};

// Estilos para el ImageList
const useStyles = makeStyles(() => ({
  imageListContainer: {
    display: 'flex',
    overflowX: 'auto',
    height: '80px',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px',
    width: '100%',
  },
  imageItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '10px',
  },
  image: {
    width: '50px',
    height: '50px',
    marginBottom: '5px',
  },
  imageName: {
    fontSize: '12px',
    textAlign: 'center',
  },
}));

export default ImageList;
