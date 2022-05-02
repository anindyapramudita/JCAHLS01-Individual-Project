import React from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from "../helper";
import Axios from "axios";
import { Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const CardComponent = (props) => {

    const [database, setDatabase] = React.useState("null")

    const { userFollowed, profPic, username } = useSelector((state) => {
        return {
            userFollowed: state.usersReducer.userFollowed,
            profPic: state.usersReducer.profilePicture,
            username: state.usersReducer.username
        }
    })

    const getDatabase = () => {
        Axios.get(`${API_URL}/users`)
            .then((response) => {
                setDatabase(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    // React.useEffect(() => {
    //     getDatabase()
    // }, [])

    // const getCard = () => {
    //     let posts = [];

    //     for (let i = 0; i < userFollowed.length; i++) {
    //         posts.push(database[userFollowed[i - 1]])
    //         // for (let j = 0; j < userData.posts.length; j++) {
    //         //     if (userData.posts[j].image) {
    //         //         posts.push(userData.posts[j])
    //         //     }
    //         // }
    //     }

    //     // console.log(database[userFollowed[0]].posts)
    //     // console.log(userFollowed)
    //     console.log(posts)

    // }

    // const getCard = async () => {
    //     try {

    //         let posts = []

    //         for (let i = 0; i < userFollowed.length; i++) {
    //             let response = await Axios.get(`${API_URL}/users/${userFollowed[i]}`)
    //             let userData = response.data
    //             console.log(response.data)
    //             for (let j = 0; j < userData.posts.length; j++) {
    //                 if (userData.posts[j].id) {
    //                     return <Card sx={{ maxWidth: 345 }}>
    //                         <CardHeader
    //                             avatar src={userData.profilePicture}
    //                         />
    //                     </Card>
    //                 }
    //             }
    //         }

    //         <Card sx={{ maxWidth: 345 }}>
    //             <CardHeader
    //                 avatar={
    //                     <Avatar src={profPic} />
    //                 }
    //                 title={username}
    //             />
    //             <CardMedia
    //                 component="img"
    //                 height="250"
    //                 image={profPic}
    //                 alt={username}
    //             />
    //             <CardContent>
    //                 <Typography variant="body2" color="text.secondary">
    //                     This impressive paella is a perfect party dish and a fun meal to cook
    //                     together with your guests. Add 1 cup of frozen peas along with the mussels,
    //                     if you like.
    //                 </Typography>
    //             </CardContent>
    //             <CardActions disableSpacing>
    //                 <IconButton aria-label="add to favorites">
    //                     <FavoriteIcon />
    //                 </IconButton>
    //                 <IconButton aria-label="share">
    //                     <ShareIcon />
    //                 </IconButton>
    //             </CardActions>
    //         </Card>


    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return <div className='col-12 m-auto m-3'>

    </div>
}

export default CardComponent;