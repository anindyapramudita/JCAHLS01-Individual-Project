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
import ModalEditPost from './ModalEditPost';

const CardComponent = (props) => {

    const [allAccount, setAllAccount] = React.useState()
    const [database, setDatabase] = React.useState()
    const [usersProfPic, setUsersProfPic] = React.useState()
    const [usersFullName, setUsersFullName] = React.useState()
    const [usersUsername, setUsersUsername] = React.useState()
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


    const { userFollowed, profPic, username, idUser } = useSelector((state) => {
        return {
            userFollowed: state.usersReducer.userFollowed,
            profPic: state.usersReducer.profilePicture,
            username: state.usersReducer.username,
            idUser: state.usersReducer.idUser
        }
    })

    React.useEffect(() => {
        getDatabase();
    }, [])

    const getDatabase = () => {
        // let tempUsers = [username, ...userFollowed]
        let tempUsers = [username]
        let query = '?'

        let tempProfPic = {}
        let tempFullName = {}
        let tempUsername = {}

        // for (let i = 0; i < tempUsers.length; i++) {
        //     query += `username=${tempUsers[i]}&`
        //     // Axios.get(`${API_URL}/users?username=${tempUsers[i]}`)
        //     Axios.get(`${API_URL}/user`)
        //         .then((response) => {
        //             tempProfPic[`${tempUsers[i]}`] = response.data[0].profilePicture
        //             tempFullName[`${tempUsers[i]}`] = response.data[0].fullName
        //         }).catch((error) => {
        //             console.log(error)
        //         })
        //     }

        Axios.get(`${API_URL}/user`)
            .then((response) => {
                setAllAccount(response.data)
                for (let i = 0; i < response.data.length; i++) {
                    tempProfPic[`${response.data[i].idUser}`] = response.data[i].profilePicture
                    tempFullName[`${response.data[i].idUser}`] = response.data[i].fullName
                    tempUsername[`${response.data[i].idUser}`] = response.data[i].username
                }
            }).catch((error) => {
                console.log(error)
            })

        setUsersProfPic(tempProfPic)
        setUsersFullName(tempFullName)
        setUsersUsername(tempUsername)

        Axios.get(`${API_URL}/post${query}order=desc`)
            // Axios.get(`${API_URL}/posts${query}&_sort=id&_order=desc`)
            .then((response) => {
                setDatabase(response.data)
                console.log("data posts: ", response.data)
            }).catch((error) => {
                console.log(error)
            })
    }


    const handleComment = (comment, id) => {
        // let tempComment = [];

        Axios.post(`${API_URL}/post/addComment?idPost=${id}`, { idCommenter: idUser, comment })
            .then((response) => {
                getDatabase();
                setComment("")

                // Axios.get(`${API_URL}/posts/${id}`)
                //     .then((response) => {
                //         tempComment = [...response.data.comments]
                //         if (tempComment[0].username) {
                //             tempComment.push({ username, comment, dateCreated })
                //             // setComments(tempComment)
                //             Axios.patch(`${API_URL}/posts/${id}`, { comments: tempComment })
                //                 .then((response) => {
                //                     setComment("")
                //                     getDatabase();
                //                 }).catch((error) => {
                //                     console.log(error)
                //                 })
                //         } else {
                //             tempComment[0] = { username, comment, dateCreated }
                //             // setComments(tempComment)
                //             Axios.patch(`${API_URL}/posts/${id}`, { comments: tempComment })
                //                 .then((response) => {
                //                     setComment("")
                //                     getDatabase();
                //                 }).catch((error) => {
                //                     console.log(error)
                //                 })
                //         }

            }).catch((error) => {
                console.log(error)
            })
    }

    const handleLike = (id) => {
        Axios.post(`${API_URL}/post/like`, { idPost: id, idLiker: idUser })
            .then((response) => {
                getDatabase();
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleUnlike = (id) => {
        Axios.patch(`${API_URL}/post/unlike`, { idPost: id, idLiker: idUser })
            .then((response) => {
                getDatabase();
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
        console.log(postId)
        Axios.get(`${API_URL}/post?idPost=${postId}`)
            .then((response) => {
                setDatabaseEdit(response.data[0])
                setCaption(response.data[0].caption)
                setOpenModalEdit(true)
                setAnchorEl(null)
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
                                            src={usersProfPic[`${item.idUser}`]}
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
                                        {item.fullName}
                                        {/* {usersFullName[`${item.username}`]} */}
                                    </Link>
                                    <Typography variant='body2' component='h1' sx={{ color: 'grey.600' }}>
                                        {item.dateCreated}
                                    </Typography>

                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <IconButton aria-label="settings" onClick={(event) => handleOpenMenu(item.username, item.idPost, event)}>
                                        <MoreVert />
                                    </IconButton>
                                </Box>
                            </Box>
                            <img src={item.image} style={{ width: "100%" }} />

                            <CardActions sx={{ mb: 0 }} disableSpacing>
                                <IconButton>
                                    {item.likes.includes(idUser) ? <Favorite sx={{ color: 'secondary.main' }} onClick={() => handleUnlike(item.idPost)} /> : <FavoriteBorderOutlined onClick={() => handleLike(item.idPost)} />}
                                </IconButton>
                                <Typography variant='body2'>
                                    {item.likes.length > 2 && item.likes.includes(idUser) ? `You and ${item.likes.length - 1} others like this post`
                                        : item.likes.length == 2 && item.likes.includes(idUser) ? `You and ${item.likes.length - 1} other like this post`
                                            : item.likes.length == 1 && item.likes.includes(idUser) ? `You like this post`
                                                : item.likes.length > 2 ? `${usersUsername[`${item.likes[0]}`]} and ${item.likes.length - 1} others like this post`
                                                    : item.likes.length == 2 ? `${usersUsername[`${item.likes[0]}`]} and ${item.likes.length - 1} other like this post`
                                                        : item.likes.length == 1 ? `${usersUsername[`${item.likes[0]}`]} likes this post`
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
                                            {item.comment[0] ? item.comment.map((value, index) => {
                                                return <Typography key={`k-${index}`}>
                                                    <Link underline='none' color='inherit' component='button' onClick={() => navigate(`/profile?username=${usersUsername[`${value.idUser}`]}`)}>
                                                        <Typography variant='subtitle2' component='span' sx={{ mr: 1 }}>
                                                            {usersUsername[`${value.idUser}`]}
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
                                            <IconButton onClick={() => handleComment(comment, item.idPost)}>
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