import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { Avatar, Button, CssBaseline, TextField, Link, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'

import { signInSuccess, signInFailed } from './redux/actions'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
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

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const authState = useSelector( state => state.sign.get('auth') );
    const authError = useSelector( state => state.sign.get('error') );
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const firebase = props.firebase;
    console.log(firebase);

    useEffect(() => {
        if (authState) {
            setLoading(false);
            history.push('/');                        
        }
    }, [authState, history]);
    
    useEffect(() => {
        if (authError) {
            setLoading(false);
        }
    }, [authError])

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    };
    function handleChangePassword(event) {
        setPassword(event.target.value);
    };
    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        props.firebase
            .doSignInAnonymously(email, password)
            .then(() => {
                dispatch(signInSuccess(true));
            })
            .catch(err => {
                dispatch(signInFailed(false, err.code + "/" + err.message));
            })
    };
    function handleGoogle(event) {
        event.preventDefault();
        setLoading(true);
        props.firebase
            .doSignInWithGoogle()
            .then(() => {            
                dispatch(signInSuccess(true));
            })
            .catch(err => {
                dispatch(signInFailed(false, err.code + "/" + err.message));
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField variant="outlined" margin="normal" required fullWidth 
                        id="email" label="Email Address" name="email" autoComplete="email"
                        autoFocus onChange={handleChangeEmail}></TextField>
                    <TextField variant="outlined" margin="normal" required fullWidth 
                        id="password" label="Password" name="password" type="password" 
                        autoComplete="current-password" onChange={handleChangePassword}></TextField>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                        onClick={handleSubmit} disabled={loading || !email || !password}
                        > Sign In {loading && <CircularProgress size={30} className={classes.progress}/>}</Button>
                    <Grid container>
                        <Grid item>
                            <Link href="#" onClick={handleGoogle} variant="body2">
                                {"Don't have an account? Sign Up with Google"}
                            </Link>
                        </Grid>
                        {authError && (
                            <Typography variant="body2" className={classes.customError}>{authError}</Typography>
                        )}
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default SignIn;