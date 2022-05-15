import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector } from 'react-redux';
import { useUserPosts } from '../api/use-user-posts';
import { Box } from '@mui/material';
import { API_URL } from '../helper';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function UserPosts() {
    const { id, username } = useSelector((state) => {
        return {
            id: state.usersReducer.id,
            username: state.usersReducer.username
        }
    })


    const { posts } = useUserPosts(id);
    const { search } = useLocation()

    const [userPosts, setUserPosts] = React.useState();

    React.useEffect(() => {
        getUserPosts();
    }, [])

    const getUserPosts = () => {
        Axios.get(`${API_URL}/posts${search}`)
            .then((response) => {
                setUserPosts(response.data)
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <Box fullwidth sx={{ overflowY: 'auto' }}>
            {userPosts ?
                <ImageList variant="masonry" cols={3} gap={8}>
                    {userPosts.map((item) => (
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