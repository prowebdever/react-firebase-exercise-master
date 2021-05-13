import React, { useState } from 'react'

import { Button, TextField, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 'auto 200px auto 200px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    label: {
        paddingTop: '30px'
    },
    submit: {
        width: "20%",
        float: "right"
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
}));

const Train = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState({value: 1, error: false});
    const [reps, setReps] = useState({value: 1, error: false});
    const [rpe, setRpe] = useState({value: 1, error: false});
    const [validationError, setValidationError] = useState(false);
    const [currentLoad, setCurrentLoad] = useState(1);
    const [currentReps, setCurrentReps] = useState(1);
    const [currentRpe, setCurrentRpe] = useState(1);

    const firebase = props.firebase;

    function handleLoadChange(event) {
        let value = parseInt(event.target.value);
        if (value > 0) {
            setLoad({value: value, error: false});
        } else {
            setLoad({value: value, error: true});
        }
    }

    function handleRepsChange(event) {
        let value = parseInt(event.target.value);
        if (value > 0) {
            setReps({value: value, error: false});
        } else {
            setReps({value: value, error: true});
        }
    }

    function handleRpeChange(event) {
        let value = parseInt(event.target.value);
        if (value > 0) {
            setRpe({value: value, error: false});
        } else {
            setRpe({value: value, error: true});
        }
    }

    function handleSubmit() {
        setLoading(true);
        const loadValue = parseInt(load.value);
        const repsValue = parseInt(reps.value);
        const rpeValue = parseInt(rpe.value);

        if (loadValue > 0 && repsValue > 0 && rpeValue > 0) {
            setValidationError(false);
            firebase.updateTrainData({load: loadValue, reps: repsValue, rpe: rpeValue});
            return;
        } else {
            setValidationError(true);
            return;
        }

    }

    function handleDataChange(training) {
        setCurrentLoad(training.load);
        setCurrentReps(training.reps);
        setCurrentRpe(training.rpe);
        setLoading(false);
    }

    firebase.getTrainData(handleDataChange);

    return (
        <div className = {classes.root}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Train
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={3} className="label">
                        <Typography component="h5">Push Data</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField margin="normal" required fullWidth error={load.error} value={load.value}
                            id="push_load" label="Load" name="push_load" type="number" autoComplete="push_load"
                           onChange={handleLoadChange} autoFocus></TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField margin="normal" required fullWidth error={reps.error} value={reps.value}
                            id="push_reps" label="Reps" name="push_reps" type="number" autoComplete="push_reps"
                            onChange={handleRepsChange}></TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField margin="normal" required fullWidth error={rpe.error} value={rpe.value}
                            id="push_rpe" label="Rpe" name="push_rpe" type="number" autoComplete="push_rpe"
                            onChange={handleRpeChange}></TextField>
                    </Grid>
                    <Grid item xs={3} className="label">
                        <Typography component="h5">Pull Data</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField margin="normal" required fullWidth value={currentLoad}
                            id="pull_load" label="Load" name="pull_load" type="number" autoComplete="pull_load"
                            InputProps={{
                                readOnly: true,
                              }}></TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField margin="normal" required fullWidth value={currentReps}
                            id="pull_reps" label="Reps" name="pull_reps" type="number" autoComplete="pull_reps"
                            InputProps={{
                                readOnly: true,
                              }}></TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField margin="normal" required fullWidth value={currentRpe}
                            id="pull_rpe" label="Rpe" name="pull_rpe" type="number" autoComplete="pull_rpe"
                            InputProps={{
                                readOnly: true,
                              }}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                            onClick={handleSubmit} disabled={loading}
                            > Submit {loading && <CircularProgress size={30} className={classes.progress}/>}</Button>
                        {validationError && (
                            <Typography variant="body2" className={classes.customError}>Field Validation Error! Please check fields.</Typography>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
};

export default Train;
