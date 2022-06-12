import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector } from 'react-redux';
import { useUserPosts } from '../api/use-user-posts';
import { Box } from '@mui/material';
import { API_URL } from '../helper';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function UserPosts() {
    const { id, username } = useSelector((state) => {
        return {
            id: state.usersReducer.id,
            username: state.usersReducer.username
        }
    })


    const { posts } = useUserPosts(id);
    const { search } = useLocation()

    const navigate = useNavigate()

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
                                loading="lazy"
                                onClick={() => navigate(`/post?id=${item.id}`)}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                : null}
        </Box>
    );
}