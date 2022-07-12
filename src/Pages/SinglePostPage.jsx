import React from "react";
import { API_URL } from "../helper";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import { Button, Box, Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, IconButton, useRadioGroup, Divider, TextField, InputAdornment, ListItemSecondaryAction, Link, Menu, MenuItem } from '@mui/material';
import { FavoriteBorderOutlined, MoreVert, SendOutlined } from '@mui/icons-material';
import Favorite from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import ModalEditPost from "../Components/ModalEditPost";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from "axios";
import ModalShare from "../Components/ModalShare";
import { Helmet } from "react-helmet";



const SinglePostPage = (props) => {

    const [allAccount, setAllAccount] = React.useState()
    const [database, setDatabase] = React.useState()
    const [usersProfPic, setUsersProfPic] = React.useState()
    const [usersFullName, setUsersFullName] = React.useState()
    const [usersUsername, setUsersUsername] = React.useState()
    const [comment, setComment] = React.useState()
    const [postUsername, setPostUsername] = React.useState()
    const [postId, setPostId] = React.useState()

    const [seeMoreStatus, setSeeMoreStatus] = React.useState(false)

    const [dataComment, setDataComment] = React.useState([])
    const [commentLimit, setCommentLimit] = React.useState(5)
    const [commentPage, setCommentPage] = React.useState(1)

    const [moreComment, setMoreComment] = React.useState({})

    const [nextData, setNextData] = React.useState()

    const [databaseEdit, setDatabaseEdit] = React.useState({
        username: "",
        caption: "",
        image: [],
    })
    const [caption, setCaption] = React.useState()

    const [openModalEdit, setOpenModalEdit] = React.useState(false)
    const [openModalShare, setOpenModalShare] = React.useState(false)

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const { search } = useLocation()

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
        handleGetComment(5, 1)
    }, [])

    const getDatabase = () => {
        let tempUsers = [username]
        let query = '?'

        let tempProfPic = {}
        let tempFullName = {}
        let tempUsername = {}

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

        Axios.get(`${API_URL}/posting${search}`)
            .then((response) => {
                setDatabase(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleGetComment = (limit, page) => {
        axios.get(`${API_URL}/posting/getComment${search}&limit=${limit}&page=${page}`)
            .then((response) => {
                let temp = [...dataComment, ...response.data.comment]
                // console.log("temp :", temp)
                // temp[page - 1] = (response.data)
                setDataComment(temp)
                setNextData(response.data.nextData)
                // console.log(response.data[response.data.length - 1].nextData)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleComment = (comment, id) => {
        Axios.post(`${API_URL}/posting/addComment?idPost=${id}`, { idCommenter: idUser, comment })
            .then((response) => {
                axios.get(`${API_URL}/posting/getComment${search}&limit=${commentLimit * commentPage}&page=1`)
                    .then((response) => {
                        let temp = [...response.data.comment]
                        setDataComment(temp)
                        setNextData(response.data.nextData)
                    }).catch((error) => {
                        console.log(error)
                    })
                setComment("")
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleLike = (id) => {
        Axios.post(`${API_URL}/posting/like`, { idPost: id, idLiker: idUser })
            .then((response) => {
                getDatabase();
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleUnlike = (id) => {
        Axios.patch(`${API_URL}/posting/unlike`, { idPost: id, idLiker: idUser })
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
        Axios.delete(`${API_URL}/posting/delete?idPost=${postId}`)
            .then((response) => {
                setAnchorEl(null)
                navigate('/')
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleEditPost = (postId) => {
        console.log(postId)
        Axios.get(`${API_URL}/posting?idPost=${postId}`)
            .then((response) => {
                setDatabaseEdit(response.data[0])
                setCaption(response.data[0].caption)
                setOpenModalEdit(true)
                setAnchorEl(null)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleSeeMore = () => {
        let newPage = commentPage + 1
        setCommentPage(newPage)
        setSeeMoreStatus(true)

        axios.get(`${API_URL}/posting/getComment${search}&limit=${commentLimit}&page=${newPage}`)
            .then((response) => {
                let temp = [...dataComment, ...response.data.comment]
                setDataComment(temp)
                setNextData(response.data.nextData)
                setSeeMoreStatus(false)
            }).catch((error) => {
                console.log(error)
                setSeeMoreStatus(false)
            })

        // handleGetComment(commentLimit, commentPage)
    }

    const handleShare = (postId) => {
        Axios.get(`${API_URL}/posting?idPost=${postId}`)
            .then((response) => {
                setDatabaseEdit(response.data[0])
                setOpenModalShare(!openModalShare)
                setAnchorEl(null)
            }).catch((error) => {
                console.log(error)
            })
    }

    return <div>
        <NavigationBar />
        {database ?
            <Box>
                <Helmet>
                    <meta
                        property="title"
                        key="title"
                        content={`@${database[0].username}`}
                    />
                    <meta
                        property="og:description"
                        key="og:description"
                        content={`Hey! Check out this image by ${database[0].fullName}`}
                    />
                    <meta
                        property="og:image"
                        key="og:image"
                        content={`${API_URL}/${database[0].image}`}
                    />
                </Helmet>
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
                        <MenuItem onClick={() => handleShare(postId)}>Share Post</MenuItem>
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
                        <MenuItem onClick={() => handleShare(postId)}>Share Post</MenuItem>
                    </Menu>
                }
                <Box fullwidth sx={{ display: 'flex', my: 4, mx: { xs: 3, md: 0 }, justifyContent: 'center' }}>
                    <Card sx={{ width: { xs: '100%', md: '80%' }, maxWidth: '600px' }}>
                        <Box sx={{ display: 'flex', mx: 2, my: 2 }}>
                            <Box>
                                <IconButton onClick={() => navigate(`/profile?username=${database[0].username}`)}>
                                    <Avatar
                                        src={`${API_URL}${usersProfPic[database[0].idUser]}`}
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
                                    onClick={() => navigate(`/profile?username=${database[0].username}`)}
                                >
                                    {database[0].fullName}
                                    {/* {usersFullName[`${item.username}`]} */}
                                </Link>
                                <Typography variant='body2' component='h1' sx={{ color: 'grey.600' }}>
                                    {database[0].dateCreated}
                                </Typography>

                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <IconButton aria-label="settings" onClick={(event) => handleOpenMenu(database[0].username, database[0].idPost, event)}>
                                    <MoreVert />
                                </IconButton>
                            </Box>
                        </Box>
                        <img src={`${API_URL}${database[0].image}`} style={{ width: "100%" }} />

                        <CardActions sx={{ mb: 0 }} disableSpacing>
                            <IconButton>
                                {database[0].likes.includes(idUser) ? <Favorite sx={{ color: 'secondary.main' }} onClick={() => handleUnlike(database[0].idPost)} /> : <FavoriteBorderOutlined onClick={() => handleLike(database[0].idPost)} />}
                            </IconButton>
                            <Typography variant='body2'>
                                {database[0].likes.length > 2 && database[0].likes.includes(idUser) ? `You and ${database[0].likes.length - 1} others like this post`
                                    : database[0].likes.length == 2 && database[0].likes.includes(idUser) ? `You and ${database[0].likes.length - 1} other like this post`
                                        : database[0].likes.length == 1 && database[0].likes.includes(idUser) ? `You like this post`
                                            : database[0].likes.length > 2 ? `${usersUsername[`${database[0].likes[0]}`]} and ${database[0].likes.length - 1} others like this post`
                                                : database[0].likes.length == 2 ? `${usersUsername[`${database[0].likes[0]}`]} and ${database[0].likes.length - 1} other like this post`
                                                    : database[0].likes.length == 1 ? `${usersUsername[`${database[0].likes[0]}`]} likes this post`
                                                        : null}
                            </Typography>
                        </CardActions>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ width: '100%', flexGrow: 1 }}>
                                <Box sx={{ ml: 2, mb: 2 }}>
                                    <Link underline='none' color='inherit' component='button' onClick={() => navigate(`/profile?username=${database[0].username}`)}>
                                        <Typography variant='subtitle2' component='span' sx={{ mr: 1 }} >
                                            {database[0].username}
                                        </Typography>
                                        <Typography variant='body2' component='span'>
                                            {database[0].caption}
                                        </Typography>
                                    </Link>
                                </Box>
                                <Divider />
                                <Box sx={{ ml: 2, mt: 2 }}>
                                    {/* {dataComment[0] ? handlePrintComment(1) : null} */}

                                    {dataComment[0] ?
                                        dataComment.map((value, index) => {
                                            return <Box key={`k-${index}`}>
                                                <Link underline='none' color='inherit' component='button' onClick={() => navigate(`/profile?username=${usersUsername[`${value.idUser}`]}`)}>
                                                    <Typography variant='subtitle2' component='span' sx={{ mr: 1 }}>
                                                        {usersUsername[`${value.idUser}`]}
                                                    </Typography>
                                                    <Typography variant='body2' component='span'>
                                                        {value.comment}
                                                    </Typography>
                                                </Link>
                                            </Box>
                                        })
                                        : null}

                                </Box>

                                {nextData ?
                                    <Box sx={{ ml: 1, mt: 2, display: "flex", justifyContent: 'center' }} fullWidth >
                                        <Button startIcon={<AddCircleOutlineIcon />} size="small" onClick={() => handleSeeMore()} variant="outlined" fullWidth disabled={seeMoreStatus}>
                                            See More
                                        </Button>
                                    </Box>
                                    : null
                                }

                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <Avatar
                                            src={`${API_URL}${profPic}`}
                                            sx={{ mr: 2, width: 30, height: 30 }}
                                        />
                                        <TextField fullWidth id="input-with-sx" label="say something!" variant="standard" value={comment} inputProps={{ maxLength: 300 }} multiline onChange={(e) => setComment(e.target.value)} />
                                        <IconButton onClick={() => handleComment(comment, database[0].idPost)}>
                                            <SendOutlined sx={{ ml: 2, color: 'grey.700' }} />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Box>
                        </Box>
                    </Card>
                </Box>
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
                <ModalShare
                    postId={postId}
                    isOpen={openModalShare}
                    toggle={() => {
                        setOpenModalShare(!openModalShare)
                    }}
                    data={databaseEdit}
                />
            </Box>
            : null
        }
    </div>
}

export default SinglePostPage;