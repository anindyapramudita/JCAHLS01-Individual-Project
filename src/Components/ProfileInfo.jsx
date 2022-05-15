import React from "react";
import { Avatar, Box, Button, Typography, Container, Link } from "@mui/material";
import { useSelector } from "react-redux";
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useUserPosts } from '../api/use-user-posts';
import { useUserData } from '../api/use-user-data';
import Axios from "axios";
import { API_URL } from "../helper";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PersonAdd } from "@mui/icons-material";

const ProfileInfo = (props) => {
    const [userUsername, setUserUsername] = React.useState();
    const [userDetail, setUserDetail] = React.useState();
    const [postsDetail, setPostsDetail] = React.useState();
    const [userFollowing, setUserFollowing] = React.useState();
    const [userFollowers, setUserFollowers] = React.useState();

    const { search } = useLocation()

    const { id, profPic, fullname, username, bio } = useSelector((state) => {
        return {
            id: state.usersReducer.id,
            profPic: state.usersReducer.profilePicture,
            fullname: state.usersReducer.fullName,
            username: state.usersReducer.username,
            bio: state.usersReducer.bio
        }
    })

    const { posts } = useUserPosts(id);
    const userData = useUserData();
    const navigate = useNavigate();

    React.useEffect(() => {
        getUserDetail();
        getPostsDetail();
        getFollowing();
    }, [])

    const getUserDetail = () => {
        Axios.get(`${API_URL}/users${search}`)
            .then((response) => {
                setUserDetail(response.data[0])
                setUserUsername(response.data[0].username)
                console.log('user data:', response.data[0])
            }).catch((error) => {
                console.log(error);
            })
    }

    const getPostsDetail = () => {
        Axios.get(`${API_URL}/posts${search}`)
            .then((response) => {
                setPostsDetail(response.data)
                console.log('posts data:', response.data)
            }).catch((error) => {
                console.log(error);
            })
    }

    const getPosts = () => {
        if (postsDetail[0]) {
            return postsDetail.length
        } else {
            return 0
        }
    }

    const getFollowing = () => {
        Axios.get(`${API_URL}/users${search}`)
            .then((response) => {
                setUserFollowing(response.data[0].userFollowed.length)
                Axios.get(`${API_URL}/users?userFollowed_like=${response.data[0].username}`)
                    .then((response) => {
                        setUserFollowers(response.data.length)
                    }).catch((error) => {
                        console.log(error)
                    })
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleFollowing = () => {

    }


    return <Container>
        <Box >
            <Box sx={{ mt: 5, mb: 3, display: 'flex', justifyContent: 'center' }}>
                <Avatar
                    src={userDetail ? userDetail.profilePicture : null}
                    sx={{ width: 120, height: 120 }}
                />
            </Box>

            <Typography
                variant="h5"
                component="div"
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                {userDetail ? userDetail.fullName : null}
            </Typography>

            <Typography
                variant="subtitle1"
                component="div"
                color='grey.600'
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                @{userDetail ? userDetail.username : null}
            </Typography>

            <Box
                sx={{ mx: { xs: 8, md: 15, xl: 20 }, mt: 3, justifyContent: 'center' }}>
                <Typography
                    variant="body2"
                    component="div"
                    color='grey.500'
                    sx={{ textAlign: 'center' }}
                >
                    {bio}
                </Typography>

            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }} >
                {userUsername == username ?
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
                    :
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        sx={{ my: 3, width: 200 }}
                        startIcon={<PersonAdd />}
                    >
                        Follow
                    </Button>

                }

            </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', py: 1, borderBottom: 1, borderTop: 1, borderColor: 'divider' }}>
            <Box>
                <Typography
                    variant="body1"
                    component="h1"
                    sx={{ textAlign: 'center' }}
                >
                    {postsDetail ? getPosts() : null}
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
            <Link underline='none' color='inherit' component='button'>
                <Typography
                    variant="body1"
                    component="h1"
                    sx={{ textAlign: 'center' }}
                    onClick={handleFollowing}
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
            </Link>
            <Link underline='none' color='inherit' component='button'>
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
            </Link>
        </Box>
    </Container>
}

export default ProfileInfo;