import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { useSelector } from 'react-redux';
import { useUserPosts } from '../api/use-user-posts';
import { ImageList, ImageListItem, Grid, Button, Container, fabClasses } from '@mui/material';
import UserPosts from './UserPosts';
import UserLikedPosts from './UserLikedPosts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import LockIcon from '@mui/icons-material/Lock';
import { Badge, IconButton, Avatar, TextField, Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Axios from 'axios';
import { API_URL } from '../helper';
import axios from 'axios';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function SettingsTab() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { id, profPic, fullname, username, bio, email, password } = useSelector((state) => {
        return {
            id: state.usersReducer.id,
            profPic: state.usersReducer.profilePicture,
            fullname: state.usersReducer.fullName,
            username: state.usersReducer.username,
            bio: state.usersReducer.bio,
            email: state.usersReducer.email,
            password: state.usersReducer.password
        }
    })

    const [database, setDatabase] = React.useState()
    const [maxBio, setMaxBio] = React.useState(false)
    const [usernameValidity, setUsernameValidity] = React.useState("null")
    const [usernameInfo, setUsernameInfo] = React.useState()
    const [bioInfo, setBioInfo] = React.useState()
    const [buttonValidity, setButtonValidity] = React.useState(true)


    const [newUsername, setNewUsername] = React.useState(username)
    const [newFullname, setNewFullname] = React.useState(fullname)
    const [newBio, setNewBio] = React.useState(bio)


    React.useEffect(() => {
        getDatabase();
    }, [])

    const getDatabase = () => {
        Axios.get((`${API_URL}/users`))
            .then((response) => {
                setDatabase(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleBio = (value) => {
        setNewBio(value)

        if (value.length >= 140) {
            setMaxBio(true);
            setBioInfo("You've reached the maximum characters allowed")
        } else {
            setMaxBio(false)
            setBioInfo()
        }

        if (usernameValidity !== false) {
            setButtonValidity(false)
        }
    }

    const handleCheckUsername = (newUsername) => {
        setNewUsername(newUsername)
        console.log(newUsername)
        let index = database.findIndex((value, index) => value.username == newUsername)
        console.log(index)
        if (newUsername == "") {
            setUsernameValidity("null")
            setUsernameInfo();
            setButtonValidity(true)
        } else if (index < 0) {
            setUsernameValidity(true)
            setUsernameInfo("sweet! This username is still available")
            setButtonValidity(false)
        } else if (index >= 0) {
            if (database[index].username == username) {
                setUsernameValidity(true)
                setUsernameInfo("sweet! This username is still available")
                setButtonValidity(false)
                // console.log(database[index].username)
            } else if (database[index].username !== username) {
                setUsernameValidity(false)
                setUsernameInfo("Shoot! This username is unavailable")
                setButtonValidity(true)
                // console.log(database[index].username)
            }
        }
    }

    const handleSaveChanges = () => {
        axios.patch(`${API_URL}/users/${id}`, { fullName: newFullname, username: newUsername, bio: newBio })
            .then((response) => {
                getDatabase();
                setButtonValidity(true)
            }).catch((error) => {
                console.log(error)
            })
    }




    return (
        <Container >
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Tab icon={<AccountCircleIcon />} iconPosition="top" label="Account Info" {...a11yProps(0)} sx={{ minWidth: "33%" }} />
                        <Tab icon={<LocalSeeIcon />} iconPosition="top" label="Profile Picture" {...a11yProps(1)} sx={{ minWidth: "33%" }} />
                        <Tab icon={<LockIcon />} iconPosition="top" label="Password and Security" {...a11yProps(1)} sx={{ minWidth: "33%" }} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ maxWidth: 500 }}>
                            <Typography id="transition-modal-title" variant="h6" component="h1" textAlign="center" sx={{ my: 3 }}>
                                Edit Profile
                            </Typography>

                            <TextField id="outlined-basic" label="Username" defaultValue={username} variant="outlined" fullWidth sx={{ my: 3 }}
                                onChange={(e) => { handleCheckUsername(e.target.value) }}
                                error={!usernameValidity}
                                color={usernameInfo ? "success" : null}
                                helperText={usernameInfo} />
                            <TextField id="outlined-basic" label="Full Name" defaultValue={fullname} variant="outlined" fullWidth sx={{ mb: 3 }}
                                onChange={(e) => {
                                    setNewFullname(e.target.value)
                                    if (usernameValidity !== false) {
                                        setButtonValidity(false)
                                    };
                                }}
                            />
                            <TextField id="outlined-basic" label="Email" defaultValue={email} variant="outlined" fullWidth disabled sx={{ mb: 3 }} />
                            <TextField id="outlined-basic" label="Bio" defaultValue={bio} variant="outlined" fullWidth multiline maxRows={3} inputProps={{ maxLength: 140 }} sx={{ mb: 3 }} error={maxBio}
                                onChange={(e) => handleBio(e.target.value)} helperText={bioInfo}
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSaveChanges}
                                disabled={buttonValidity}
                            >
                                Save changes
                            </Button>
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


                        <Box sx={{ maxWidth: 500 }}>
                            <Typography id="transition-modal-title" variant="h6" component="h1" textAlign="center" sx={{ my: 3 }}>
                                Edit Profile Picture
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
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3 }}
                            >
                                Save changes
                            </Button>
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


                        <Box sx={{ maxWidth: 500 }}>
                            <Typography id="transition-modal-title" variant="h6" component="h1" textAlign="center" sx={{ my: 3 }}>
                                Edit Password
                            </Typography>

                            <TextField id="outlined-basic" label="Old Password" variant="outlined" fullWidth sx={{ my: 3 }}
                            // onChange={(e) => { handleCheckUsername(e.target.value) }}
                            // error={!usernameValidity}
                            // color={usernameInfo ? "success" : null}
                            // helperText={usernameInfo}
                            />
                            <TextField id="outlined-basic" label="New Password" variant="outlined" fullWidth sx={{ mb: 3 }} />
                            <TextField id="outlined-basic" label="New Password Confirmation" variant="outlined" fullWidth sx={{ mb: 3 }} />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mb: 1 }}
                                color="primary"
                            >
                                Change Password
                            </Button>
                            <Link href="#" variant="body2" underline="hover" color="inherit">
                                Forgot password?
                            </Link>
                        </Box>
                    </Box>
                </TabPanel>
            </Box>
        </Container>
    );
}