import React from 'react';
import { makeStyles } from '@mui/styles';
import { FormControl, InputLabel, Select, MenuItem, Grid, Typography, TextField } from '@mui/material';

function FichaProgramacion({ ficha, instructores, onInstructorChange }) {
    const classes = useStyles();

    // Maneja el cambio en el dropdown
    const handleInstructorChange = (day, time) => (event) => {
        const selectedInstructor = event.target.value;
        onInstructorChange(ficha.id, day, time, selectedInstructor);
    };

    return (
        <div className={classes.container}>
            {/* Fila de información no editable */}
            <div className={classes.header}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography className={classes.label}>ID</Typography>
                        <TextField value={ficha.id} variant="outlined" fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography className={classes.label}>Coordinador</Typography>
                        <TextField value={ficha.coordinador} variant="outlined" fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography className={classes.label}>Gestor</Typography>
                        <TextField value={ficha.gestor} variant="outlined" fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography className={classes.label}>Programa</Typography>
                        <TextField value={ficha.programa} variant="outlined" fullWidth disabled />
                    </Grid>
                </Grid>
            </div>

            {/* Filas de selección de instructores */}
            <Grid container spacing={2} justifyContent="center">
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((day) => (
                    <Grid item xs={12} sm={6} md={2} key={day}>
                        <Typography className={classes.dayLabel}>{day}</Typography>
                        {['mañana', 'tarde', 'noche'].map((time) => (
                            <FormControl className={classes.instructorSelect} fullWidth key={`${day}-${time}`}>
                                <InputLabel id={`select-${day}-${time}`} className={classes.label}>
                                    {time.charAt(0).toUpperCase() + time.slice(1)}
                                </InputLabel>
                                <Select
                                    labelId={`select-${day}-${time}`}
                                    value={ficha[`${day.toLowerCase()}_${time}`] || ''}
                                    onChange={handleInstructorChange(day.toLowerCase(), time)}
                                    className={classes.select}
                                >
                                    {instructores.map((instructor) => (
                                        <MenuItem key={instructor} value={instructor}>
                                            {instructor}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

const useStyles = makeStyles(() => ({
    container: {
        padding: '16px',
        margin: '8px 0',
        backgroundColor: '#f0f0f0',
    },
    header: {
        marginBottom: '16px',
    },
    dayLabel: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#5eb219', // Color principal
    },
    label: {
        textAlign: 'center',
        marginBottom: '8px',
        color: '#195eb2', // Color secundario
    },
    instructorSelect: {
        width: '100%',
        marginTop: '8px',
    },
    select: {
        '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b2195e', // Color terciario
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5eb219', // Color principal al hacer hover
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5eb219', // Color principal cuando está enfocado
        },
    },
}));

export default FichaProgramacion;
