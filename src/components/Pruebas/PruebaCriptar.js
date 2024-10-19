// src/components/PruebaCriptar.js
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { encryptPassword, decryptPassword } from '../../utils/encryption'; 

const PruebaCriptar = () => {
  const classes = useStyles();
  const [inputText, setInputText] = useState(''); 
  const [encryptedText, setEncryptedText] = useState(''); 
  const [decryptedText, setDecryptedText] = useState(''); 
  const [error, setError] = useState(''); 

  const handleEncrypt = () => {
    try {
      const encrypted = encryptPassword(inputText);
      setEncryptedText(encrypted); 
      setDecryptedText(''); 
      setError(''); 
    } catch (err) {
      setError(err.message); 
      console.error("Error de cifrado:", err.message);
    }
  };

  const handleDecrypt = () => {
    try {
      const decrypted = decryptPassword(encryptedText);
      setDecryptedText(decrypted); 
      setError('');
    } catch (err) {
      setError(err.message); 
      console.error("Error de descifrado:", err.message);
    }
  };

  return (
    <div className={classes.container}>
      <h2>Prueba de Cifrado</h2>
      <input
        type="text"
        placeholder="Ingresa el texto a cifrar"
        className={classes.input}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleEncrypt} className={classes.button}>Cifrar</button>
      
      {encryptedText && (
        <>
          <h3>Texto Cifrado:</h3>
          <textarea
            value={encryptedText}
            readOnly
            className={classes.textArea}
          />
          <button onClick={handleDecrypt} className={classes.button}>Desencriptar</button>
        </>
      )}
      
      {decryptedText && (
        <>
          <h3>Texto Desencriptado:</h3>
          <textarea
            value={decryptedText}
            readOnly
            className={classes.textArea}
          />
        </>
      )}

      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  input: {
    marginBottom: "16px",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    fontSize: "16px",
    width: "100%",
    maxWidth: "400px",
  },
  button: {
    backgroundColor: "#5eb219",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "16px",
    '&:hover': {
      backgroundColor: "#4cae14",
    },
  },
  textArea: {
    width: "100%",
    maxWidth: "400px",
    height: "100px",
    marginBottom: "16px",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    fontSize: "16px",
  },
  error: {
    color: 'red', 
  },
}));

export default PruebaCriptar;
