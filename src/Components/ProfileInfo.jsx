import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useUserPosts } from '../api/use-user-posts';
import { useUserData } from '../api/use-user-data';
import Axios from "axios";
import { API_URL } from "../helper";
import { useNavigate } from "react-router-dom";

const ProfileInfo = (props) => {
    const [userFollowing, setUserFollowing] = React.useState();
    const [userFollowers, setUserFollowers] = React.useState();

    const { id, profPic, fullname, username } = useSelector((state) => {
        return {
            id: state.usersReducer.id,
            profPic: state.usersReducer.profilePicture,
            fullname: state.usersReducer.fullName,
            username: state.usersReducer.username
        }
    })

    const { posts } = useUserPosts(id);
    const userData = useUserData();
    const navigate = useNavigate();

    React.useEffect(() => {
        getFollowers();
        getFollowing();
    }, [])

    const getPosts = () => {
        if (posts[0].id) {
            return posts.length
        } else {
            return posts.length - 1
        }
    }

    const getFollowing = () => {
        Axios.get(`${API_URL}/users/${id}`)
            .then((response) => {
                setUserFollowing(response.data.userFollowed.length)
            }).catch((error) => {
                console.log(error)
            })
    }

    const getFollowers = () => {
        Axios.get(`${API_URL}/users?userFollowed_like=${username}`)
            .then((response) => {
                setUserFollowers(response.data.length)
            }).catch((error) => {
                console.log(error)
            })
    }



    return <Box>
        <Box >
            <Box sx={{ mt: 5, mb: 3, display: 'flex', justifyContent: 'center' }}>
                <Avatar
                    src={profPic}
                    sx={{ width: 120, height: 120 }}
                />
            </Box>

            <Typography
                variant="h5"
                component="div"
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                {fullname}
            </Typography>

            <Typography
                variant="subtitle1"
                component="div"
                color='grey.600'
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                @{username}
            </Typography>

            <Box
                sx={{ mx: { xs: 8, md: 15, xl: 20 }, mt: 3, justifyContent: 'center' }}>
                <Typography
                    variant="body2"
                    component="div"
                    color='grey.500'
                    sx={{ textAlign: 'center' }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio facere exercitationem placeat esse id? Aliquam sequi labore accusamus. Lorem ipsum dol.
                </Typography>

            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }} >
                <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    sx={{ my: 3, width: 200 }}
                    startIcon={<SettingsIcon />}
                    onClick={() => navigate('/settings')}
                >
                    Edit Profile
                </Button>
            </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', py: 1, borderBottom: 1, borderTop: 1, borderColor: 'divider' }}>
            <Box>
                <Typography
                    variant="body1"
                    component="h1"
                    sx={{ textAlign: 'center' }}
                >
                    {posts && id ? getPosts() : null}
                </Typography>
                <Typography
                    variant="body2"
                    component="div"
                    color='grey.500'
                    sx={{ textAlign: 'center' }}
                >
                    Posts
                </Typography>
            </Box>
            <Box>
                <Typography
                    variant="body1"
                    component="h1"
                    sx={{ textAlign: 'center' }}
                >
                    {userFollowing}
                </Typography>
                <Typography
                    variant="body2"
                    component="div"
                    color='grey.500'
                    sx={{ textAlign: 'center' }}
                >
                    Following
                </Typography>
            </Box>
            <Box>
                <Typography
                    variant="body1"
                    component="h1"
                    sx={{ textAlign: 'center' }}
                >
                    {userFollowers}
                </Typography>
                <Typography
                    variant="body2"
                    component="div"
                    color='grey.500'
                    sx={{ textAlign: 'center' }}
                >
                    Followers
                </Typography>
            </Box>
        </Box>
    </Box>
}

export default ProfileInfo;