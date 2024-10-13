import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, TextareaAutosize, MenuItem, Select, CircularProgress, Snackbar } from '@mui/material';
import { sendEmail } from './../service/emailService';
import { getInstructores } from '../service/intructorService';
import { getCoordinadores } from '../service/coordinadorService';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilePresent, PictureAsPdf } from '@mui/icons-material';  // Importa íconos de archivos
import Sidebar from './../components/Sidebar';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px', 
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '1000px',
    flexWrap: 'wrap', 
  },
  leftSection: {
    flex: 1,
    marginRight: '20px',
    marginBottom: '20px',
  },
  rightSection: {
    flex: 1,
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#5eb219',
  },
  textField: {
    marginBottom: '20px',
    borderColor: '#5eb219',
    width: "100%",
  },
  textAreaEditable: {
    borderRadius: '4px',
    padding: '10px',
    border: '1px solid #5eb219',
    marginBottom: '20px',
    resize: 'none',
    fontSize: '16px',
    width: '95%',
  },
  textAreaReadOnly: {
    borderRadius: '4px',
    padding: '10px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    backgroundColor: '#e8f5e9',
    resize: 'none',
    fontSize: '16px',
  },
  imageListWrapper: {
    display: 'flex',
    alignItems: 'center',
    overflowX: 'auto',
    marginBottom: '20px',
    border: '1px solid #5eb219',
    padding: '10px',
  },
  addButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#5eb219',
    color: '#fff',
    fontSize: '24px',
    minWidth: 'unset',
    marginRight: '10px',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
  },
  dropdownWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  dropdown: {
    flexGrow: 1,
    borderColor: '#5eb219',
    marginRight: '10px',
  },
  sendButton: {
    backgroundColor: '#7614ae',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
    color: '#fff',
    padding: '10px',
  },
  imageListContainer: {
    display: 'flex',
    overflowX: 'auto',
    height: '80px',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px',
    width: '100%',
    marginRight: '10px',
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
  loadingSpinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
}));

const Email = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedValue, setSelectedValue] = useState('');
  const [recipients, setRecipients] = useState('');
  const [options, setOptions] = useState([]);  // Almacena instructores y coordinadores
  const [subject, setSubject] = useState('');  // Almacenar el asunto del correo
  const [content, setContent] = useState('');  // Almacenar el contenido del correo
  const [files, setFiles] = useState([]);      // Almacenar los archivos adjuntos
  const [loading, setLoading] = useState(false); // Estado para la carga
  const [snackMessage, setSnackMessage] = useState(''); // Mensaje de éxito o error

  // Cargar instructores y coordinadores al montar el componente
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const instructores = await getInstructores();
        const coordinadores = await getCoordinadores();

        // Combina ambas listas y formatea los datos
        const combinedOptions = [
          ...instructores.map(inst => ({ nombre: inst.nombre, email: inst.email })),
          ...coordinadores.map(coord => ({ nombre: coord.nombre, email: coord.email }))
        ];

        setOptions(combinedOptions); // Almacena en el estado
      } catch (error) {
        console.error("Error al obtener instructores o coordinadores", error);
      }
    };

    fetchOptions();
  }, []);

  // Manejo para agregar un destinatario
  const handleAddRecipient = () => {
    if (selectedValue) {
      const recipientList = recipients.split('\n');
      if (!recipientList.includes(selectedValue)) {
        setRecipients((prev) => (prev ? `${prev}\n${selectedValue}` : selectedValue));
      }
      setSelectedValue('');
    }
  };

  // Manejo de los archivos seleccionados
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);  // Almacena los archivos seleccionados en el estado
  };

  // Enviar el correo
  const handleSendEmail = async () => {
    const emailList = recipients.split('\n').filter(email => email);  // Convierte en array de correos válidos
    if (!emailList.length || !subject) {
      alert("Por favor, asegúrate de ingresar al menos un destinatario y un asunto.");
      return;
    }

    setLoading(true); // Mostrar el spinner de carga

    try {
      // Llamada a la función sendEmail
      await sendEmail(emailList, subject, content, files);
      setSnackMessage('Correo enviado exitosamente');
      setLoading(false); // Ocultar el spinner
      // Resetear formulario después de enviar
      setRecipients('');
      setSubject('');
      setContent('');
      setFiles([]);
    } catch (error) {
      console.error('Error al enviar el correo', error);
      setSnackMessage('Hubo un error al enviar el correo.');
      setLoading(false); // Ocultar el spinner
    }
  };

  // Función para obtener el ícono según el tipo de archivo
  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop();
    switch (ext) {
      case 'pdf':
        return <PictureAsPdf />;
      case 'xls':
      case 'xlsx':
        return <FilePresent />;
      default:
        return <FilePresent />;
    }
  };

  return (
    <>
    <Sidebar/>
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.leftSection}>
          <label className={classes.label}>Asunto:</label>
          <br />
          <TextField
            variant="outlined"
            className={classes.textField}
            value={subject}  // Maneja el estado de asunto
            onChange={(e) => setSubject(e.target.value)}  // Actualiza el asunto en el estado
          />
          <br />

          <label className={classes.label}>Contenido:</label>
          <TextareaAutosize
            className={classes.textAreaEditable}
            minRows={6}
            maxRows={6}
            placeholder="Escribe el contenido aquí"
            value={content}  // Maneja el estado del contenido
            onChange={(e) => setContent(e.target.value)}  // Actualiza el contenido en el estado
          />

          <div className={classes.imageListWrapper}>
            <div className={classes.imageListContainer}>
              {files.map((file, index) => (
                <div key={index} className={classes.imageItem}>
                  {getFileIcon(file.name)} {/* Icono según el tipo de archivo */}
                  <span className={classes.imageName}>{file.name}</span>
                </div>
              ))}
            </div>
            
          </div>
          <input
              type="file"
              multiple
              onChange={handleFileChange}  // Manejador de archivos adjuntos
              id="file-upload"
            />
        </div>

        <div className={classes.rightSection}>
          <label className={classes.label}>Enviar a:</label>
          <div className={classes.dropdownWrapper}>
            <Select
              variant="outlined"
              className={classes.dropdown}
              displayEmpty
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}  // Aquí se almacena el email
            >
              <MenuItem value="">
                <em>Seleccionar destinatario</em>
              </MenuItem>
              {options.map((option, index) => (
                <MenuItem key={index} value={option.email}>
                  {option.nombre}  {/* Muestra el nombre, guarda el email */}
                </MenuItem>
              ))}
            </Select>
            <Button className={classes.addButton} onClick={handleAddRecipient}>+</Button>
          </div>

          <TextareaAutosize
            className={classes.textAreaReadOnly}
            minRows={6}
            maxRows={6}
            placeholder="Correos"
            value={recipients}
            disabled
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.sendButton}
            onClick={handleSendEmail}  
          >
            Enviar Este Correo
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            className={classes.sendButton}
            onClick={handleSendEmail}  
          >
            Enviar Correo Masivo
          </Button>

          {loading && (
            <div className={classes.loadingSpinner}>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>

      <Snackbar
        open={Boolean(snackMessage)}
        autoHideDuration={6000}
        message={snackMessage}
      />
    </div>
    </>
  );
};

export default Email;
