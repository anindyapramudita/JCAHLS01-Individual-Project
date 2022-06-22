import React from "react";
import { Avatar, Box, Button, Typography, Container, Link, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import SettingsIcon from '@mui/icons-material/Settings';
import { useUserPosts } from '../api/use-user-posts';
import { useUserData } from '../api/use-user-data';
import Axios from "axios";
import { API_URL } from "../helper";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PersonAdd } from "@mui/icons-material";
import VerifiedIcon from '@mui/icons-material/Verified';

const ProfileInfo = (props) => {
    const [userUsername, setUserUsername] = React.useState();
    const [userDetail, setUserDetail] = React.useState();
    const [postsDetail, setPostsDetail] = React.useState();
    const [userFollowing, setUserFollowing] = React.useState();
    const [userFollowers, setUserFollowers] = React.useState();
    const [likedPost, setLikedPosts] = React.useState();

    const { search } = useLocation()

    const { idUser, profPic, fullname, username, bio, status } = useSelector((state) => {
        return {
            idUser: state.usersReducer.idUser,
            profPic: state.usersReducer.profilePicture,
            fullname: state.usersReducer.fullName,
            username: state.usersReducer.username,
            bio: state.usersReducer.bio,
            // status: state.usersReducer.status
        }
    })

    const { posts } = useUserPosts(idUser);
    const userData = useUserData();
    const navigate = useNavigate();

    React.useEffect(() => {
        getUserDetail();
        getPostsDetail();

    }, [])

    const getUserDetail = () => {
        Axios.get(`${API_URL}/user${search}`)
            .then((response) => {
                setUserDetail(response.data[0])
                setUserUsername(response.data[0].username)

                Axios.get(`${API_URL}/post?likes=${response.data[0].idUser}`)
                    .then((res) => {
                        setLikedPosts(res.data.length)
                    }).catch((error) => {
                        console.log(error)
                    })

            }).catch((error) => {
                console.log(error);
            })
    }

    const getPostsDetail = () => {
        Axios.get(`${API_URL}/post${search}`)
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
        Axios.get(`${API_URL}/user${search}`)
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

    const handleResend = () => {
        let token = localStorage.getItem("tokenIdUser")

        Axios.get(`${API_URL}/user/resend`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            alert(`Verification email has been sent. Please check your email!`)
        }).catch((error) => {
            console.log(error)
        })

    }


    return <Container>
        <Box >
            <Box sx={{ mt: 5, mb: 3, display: 'flex', justifyContent: 'center' }}>
                <Avatar
                    src={userDetail ? userDetail.profilePicture : null}
                    sx={{ width: 120, height: 120 }}
                />
            </Box>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    {userDetail ? userDetail.fullName : null}
                </Typography>
                {userDetail ? userDetail.status == "Verified" ?
                    <VerifiedIcon sx={{ ml: 1 }} color='primary' />
                    :
                    null
                    :
                    null
                }

            </Grid>


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
                    {userDetail ? userDetail.bio : null}
                </Typography>

            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    alignItems: 'center'
                }} >
                {userUsername == username ?
                    <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        sx={{ mt: 3, mb: 2, width: 250 }}
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
                {userDetail ? userDetail.username == username ? userDetail.status == "Unverified" ?
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        sx={{ mb: 3, width: 250 }}
                        onClick={handleResend}>
                        Resend Verification Link
                    </Button>
                    :
                    null : null : null
                }

            </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 1, borderBottom: 1, borderTop: 1, borderColor: 'divider' }}>
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
                    {likedPost ? likedPost : "0"}
                </Typography>
                <Typography
                    variant="body2"
                    component="div"
                    color='grey.500'
                    sx={{ textAlign: 'center' }}
                >
                    Liked post
                </Typography>
            </Link>
            {/* <Link underline='none' color='inherit' component='button'>
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
            </Link> */}
            {/* <Link underline='none' color='inherit' component='button'>
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
            </Link> */}
        </Box>
    </Container>
}

export default ProfileInfo;