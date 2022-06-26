import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../Redux/Actions/usersAction';
import CameraIcon from '@mui/icons-material/Camera';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Grid } from '@mui/material';
import { Paper, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { API_URL } from '../helper';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const NavigationBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { username, fullname, profPic } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
            fullname: state.usersReducer.fullName,
            profPic: state.usersReducer.profilePicture
        }
    })


    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky" style={{ background: 'white', boxShadow: "none" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Container >
                    <Toolbar disableGutters sx={{ height: 75 }}>
                        <IconButton onClick={() => navigate('/')}>
                            <CameraIcon sx={{ color: 'primary.main', background: 'transparent', display: 'flex' }} />
                        </IconButton>

                        {/* <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        </Paper> */}









                        <Box sx={{ ml: 2, flexGrow: 1, display: 'flex' }}>
                            <Typography
                                color="black"
                            >
                                {fullname}
                            </Typography>

                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={fullname} src={`${API_URL}${profPic}`} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                PaperProps={{
                                    sx: { width: 200 }
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={() => navigate(`/profile?username=${username}`)}>
                                    <AccountCircleOutlinedIcon sx={{ mr: 1 }} />
                                    <Typography textAlign="center">My Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => navigate('/settings')}>
                                    <SettingsOutlinedIcon sx={{ mr: 1 }} />
                                    <Typography textAlign="center">Settings</Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => {
                                    dispatch(logoutAction())
                                    navigate('/login')
                                }}>
                                    <Typography textAlign="center">Log Out</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </Box>
        </AppBar>
    );
};