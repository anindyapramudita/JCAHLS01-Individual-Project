import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { VisibilityOff, Visibility, IndeterminateCheckBox } from '@mui/icons-material';
import Axios from "axios";
import { API_URL } from '../helper';
import SignUpPopup from '../Components/SignUpPopup';
import CameraIcon from '@mui/icons-material/Camera';
import { useDispatch } from 'react-redux';
import { loginAction } from '../Redux/Actions/usersAction';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();


const SignInPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userDatabase, setUserDatabase] = React.useState()
    const [usernameLogin, setUsernameLogin] = React.useState("")
    const [passwordLogin, setPasswordLogin] = React.useState("")
    const [openRegister, setOpenRegister] = React.useState(false)

    const [showPassword, setShowPassword] = React.useState(false)
    const [passwordValidity, setPasswordValidity] = React.useState("null")
    const [validityInfo, setValidityInfo] = React.useState()


    React.useEffect(() => {
        getUserData();
    }, [])

    // const getUserData = () => {
    //     Axios.get(`${API_URL}/users`, {
    //         headers: {
    //             'Access-Control-Allow-Origin': '*',
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //         .then((response) => {
    //             setUserDatabase(response.data)
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    // }
    const getUserData = () => {
        // Axios.get(`${API_URL}/users/`)
        Axios.get(`${API_URL}/user/`)
            .then((response) => {
                setUserDatabase(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleSubmit = () => {
        if (usernameLogin == "" || passwordLogin == "") {
            setPasswordValidity(false)
            setValidityInfo("Please fill in all the form")
        } else {
            let index = userDatabase.findIndex((value) => value.username == usernameLogin)
            if (index >= 0) {
                // if (passwordLogin === userDatabase[index].password) {
                setPasswordValidity(true)
                setValidityInfo("")
                // console.log(`login success! username / email : ${[usernameLogin]}, password: ${passwordLogin}`)
                // Axios.get(`${API_URL}/users?username=${usernameLogin}&password=${passwordLogin}`)
                Axios.post(`${API_URL}/user/login`, {
                    username: usernameLogin,
                    password: passwordLogin
                })
                    .then((response) => {
                        // localStorage.setItem("tokenIdUser", response.data[0].id)
                        localStorage.setItem("tokenIdUser", response.data.token)
                        dispatch(loginAction(response.data[0]));
                        navigate('/');
                    }).catch((error) => {
                        console.log(error);
                        setPasswordValidity(false)
                        setValidityInfo("Username and password doesn't match")
                    })
                // } else {
                // }
            } else if (index < 0) {
                index = userDatabase.findIndex((value) => value.email == usernameLogin)
                if (index >= 0) {
                    if (passwordLogin === userDatabase[index].password) {
                        setPasswordValidity(true)
                        setValidityInfo("")
                        console.log(`login success! username / email : ${[usernameLogin]}, password: ${passwordLogin}`)
                        // Axios.get(`${API_URL}/users?email=${usernameLogin}&password=${passwordLogin}`)
                        Axios.post(`${API_URL}/user/login`, {
                            email: usernameLogin,
                            password: passwordLogin
                        })
                            .then((response) => {
                                // localStorage.setItem("tokenIdUser", response.data[0].id)
                                localStorage.setItem("tokenIdUser", response.data.token)
                                dispatch(loginAction(response.data[0]));
                                navigate('/');
                            }).catch((error) => {
                                console.log(error);
                            })
                    } else {
                        setPasswordValidity(false)
                        setValidityInfo("Email and password doesn't match")
                    }
                } else if (index < 0) {
                    setPasswordValidity(false)
                    setValidityInfo("Username / Email is invalid")
                }
            }
        }
    };


    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ my: 5, bgcolor: 'secondary.main' }}>
                            <CameraIcon />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Welcome Back!
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 5 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email / Username"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => setUsernameLogin(e.target.value)}
                                error={passwordValidity == "null" ? null : !passwordValidity}
                            />
                            <FormControl fullWidth variant="outlined" margin="normal">
                                <InputLabel htmlFor="outlined-adornment-password" required error={passwordValidity == "null" ? null : !passwordValidity}>Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setPasswordLogin(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                // onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    error={passwordValidity == "null" ? null : !passwordValidity}
                                    label="Password"
                                />
                                <FormHelperText>{validityInfo}</FormHelperText>
                            </FormControl>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2" underline="hover" color="inherit">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                {/* <Grid item>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                </Grid> */}
                            </Grid>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                                color="secondary"
                            >
                                Sign In
                            </Button>
                            <Typography component="p" variant="body2">
                                Don't have an account yet?
                            </Typography>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="primary"
                                onClick={() => setOpenRegister(!openRegister)}
                            >
                                Join Us!
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {/* <SignUpModal */}
            <SignUpPopup
                isOpen={openRegister}
                setOpen={setOpenRegister}
                toggle={() => setOpenRegister(!openRegister)}
            />
        </>
    );
}

export default SignInPage;