import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Grid, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useUserData } from '../api/use-user-data';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SignUpPopup(props) {
    const { isOpen, setOpen, toggle } = props;

    const [userDatabase, setUserDatabase] = React.useState()
    const [userValidity, setUserValidity] = React.useState("null")
    const [userInfo, setUserInfo] = React.useState()
    const [emailValidity, setEmailValidity] = React.useState("null")
    const [emailInfo, setEmailInfo] = React.useState()
    const [passwordValidity, setPasswordValidity] = React.useState("null")
    const [passwordConfValidity, setPasswordConfValidity] = React.useState("null")
    const [passwordInfo, setPasswordInfo] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [passwordConf, setPasswordConf] = React.useState("")

    const [fullnameValue, setFullnameValue] = React.useState()
    const [usernameValue, setUsernameValue] = React.useState()
    const [emailValue, setEmailValue] = React.useState()
    const [passValue, setPassValue] = React.useState()
    const [passConfValue, setPassConfValue] = React.useState()

    const userData = useUserData();


    const handleCheckUsername = (username) => {
        setUserDatabase(Object.values(userData))
        let index = userDatabase.findIndex((value, index) => value.username == username)
        if (username == "") {
            setUserValidity("null")
            setUserInfo()
        } else if (index < 0) {
            setUserValidity(true)
            setUserInfo("Nice! This username is available")
        } else if (index >= 0) {
            setUserValidity(false)
            setUserInfo("Shoot! This username is unavailable")
        }
    }

    const handleCheckEmail = (newEmail) => {
        setUserDatabase(Object.values(userData))
        if (newEmail == "") {
            setEmailValidity("null")
            setEmailInfo()
        } else if (newEmail.includes("@")) {
            let index = userDatabase.findIndex((value) => value.email === newEmail)
            console.log(index)
            if (index < 0) {
                setEmailValidity(true)
            } else if (index >= 0) {
                setEmailValidity(false)
                setEmailInfo("That email is already registered")
            }
        } else if (!newEmail.includes("@")) {
            setEmailValidity(false)
            setEmailInfo("Please fill in a valid email address")
        }

    }

    const handleCheckPassword = (password) => {
        let temp = password.split("")
        let checkNumber = "";
        let checkLowerCase = "";
        let checkUpperCase = "";
        let checkSymbol = "";

        temp.forEach((value) => {
            if (value / 2) {
                checkNumber = true;
            }
        })

        temp.forEach((value) => {
            if (value.toLowerCase() == value) {
                checkLowerCase = true;
            }
        })

        temp.forEach((value) => {
            if (value.toUpperCase() == value) {
                checkUpperCase = true;
            }
        })

        let symbols = `~!@#$%^&*()_-+={[}]|\:;"'<,>.?/`
        let arraySymbols = symbols.split("")

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

        if (checkLowerCase == true) {
            if (checkUpperCase == true) {
                if (checkNumber == true) {
                    if (checkSymbol == true) {
                        if (temp.length >= 8) {
                            setPasswordInfo("Your password is strong!")
                            setPasswordValidity(true)
                            setPasswordConf(password)
                        } else {
                            setPasswordValidity(false)
                            setPasswordInfo("Password must at least contain 8 characters")
                        }
                    } else {
                        setPasswordValidity(false)
                        setPasswordInfo("Password must include a symbol")
                    }
                } else {
                    setPasswordValidity(false)
                    setPasswordInfo("Password must include a number")
                }
            } else {
                setPasswordValidity(false)
                setPasswordInfo("Password must include an uppercase")
            }
        } else {
            setPasswordValidity(false)
            setPasswordInfo("Password must include an lowercase")
        }
    }

    const handleRecheckPassword = (passwordConfirmation) => {
        if (passwordConfirmation == passwordConf) {
            setPasswordConfValidity(true)
        } else if (passwordConfirmation !== passwordConf) {
            setPasswordConfValidity(false)
        }
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={toggle}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpen}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h4" component="h1" textAlign="center" sx={{ mb: 3 }}>
                            Nice to meet you!
                        </Typography>
                        <Grid container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Avatar
                                flexItem
                                src="https://external-preview.redd.it/-By7bUqncmznnA4tdfBQbiYBinN_7joIqL7Y64R7hMo.png?format=pjpg&auto=webp&s=3e0a96ba6c590f008b8d88da4b719bd9e60fd363"
                                sx={{ width: 100, height: 100, mb: 3 }}
                            />
                        </Grid>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            label="Enter your full name"
                            name="fullName"
                            autoComplete="fullName"
                            autoFocus
                            onChange={(e) => setFullnameValue(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Enter your username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => handleCheckUsername(e.target.value)}
                            error={userValidity == "null" ? null : !userValidity}
                            color={userInfo ? "success" : null}
                            helperText={userInfo}

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Enter your email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => handleCheckEmail(e.target.value)}
                            error={emailValidity == "null" ? null : !emailValidity}
                            color={emailInfo ? "success" : null}
                            helperText={emailInfo}
                        />
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel
                                htmlFor="outlined-adornment-password"
                                required
                                error={passwordValidity == "null" ? null : !passwordValidity}
                                color={passwordInfo ? "success" : null}
                            >Enter your password</InputLabel>
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
                            label="Enter your confirmation password"
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
                            color="primary"
                        >
                            Sign Up!
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}