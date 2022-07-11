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
import { InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput, FormHelperText, Container } from '@mui/material';
import { VisibilityOff, Visibility, IndeterminateCheckBox } from '@mui/icons-material';
import Axios from "axios";
import { API_URL } from '../helper';
import SignUpPopup from '../Components/SignUpPopup';
import ModalForgotPassword from '../Components/ModalForgotPassword';
import CameraIcon from '@mui/icons-material/Camera';
import { useDispatch } from 'react-redux';
import { loginAction } from '../Redux/Actions/usersAction';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme();


const ResetPasswordPage = () => {

    // const dispatch = useDispatch();
    const navigate = useNavigate();
    let { token } = useParams()

    const [userData, setUserData] = React.useState()

    const [newPassword, setNewPassword] = React.useState()
    const [newPasswordConfirmation, setNewPasswordConfirmation] = React.useState()

    const [showPassword, setShowPassword] = React.useState(false)
    const [passwordValidity, setPasswordValidity] = React.useState("null")
    const [passwordConfValidity, setPasswordConfValidity] = React.useState("null")
    const [passwordInfo, setPasswordInfo] = React.useState()
    const [passwordConf, setPasswordConf] = React.useState()



    React.useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(`${API_URL}/user/verificationData`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setUserData(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleCheckPassword = (password) => {
        let temp = password.split("")
        let checkNumber = "";
        let checkLowerCase = "";
        let checkUpperCase = "";
        let checkSymbol = "";

        let symbols = `~!@#$%^&*()_-+={[}]|\:;"'<,>.?/`
        let arraySymbols = symbols.split("")

        temp.forEach((value) => {
            if (value / 2) {
                checkNumber = true;
            }
        })

        temp.forEach((value) => {
            if (value.toLowerCase() !== value.toUpperCase()) {
                if (value.toLowerCase() == value) {
                    checkLowerCase = true;
                }
            }
        })

        temp.forEach((value) => {
            if (value.toLowerCase() !== value.toUpperCase()) {
                if (value.toUpperCase() == value) {
                    checkUpperCase = true;
                }
            }
        })


        for (let i = 0; i < temp.length; i++) {
            for (let k = 0; k < arraySymbols.length; k++) {
                if (temp[i] == arraySymbols[k]) {
                    checkSymbol = true;
                }
            }
        }

        if (password == "") {
            setPasswordValidity("null")
        }

        if (checkLowerCase !== true) {
            setPasswordValidity(false)
            setPasswordInfo("Password must include a lowercase")
        }

        if (checkUpperCase !== true) {
            setPasswordValidity(false)
            setPasswordInfo("Password must include an uppercase")
        }

        if (checkNumber !== true) {
            setPasswordValidity(false)
            setPasswordInfo("Password must include a number")
        }

        if (checkSymbol !== true) {
            setPasswordValidity(false)
            setPasswordInfo("Password must include a symbol")
        }

        if (temp.length < 8) {
            setPasswordValidity(false)
            setPasswordInfo("Password must at least contain 8 characters")
        }

        if (checkLowerCase && checkUpperCase && checkNumber && checkSymbol && temp.length >= 8) {
            setPasswordInfo("Your password is strong!")
            setPasswordValidity(true)
            setNewPassword(password)
        }
    }

    const handleRecheckPassword = (passwordConfirmation) => {
        if (passwordConfirmation == newPassword) {
            setPasswordConfValidity(true)
        } else if (passwordConfirmation !== passwordConf) {
            setPasswordConfValidity(false)
        }
    }

    const handleReset = () => {
        if (passwordValidity === true && passwordConfValidity == true) {
            axios.patch(`${API_URL}/user/resetPassword`, { password: newPassword }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                alert(`Password has been successfully changed`)
                navigate('/login')
            }).catch((error) => {
                console.log(error)
            })
        } else {
            alert(`please fill in the form properly`)
        }
    }


    return <div>
        {userData ? userData.lastToken == token ?
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
                                One more thing!
                            </Typography>
                            <Typography component="body2" variant="body2" sx={{ mt: 3 }} color="grey.600">
                                Let's create your new password
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 3 }}>

                                <FormControl fullWidth variant="outlined" margin="normal">
                                    <InputLabel
                                        htmlFor="outlined-adornment-password"
                                        required
                                        error={passwordValidity == "null" ? null : !passwordValidity}
                                        color={passwordInfo ? "success" : null}
                                    >New Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={(e) => handleCheckPassword(e.target.value)}
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
                                        color={passwordInfo ? "success" : null}
                                        label="Password"
                                    />
                                    <FormHelperText>{passwordInfo}</FormHelperText>
                                </FormControl>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="passConf"
                                    label="New Password Confirmation"
                                    name="passConf"
                                    autoComplete="passConf"
                                    type="password"
                                    autoFocus
                                    onChange={(e) => handleRecheckPassword(e.target.value)}
                                    error={passwordConfValidity == "null" ? null : !passwordConfValidity}
                                    color={passwordConfValidity ? "success" : null}
                                />
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleReset}
                                    color="primary"
                                    disabled={passwordValidity == true && passwordConfValidity == true ? false : true}
                                >
                                    Reset password
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </>
            : <Container sx={{ py: 15, px: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'primary' }}>

                    <Avatar
                        flexItem
                        src="https://i.kym-cdn.com/entries/icons/original/000/024/027/blog_image_3822_4926_Webcomic_Name_April_Fools_Day_201703231756.jpg"
                        sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h5" component="h1" align="center">
                        We're sorry, your token has expired!
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, mb: 4 }} align="center">
                        Please check your inbox for the updated verification link or log in to your account and get a new verification link!
                    </Typography>
                    <Button variant="outlined" onClick={() => navigate('/')}>Login</Button>
                </Box>
            </Container>
            : <Container sx={{ py: 15, px: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'primary' }}>

                    <Avatar
                        // flexItem
                        src="https://i.kym-cdn.com/entries/icons/original/000/024/027/blog_image_3822_4926_Webcomic_Name_April_Fools_Day_201703231756.jpg"
                        sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h5" component="h1" align="center">
                        We're sorry, your token has expired!
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, mb: 4 }} align="center">
                        Please check your inbox for the updated verification link or log in to your account and get a new verification link!
                    </Typography>
                    <Button variant="outlined" onClick={() => navigate('/')}>Login</Button>
                </Box>
            </Container>}
    </div>
        ;
}

export default ResetPasswordPage;