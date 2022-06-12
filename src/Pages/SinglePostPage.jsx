import React from "react";
import { API_URL } from "../helper";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import { Box, Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, IconButton, useRadioGroup, Divider, TextField, InputAdornment, ListItemSecondaryAction, Link, Menu, MenuItem } from '@mui/material';
import { FavoriteBorderOutlined, MoreVert, SendOutlined } from '@mui/icons-material';
import Favorite from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import ModalEditPost from "../Components/ModalEditPost";



const SinglePostPage = (props) => {

    const [postDetail, setPostDetail] = React.useState()
    const [userDetail, setUserDetail] = React.useState()
    const [comment, setComment] = React.useState()
    const [postUsername, setPostUsername] = React.useState()
    const [postId, setPostId] = React.useState()

    const [caption, setCaption] = React.useState()
    const [databaseEdit, setDatabaseEdit] = React.useState({
        username: "",
        caption: "",
        image: [],
    })
    const [openModalEdit, setOpenModalEdit] = React.useState(false)



    const [anchorEl, setAnchorEl] = React.useState(null);

    const navigate = useNavigate();

    const { search } = useLocation()

    const { profPic, username } = useSelector((state) => {
        return {
            profPic: state.usersReducer.profilePicture,
            username: state.usersReducer.username
        }
    })

    React.useEffect(() => {
        getPostDetail();
    }, [])

    const getPostDetail = () => {
        Axios.get(`${API_URL}/posts${search}`)
            .then((response) => {
                setPostDetail(response.data[0])
                Axios.get(`${API_URL}/users?username=${response.data[0].username}`)
                    .then((response) => {
                        setUserDetail(response.data[0])
                    }).catch((error) => {
                        console.log(error)
                    })
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleOpenMenu = (usernamePost, idPost, event) => {
        setAnchorEl(event.currentTarget)
        setPostUsername(usernamePost)
        setPostId(idPost)
    }

    const handleComment = (comment, id) => {
        let tempComment = [];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const d = new Date();
        let day = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        let dateCreated = `${month} ${day}, ${year}`


        Axios.get(`${API_URL}/posts/${id}`)
            .then((response) => {
                tempComment = [...response.data.comments]
                if (tempComment[0].username) {
                    tempComment.push({ username, comment, dateCreated })
                    // setComments(tempComment)
                    Axios.patch(`${API_URL}/posts/${id}`, { comments: tempComment })
                        .then((response) => {
                            setComment("")
                            getPostDetail();
                        }).catch((error) => {
                            console.log(error)
                        })
                } else {
                    tempComment[0] = { username, comment, dateCreated }
                    // setComments(tempComment)
                    Axios.patch(`${API_URL}/posts/${id}`, { comments: tempComment })
                        .then((response) => {
                            setComment("")
                            getPostDetail();
                        }).catch((error) => {
                            console.log(error)
                        })
                }
                // console.log(tempComment)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleLike = (id) => {
        let tempLike = [];
        Axios.get(`${API_URL}/posts/${id}`)
            .then((response) => {
                tempLike = [...response.data.userLiked]
                tempLike.push(username)
                Axios.patch(`${API_URL}/posts/${id}`, { userLiked: tempLike })
                    .then((response) => {
                        getPostDetail();
                    }).catch((error) => {
                        console.log(error)
                    })
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleUnlike = (id) => {
        let tempUnlike = [];
        Axios.get(`${API_URL}/posts/${id}`)
            .then((response) => {
                tempUnlike = [...response.data.userLiked]
                let index = tempUnlike.findIndex((value) => value == username)
                tempUnlike.splice(index, 1)
                Axios.patch(`${API_URL}/posts/${id}`, { userLiked: tempUnlike })
                    .then((response) => {
                        getPostDetail();
                    }).catch((error) => {
                        console.log(error)
                    })
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleDeletePost = (postId) => {
        Axios.delete(`${API_URL}/posts/${postId}`)
            .then((response) => {
                setAnchorEl(null)
                navigate(0)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleEditPost = (postId) => {
        Axios.get(`${API_URL}/posts/${postId}`)
            .then((response) => {
                setOpenModalEdit(true)
                setAnchorEl(null)
                setDatabaseEdit(response.data)
                setCaption(response.data.caption)
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    return <div>
        <NavigationBar />
        {postDetail && userDetail ?
            <Box fullwidth sx={{ display: 'flex', my: 4, mx: { xs: 3, md: 0 }, justifyContent: 'center' }}>
                <Card sx={{ width: { xs: '100%', md: '80%' }, maxWidth: '600px' }}>
                    <Box sx={{ display: 'flex', mx: 2, my: 2 }}>
                        <Box>
                            <IconButton onClick={() => navigate(`/profile?username=${userDetail.username}`)}>
                                <Avatar
                                    src={userDetail.profilePicture}
                                    sx={{ width: 40, height: 40 }}
                                />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1, mt: 0.5, ml: 1 }}>
                            <Link
                                variant='body2'
                                component='button'
                                underline='none'
                                color='inherit'
                                onClick={() => navigate(`/profile?username=${userDetail.username}`)}
                            >
                                {userDetail.username}
                            </Link>
                            <Typography variant='body2' component='h1' sx={{ color: 'grey.600' }}>
                                {postDetail.dateCreated}
                            </Typography>

                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <IconButton aria-label="settings" onClick={(event) => handleOpenMenu(postDetail.username, postDetail.id, event)}>
                                <MoreVert />
                            </IconButton>
                        </Box>
                    </Box>
                    <img src={postDetail.image[0]} style={{ width: "100%" }} />
                    {/* <CardMedia
                component="img"
                // height="500"
                image={item.image[0]}
                alt={item.username}
            /> */}

                    <CardActions sx={{ mb: 0 }} disableSpacing>
                        <IconButton>
                            {postDetail.userLiked.includes(username) ? <Favorite sx={{ color: 'secondary.main' }} onClick={() => handleUnlike(postDetail.id)} /> : <FavoriteBorderOutlined onClick={() => handleLike(postDetail.id)} />}
                        </IconButton>
                        <Typography variant='body2'>
                            {postDetail.userLiked.length > 2 && postDetail.userLiked.includes(username) ? `You and ${postDetail.userLiked.length - 1} others like this post`
                                : postDetail.userLiked.length == 2 && postDetail.userLiked.includes(username) ? `You and ${postDetail.userLiked.length - 1} other like this post`
                                    : postDetail.userLiked.length == 1 && postDetail.userLiked.includes(username) ? `You like this post`
                                        : postDetail.userLiked.length > 2 ? `${postDetail.userLiked[0]} and ${postDetail.userLiked.length - 1} others like this post`
                                            : postDetail.userLiked.length == 2 ? `${postDetail.userLiked[0]} and ${postDetail.userLiked.length - 1} other like this post`
                                                : postDetail.userLiked.length == 1 ? `${postDetail.userLiked[0]} likes this post`
                                                    : null}
                        </Typography>
                    </CardActions>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ width: '100%', flexGrow: 1 }}>
                            <Typography sx={{ ml: 2 }}>
                                <Link underline='none' color='inherit' component='button' onClick={() => navigate(`/profile?username=${userDetail.username}`)}>
                                    <Typography variant='subtitle2' component='span' sx={{ mr: 1 }} >
                                        {userDetail.username}
                                    </Typography>
                                    <Typography variant='body2' component='span'>
                                        {postDetail.caption}
                                    </Typography>
                                </Link>
                                <Typography variant='body2'>
                                    {postDetail.comments[0].username ? postDetail.comments.map((value, index) => {
                                        return <Typography key={`k-${index}`}>
                                            <Link underline='none' color='inherit' component='button' onClick={() => navigate(`/profile?username=${value.username}`)}>
                                                <Typography variant='subtitle2' component='span' sx={{ mr: 1 }}>
                                                    {value.username}
                                                </Typography>
                                                <Typography variant='body2' component='span'>
                                                    {value.comment}
                                                </Typography>
                                            </Link>
                                        </Typography>
                                    })
                                        : null
                                    }
                                </Typography>
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Avatar
                                        src={profPic}
                                        sx={{ mr: 2, width: 30, height: 30 }}
                                    />
                                    <TextField fullWidth id="input-with-sx" label="say something!" variant="standard" value={comment} onChange={(e) => setComment(e.target.value)} />
                                    <IconButton onClick={() => handleComment(comment, postDetail.id)}>
                                        <SendOutlined sx={{ ml: 2, color: 'grey.700' }} />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Box>
                    </Box>
                </Card>
            </Box>

            : null}

        {postUsername == username ?
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => { handleEditPost(postId) }}>Edit Post</MenuItem>
                <MenuItem onClick={() => handleDeletePost(postId)}>Delete Post</MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>Share Post</MenuItem>
            </Menu>
            :
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => setAnchorEl(null)}>Share Post</MenuItem>
            </Menu>
        }
        <ModalEditPost
            postId={postId}
            isOpen={openModalEdit}
            toggle={() => {
                setOpenModalEdit(!openModalEdit)
                getPostDetail();
            }}
            data={databaseEdit}
            caption={caption}
        />
    </div>

}

export default SinglePostPage;