import React from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from "../helper";
import Axios from "axios";
import { Box, Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, IconButton, useRadioGroup, Divider, TextField, InputAdornment, ListItemSecondaryAction } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { NavItem } from 'reactstrap';
import { FavoriteBorder, FavoriteBorderOutlined, IosShareOutlined, MoreVert, SendOutlined, SendToMobile, SendToMobileOutlined } from '@mui/icons-material';
import Favorite from '@mui/icons-material/Favorite';
import Share from '@mui/icons-material/Share';

const CardComponent = (props) => {

    const [database, setDatabase] = React.useState()
    const [usersProfPic, setUsersProfPic] = React.useState()
    const [usersFullName, setUsersFullName] = React.useState()

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

    return <div>
        {database ?
            database.map((item) => {
                return <Box fullwidth sx={{ display: { xs: 'block', md: 'flex' }, my: 3, mx: { xs: 3, md: 0 }, justifyContent: 'center' }}>
                    <Card
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <CardHeader

                            avatar={
                                <Avatar
                                    src={usersProfPic[`${item.username}`]}
                                />
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <Share />
                                    {/* <MoreVert /> */}
                                </IconButton>
                            }
                            title={usersFullName[`${item.username}`]}
                            subheader={item.dateCreated}
                        />

                    </Card>
                    <Card sx={{ width: { xs: '100%', md: '50%' } }}>
                        <CardMedia
                            component="img"
                            // height="500"
                            image={item.image[0]}
                            alt={item.username}
                        />
                    </Card>
                    <Card sx={{ width: { xs: '100%', md: '40%' } }}>
                        <CardHeader sx={{ display: { xs: 'none', md: 'flex' } }}
                            avatar={
                                <Avatar
                                    src={usersProfPic[`${item.username}`]}
                                />
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVert />
                                </IconButton>
                            }
                            title={usersFullName[`${item.username}`]}
                            subheader={item.dateCreated}
                        />
                        <CardActions sx={{ mb: 0 }} disableSpacing>
                            <IconButton>
                                {item.userLiked.includes(username) ? <Favorite sx={{ color: 'secondary.main' }} /> : <FavoriteBorderOutlined />}
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
                        {/* <CardContent> */}
                        <Typography sx={{ ml: 2 }}>
                            <Typography variant='subtitle2' component='span' sx={{ mr: 1 }}>
                                {item.username}
                            </Typography>
                            <Typography variant='body2' component='span'>
                                {item.caption}
                            </Typography>
                            <Typography variant='body2'>
                                {item.comments[0].username ? item.comments.map((value) => {
                                    return <Typography>
                                        <Typography variant='subtitle2' component='span' sx={{ mr: 1 }}>
                                            {value.username}
                                        </Typography>
                                        <Typography variant='body2' component='span'>
                                            {value.comment}
                                        </Typography>
                                    </Typography>
                                })
                                    : null
                                }
                            </Typography>
                        </Typography>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Avatar
                                    src={profPic}
                                    sx={{ mr: 2, width: 30, height: 30 }}
                                />
                                <TextField fullWidth id="input-with-sx" label="say something!" variant="standard" />
                                <SendOutlined sx={{ ml: 2, color: 'grey.700' }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            })
            : null
        }
    </div>
}

export default CardComponent;