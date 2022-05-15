import React from "react";
import { NavigationBar } from "../Components/NavigationBar";
import { Avatar, Box, Typography, Grid, Badge, IconButton, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import Axios from "axios";
import { API_URL } from "../helper";
import SettingsTab from "../Components/SettingsTab"

const SettingsPage = (props) => {
    // const { id, profPic, fullname, username, bio, email, password } = useSelector((state) => {
    //     return {
    //         id: state.usersReducer.id,
    //         profPic: state.usersReducer.profilePicture,
    //         fullname: state.usersReducer.fullName,
    //         username: state.usersReducer.username,
    //         bio: state.usersReducer.bio,
    //         email: state.usersReducer.email,
    //         password: state.usersReducer.password
    //     }
    // })

    // const [database, setDatabase] = React.useState()
    // const [maxBio, setMaxBio] = React.useState(false)
    // const [newUsername, setNewUsername] = React.useState()
    // const [usernameValidity, setUsernameValidity] = React.useState("null")
    // const [usernameInfo, setUsernameInfo] = React.useState()
    // const [bioInfo, setBioInfo] = React.useState()

    // React.useEffect(() => {
    //     getDatabase();
    // }, [])

    // const getDatabase = () => {
    //     Axios.get((`${API_URL}/users`))
    //         .then((response) => {
    //             setDatabase(response.data)
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    // }

    // const handleBio = (value) => {
    //     if (value.length >= 140) {
    //         setMaxBio(true);
    //         setBioInfo("You've reached the maximum characters allowed")
    //     } else {
    //         setMaxBio(false)
    //         setBioInfo()
    //     }
    // }

    // const handleCheckUsername = (newUsername) => {
    //     let index = database.findIndex((value, index) => value.username == newUsername)
    //     console.log(index)
    //     if (newUsername == "") {
    //         setUsernameValidity("null")
    //         setUsernameInfo();
    //     } else if (index < 0) {
    //         setUsernameValidity(true)
    //         setUsernameInfo("sweet! This username is still available")
    //     } else if (index >= 0) {
    //         if (database[index].username == newUsername) {
    //             setUsernameValidity(true)
    //             setUsernameInfo("sweet! This username is still available")
    //         } else if (database[index].username !== newUsername) {
    //             setUsernameValidity(false)
    //             setUsernameInfo("Shoot! This username is unavailable")
    //         }
    //     }
    // }

    return <div>
        <NavigationBar />
        <SettingsTab />

        {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


            <Box sx={{ maxWidth: 500 }}>
                <Typography id="transition-modal-title" variant="h6" component="h1" textAlign="center" sx={{ my: 3 }}>
                    Edit Profile
                </Typography>

                <Grid container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <IconButton>
                                <EditIcon sx={{ backgroundColor: 'primary.main', color: 'white', borderRadius: '50%', width: 20, height: 20 }} />
                            </IconButton>
                        }
                    >
                        <Avatar
                            flexItem
                            src={profPic}
                            sx={{ width: 100, height: 100 }}
                        />
                    </Badge>
                </Grid>

                <TextField id="outlined-basic" label="Username" defaultValue={username} variant="outlined" fullWidth sx={{ my: 3 }}
                    onChange={(e) => { handleCheckUsername(e.target.value) }}
                    error={!usernameValidity}
                    color={usernameInfo ? "success" : null}
                    helperText={usernameInfo} />
                <TextField id="outlined-basic" label="Full Name" defaultValue={fullname} variant="outlined" fullWidth sx={{ mb: 3 }} />
                <TextField id="outlined-basic" label="Email" defaultValue={email} variant="outlined" fullWidth disabled sx={{ mb: 3 }} />
                <TextField id="outlined-basic" label="Bio" defaultValue={bio} variant="outlined" fullWidth multiline maxRows={3} inputProps={{ maxLength: 140 }} sx={{ mb: 3 }} error={maxBio} onChange={(e) => handleBio(e.target.value)} helperText={bioInfo} />
            </Box>
        </Box> */}
    </div>

}

export default SettingsPage;