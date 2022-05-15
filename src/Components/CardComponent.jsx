import React from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from "../helper";
import Axios from "axios";
import { Box, Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, IconButton, useRadioGroup, Divider, TextField, InputAdornment, ListItemSecondaryAction, Link, Menu, MenuItem } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { FavoriteBorder, FavoriteBorderOutlined, IosShareOutlined, MoreVert, SendOutlined, SendToMobile, SendToMobileOutlined } from '@mui/icons-material';
import Favorite from '@mui/icons-material/Favorite';
import Share from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalEditPost from './ModalEditPost';

const CardComponent = (props) => {

    const [database, setDatabase] = React.useState()
    const [usersProfPic, setUsersProfPic] = React.useState()
    const [usersFullName, setUsersFullName] = React.useState()
    const [comment, setComment] = React.useState()
    const [postUsername, setPostUsername] = React.useState()
    const [postId, setPostId] = React.useState()

    const [databaseEdit, setDatabaseEdit] = React.useState({
        username: "",
        caption: "",
        image: [],
    })
    const [caption, setCaption] = React.useState()

    const [openModalEdit, setOpenModalEdit] = React.useState(false)

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);


    const { userFollowed, profPic, username } = useSelector((state) => {
        return {
            userFollowed: state.usersReducer.userFollowed,
            profPic: state.usersReducer.profilePicture,
            username: state.usersReducer.username
        }
    })

    React.useEffect(() => {
        getDatabase();
    }, [])

    const getDatabase = () => {
        let tempUsers = [username, ...userFollowed]
        let query = '?'

        let tempProfPic = {}
        let tempFullName = {}

        for (let i = 0; i < tempUsers.length; i++) {
            query += `username=${tempUsers[i]}&`
            Axios.get(`${API_URL}/users?username=${tempUsers[i]}`)
                .then((response) => {
                    tempProfPic[`${tempUsers[i]}`] = response.data[0].profilePicture
                    tempFullName[`${tempUsers[i]}`] = response.data[0].fullName
                }).catch((error) => {
                    console.log(error)
                })
        }

        setUsersProfPic(tempProfPic)
        setUsersFullName(tempFullName)

        Axios.get(`${API_URL}/posts${query}&_sort=id&_order=desc`)
            .then((response) => {
                setDatabase(response.data)
            }).catch((error) => {
                console.log(error)
            })
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
                            getDatabase();
                        }).catch((error) => {
                            console.log(error)
                        })
                } else {
                    tempComment[0] = { username, comment, dateCreated }
                    // setComments(tempComment)
                    Axios.patch(`${API_URL}/posts/${id}`, { comments: tempComment })
                        .then((response) => {
                            setComment("")
                            getDatabase();
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
                        getDatabase();
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
                        getDatabase();
                    }).catch((error) => {
                        console.log(error)
                    })
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleOpenMenu = (usernamePost, idPost, event) => {
        setAnchorEl(event.currentTarget)
        setPostUsername(usernamePost)
        setPostId(idPost)
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
        {database ?
            <Box>
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
                {database.map((item) => {
                    return <Box fullwidth sx={{ display: 'flex', my: 4, mx: { xs: 3, md: 0 }, justifyContent: 'center' }}>
                        <Card sx={{ width: { xs: '100%', md: '80%' }, maxWidth: '600px' }}>
                            <Box sx={{ display: 'flex', mx: 2, my: 2 }}>
                                <Box>
                                    <IconButton onClick={() => navigate(`/profile?username=${item.username}`)}>
                                        <Avatar
                                            src={usersProfPic[`${item.username}`]}
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
                                        onClick={() => navigate(`/profile?username=${item.username}`)}
                                    >
                                        {usersFullName[`${item.username}`]}
                                    </Link>
                                    <Typography variant='body2' component='h1' sx={{ color: 'grey.600' }}>
                                        {item.dateCreated}
                                    </Typography>

                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <IconButton aria-label="settings" onClick={(event) => handleOpenMenu(item.username, item.id, event)}>
                                        <MoreVert />
                                    </IconButton>
                                </Box>
                            </Box>
                            <img src={item.image[0]} style={{ width: "100%" }} />
                            {/* <CardMedia
                                component="img"
                                // height="500"
                                image={item.image[0]}
                                alt={item.username}
                            /> */}

                            <CardActions sx={{ mb: 0 }} disableSpacing>
                                <IconButton>
                                    {item.userLiked.includes(username) ? <Favorite sx={{ color: 'secondary.main' }} onClick={() => handleUnlike(item.id)} /> : <FavoriteBorderOutlined onClick={() => handleLike(item.id)} />}
                                </IconButton>
                                <Typography variant='body2'>
                                    {item.userLiked.length > 2 && item.userLiked.includes(username) ? `You and ${item.userLiked.length - 1} others like this post`
                                        : item.userLiked.length == 2 && item.userLiked.includes(username) ? `You and ${item.userLiked.length - 1} other like this post`
                                            : item.userLiked.length == 1 && item.userLiked.includes(username) ? `You like this post`
                                                : item.userLiked.length > 2 ? `${item.userLiked[0]} and ${item.userLiked.length - 1} others like this post`
                                                    : item.userLiked.length == 2 ? `${item.userLiked[0]} and ${item.userLiked.length - 1} other like this post`
                                                        : item.userLiked.length == 1 ? `${item.userLiked[0]} likes this post`
                                                            : null}
                                </Typography>
                            </CardActions>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ width: '100%', flexGrow: 1 }}>
                                    <Typography sx={{ ml: 2 }}>
                                        <Link underline='none' color='inherit' component='button' onClick={() => navigate(`/profile?username=${item.username}`)}>
                                            <Typography variant='subtitle2' component='span' sx={{ mr: 1 }} >
                                                {item.username}
                                            </Typography>
                                            <Typography variant='body2' component='span'>
                                                {item.caption}
                                            </Typography>
                                        </Link>
                                        <Typography variant='body2'>
                                            {item.comments[0].username ? item.comments.map((value) => {
                                                return <Typography>
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
                                            <IconButton onClick={() => handleComment(comment, item.id)}>
                                                <SendOutlined sx={{ ml: 2, color: 'grey.700' }} />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                })}
                <ModalEditPost
                    postId={postId}
                    isOpen={openModalEdit}
                    toggle={() => {
                        setOpenModalEdit(!openModalEdit)
                        getDatabase();
                    }}
                    data={databaseEdit}
                    caption={caption}
                />
            </Box>
            : null
        }
    </div>
}

export default CardComponent;