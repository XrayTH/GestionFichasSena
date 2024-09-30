import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid2, Typography, TextField } from '@mui/material';

const PreViewFicha = ({ ficha, inDay, selectedDay }) => {  
    const classes = useStyles();

    // Determina el color del borde según inDay
    const borderColor = inDay ? '#195eb2' : '#b2195e';

    return (
        <div className={classes.container} style={{ border: `2px solid ${borderColor}` }}> {/* Estilo inline para el borde */}
            <div className={classes.header}>
                <Grid2 container spacing={2}>
                    <Grid2 item xs={12} sm={6} md={3}>
                        <Typography className={classes.label}>ID</Typography>
                        <TextField value={ficha.id} variant="outlined" fullWidth disabled />
                    </Grid2>
                    <Grid2 item xs={12} sm={6} md={3}>
                        <Typography className={classes.label}>Coordinador</Typography>
                        <TextField value={ficha.coordinador} variant="outlined" fullWidth disabled />
                    </Grid2>
                    <Grid2 item xs={12} sm={6} md={3}>
                        <Typography className={classes.label}>Gestor</Typography>
                        <TextField value={ficha.gestor} variant="outlined" fullWidth disabled />
                    </Grid2>
                    <Grid2 item xs={12} sm={6} md={3}>
                        <Typography className={classes.label}>Programa</Typography>
                        <TextField value={ficha.programa} variant="outlined" fullWidth disabled />
                    </Grid2>
                </Grid2>
            </div>

            <Grid2 container spacing={2} justifyContent="center">
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
                    .filter(day => selectedDay.toLowerCase() === day.toLowerCase())  // Filtra solo el día seleccionado
                    .map((day) => (
                        <Grid2 item xs={12} sm={6} md={2} key={day}>
                            <Typography className={classes.dayLabel}>{day}</Typography>
                            {['mañana', 'tarde', 'noche'].map((time) => (
                                <TextField
                                    key={`${day}-${time}`}
                                    label={time.charAt(0).toUpperCase() + time.slice(1)}
                                    value={ficha[`${day.toLowerCase()}_${time}`] || ''}
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                    className={classes.textField}
                                />
                            ))}
                        </Grid2>
                    ))}
            </Grid2>
        </div>
    );
};

const useStyles = makeStyles(() => ({
    container: {
        padding: '16px',
        margin: '8px 0',
        backgroundColor: '#f0f0f0',
        alignItems: "center",
    },
    header: {
        marginBottom: '16px',
    },
    dayLabel: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#5eb219',
    },
    label: {
        textAlign: 'center',
        marginBottom: '8px',
        color: '#195eb2',
    },
    textField: {
        marginTop: '8px',
    },
}));

export default PreViewFicha;
