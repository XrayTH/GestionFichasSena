import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, TextareaAutosize, CircularProgress, Snackbar, Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { sendEmail, sendMasiveEmail } from './../service/emailService';
import { getInstructores } from '../service/intructorService';
import { getCoordinadores } from '../service/coordinadorService';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilePresent, PictureAsPdf } from '@mui/icons-material';
import Sidebar from './../components/Sidebar';

const Email = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedValue, setSelectedValue] = useState('');
  const [recipients, setRecipients] = useState('');
  const [options, setOptions] = useState([]);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (location.state?.pdf) {
      const pdfFile = new File([location.state.pdf], 'calendarioPDF.pdf', { type: 'application/pdf' });

      setFiles((prevFiles) => {
        const fileAlreadyExists = prevFiles.some(file => file.name === pdfFile.name);
        if (!fileAlreadyExists) {
          return [...prevFiles, pdfFile];
        }
        return prevFiles;
      });
    }
  }, [location.state]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const instructores = await getInstructores();
        const coordinadores = await getCoordinadores();

        const combinedOptions = [
          ...instructores.map(inst => ({ nombre: inst.nombre, email: inst.email })),
          ...coordinadores.map(coord => ({ nombre: coord.nombre, email: coord.email }))
        ];

        setOptions(combinedOptions);
      } catch (error) {
        console.error("Error al obtener instructores o coordinadores", error);
      }
    };

    fetchOptions();
  }, []);

  const handleAddRecipient = () => {
    if (selectedValue) {
      const recipientList = recipients.split('\n');
      if (!recipientList.includes(selectedValue)) {
        setRecipients((prev) => (prev ? `${prev}\n${selectedValue}` : selectedValue));
      }
      setSelectedValue('');
    }
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setOpenDialog(true);
  };

  const handleDialogAction = (action) => {
    switch (action) {
      case 'abrir':
        window.open(URL.createObjectURL(selectedFile), '_blank');
        break;
      case 'borrar':
        setFiles(files.filter(f => f !== selectedFile));
        break;
      case 'cancelar':
        break;
      default:
        alert("Acción no reconocida.");
        break;
    }
    setOpenDialog(false);
    setSelectedFile(null);
  };

  const handleSendEmail = async () => {
    const emailList = recipients.split('\n').filter(email => email);
    if (!emailList.length || !subject) {
      alert("Por favor, asegúrate de ingresar al menos un destinatario y un asunto.");
      return;
    }

    setLoading(true);

    try {
      await sendEmail(emailList, subject, content, files);
      setSnackMessage('Correo enviado exitosamente');
      setLoading(false);
      setRecipients('');
      setSubject('');
      setContent('');
      setFiles([]);
    } catch (error) {
      console.error('Error al enviar el correo', error);
      setSnackMessage('Hubo un error al enviar el correo.');
      setLoading(false);
    }
  };

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

  const handleSendMasiveEmail = async () => {
    const confirmacion = window.confirm("Esta opción enviará a cada instructor por correo la programación que le corresponde del presente mes. ¿Está seguro de hacerlo?");

    if (!confirmacion) {
      return;
    }

    setLoading(true);
    try {
      const respuesta = await sendMasiveEmail();

      if (respuesta.success) {
        console.log("Proceso de envío de correos completado");

        if (respuesta.enviados.length > 0) {
          console.log("Correos enviados:", respuesta.enviados);
        }

        if (respuesta.noEnviados.length > 0) {
          console.log("Correos no enviados:", respuesta.noEnviados);
        }

        setSnackMessage('Correos enviados exitosamente');
      } else {
        console.error("Error en el proceso de envío:", respuesta.message);
        setSnackMessage('Hubo un error al enviar los correos.');
      }
    } catch (error) {
      console.error("Error al enviar los correos:", error);
      setSnackMessage('Hubo un error al enviar los correos.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveRecipient = (email) => {
    const confirmDelete = window.confirm(`¿Quieres borrar el correo ${email} de la lista?`);
    if (confirmDelete) {
      setRecipients((prev) => prev.split('\n').filter((item) => item !== email).join('\n'));
    }
  };  

  const handleRegresar = () => {
    navigate(-1);
  };

  return (
    <>
      <Sidebar />
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <div className={classes.leftSection}>
          <Button 
              onClick={handleRegresar} 
              sx={{
                backgroundColor: '#f44336',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '4px',
                marginTop: '10px',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Volver
            </Button>            
            <br />
            <label className={classes.label}>Asunto:</label>
            <br />
            <TextField
              variant="outlined"
              className={classes.textField}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <br />

            <label className={classes.label}>Contenido:</label>
            <TextareaAutosize
              className={classes.textAreaEditable}
              minRows={6}
              maxRows={6}
              placeholder="Escribe el contenido aquí"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className={classes.imageListWrapper}>
              <div className={classes.imageListContainer}>
                {files.map((file, index) => (
                  <div key={index} className={classes.imageItem} onClick={() => handleFileClick(file)}>
                    {getFileIcon(file.name)}
                    <span className={classes.imageName}>{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              id="file-upload"
              className={classes.fileInput}
            />
          </div>

          <div className={classes.rightSection}>
            <label className={classes.label}>Enviar a:</label>
            <div className={classes.dropdownWrapper}>
              <Autocomplete
                className={classes.dropdown}
                disablePortal
                options={options}
                getOptionLabel={(option) => option.nombre}
                value={options.find(option => option.email === selectedValue) || null}
                onChange={(e, newValue) => setSelectedValue(newValue?.email || '')}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" className={classes.dropdown} />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.email}>
                    {option.nombre}
                  </li>
                )}
              />
              <Button sx={{
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
                }} 
                onClick={handleAddRecipient}>
                +
               </Button>
            </div>

            <div className={classes.recipientsList}>
              {recipients.trim() === '' ? (
                <div className={classes.emptyMessage}>
                  Los correos se añadirán aquí
                </div>
              ) : (
                recipients.split('\n').map((email, index) => (
                  <div
                    key={index}
                    className={classes.recipientItem}
                    onClick={() => handleRemoveRecipient(email)}
                  >
                    {email}
                  </div>
                ))
              )}
            </div>

            <div className={classes.sendButtonWrapper}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: '#7614ae',
                  '&:hover': {
                    backgroundColor: '#4cae14',
                  },
                  color: '#fff',
                  padding: '10px',
                }}
                onClick={handleSendEmail}
              >
                Enviar Este Correo
              </Button>

              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: '#7614ae',
                  '&:hover': {
                    backgroundColor: '#4cae14',
                  },
                  color: '#fff',
                  padding: '10px',
                }}                
                onClick={handleSendMasiveEmail}
                disabled={loading}
              >
                Enviar Correo Masivo
              </Button>
            </div>

            {loading && (
              <div className={classes.loadingSpinner}>
                <CircularProgress sx={{
                  color: "#5eb219",
                }} />
              </div>
            )}
          </div>
        </div>

        <Snackbar
          open={Boolean(snackMessage)}
          autoHideDuration={6000}
          onClose={() => setSnackMessage('')}
          message={snackMessage}
        />

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Archivo seleccionado</DialogTitle>
          <DialogContent>
            <p>¿Qué te gustaría hacer con este archivo?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDialogAction('abrir')} color="primary">Abrir</Button>
            <Button onClick={() => handleDialogAction('borrar')} color="secondary">Borrar</Button>
            <Button onClick={() => handleDialogAction('cancelar')} color="default">Cancelar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

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
  recipientItem: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '8px',
    cursor: 'pointer',
    backgroundColor: '#f5f5f5',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
  },
  recipientsList: {
    maxHeight: '150px',
    overflowY: 'auto',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
  },  
  imageListWrapper: {
    display: 'flex',
    alignItems: 'center',
    overflowX: 'auto',
    marginBottom: '20px',
    border: '1px solid #5eb219',
    padding: '10px',
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
    color: "green"
  },
  sendButtonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px', 
  },
  fileInput: {
    padding: '10px',
    backgroundColor: '#5eb219',
    color: '#fff',
    border: '1px solid #5eb219',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%',
    display: 'block',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#4cae14',
    },
  },
  inputFileWrapper: {
    marginBottom: '20px',
  },
}));

export default Email;
