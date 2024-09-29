import React from 'react';
import { makeStyles } from '@mui/styles';
import { FormControl, InputLabel, Select, MenuItem, Grid2, Typography, TextField } from '@mui/material';

const PreViewFicha = ({ ficha, instructores, inDay }) => {
    const classes = useStyles(inDay);

    return (
        <div className={classes.container}>
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
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((day) => (
                    <Grid2 item xs={12} sm={6} md={2} key={day}>
                        <Typography className={classes.dayLabel}>{day}</Typography>
                        {['mañana', 'tarde', 'noche'].map((time) => (
                            <FormControl className={classes.instructorSelect} fullWidth key={`${day}-${time}`}>
                                <InputLabel id={`select-${day}-${time}`} className={classes.label}>
                                    {time.charAt(0).toUpperCase() + time.slice(1)}
                                </InputLabel>
                                <Select
                                    labelId={`select-${day}-${time}`}
                                    value={ficha[`${day.toLowerCase()}_${time}`] || ''}
                                    disabled
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
                    </Grid2>
                ))}
            </Grid2>
        </div>
    );
}

const useStyles = makeStyles(() => ({
    container: (inDay) => ({
        padding: '16px',
        margin: '8px 0',
        backgroundColor: '#f0f0f0',
        border: `2px solid ${inDay ? '#195eb2' : '#b2195e'}`,
    }),
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
    instructorSelect: {
        width: '100%',
        marginTop: '8px',
    },
    select: {
        '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b2195e',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5eb219',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5eb219',
        },
    },
}));

export default PreViewFicha;
