import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector } from 'react-redux';
import { useUserPosts } from '../api/use-user-posts';
import { Box } from '@mui/material';
import Axios from 'axios';
import { API_URL } from '../helper';
import { useUserData } from '../api/use-user-data';
import { useLocation } from 'react-router-dom';

export default function UserLikedPosts() {
    const { id, username } = useSelector((state) => {
        return {
            id: state.usersReducer.id,
            username: state.usersReducer.username
        }
    })

    const { search } = useLocation()
    const { posts } = useUserPosts(id);
    const [likedPosts, setLikedPosts] = React.useState();

    React.useEffect(() => {
        getLikedPosts();
    }, [])


    const getLikedPosts = () => {
        Axios.get(`${API_URL}/users${search}`)
            .then((response) => {
                Axios.get(`${API_URL}/posts?userLiked_like=${response.data[0].username}`)
                    .then((response) => {
                        setLikedPosts(response.data)
                    }).catch((error) => {
                        console.log(error)
                    })
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <Box fullwidth sx={{ overflowY: 'auto' }}>
            {likedPosts ?
                <ImageList variant="masonry" cols={3} gap={8}>
                    {likedPosts.map((item) => (
                        <ImageListItem key={item.image}>
                            <img
                                src={`${item.image}`}
                                srcSet={`${item.image}`}
                                // src={`${item.image}?w=248&fit=crop&auto=format`}
                                // srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                //   alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                : null}
        </Box>
    );
}