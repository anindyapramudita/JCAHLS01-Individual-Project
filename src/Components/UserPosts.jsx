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
import NoPost from './NoPost';

export default function UserPosts() {
    const { idUser, username } = useSelector((state) => {
        return {
            idUser: state.usersReducer.idUser,
            username: state.usersReducer.username
        }
    })


    // const { posts } = useUserPosts(id);
    const { search } = useLocation()

    const navigate = useNavigate()

    const [userPosts, setUserPosts] = React.useState();

    React.useEffect(() => {
        getUserPosts();
    }, [])

    const getUserPosts = () => {
        Axios.get(`${API_URL}/posting${search}`)
            .then((response) => {
                setUserPosts(response.data)
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <Box fullwidth sx={{ overflowY: 'auto' }}>
            {userPosts ? userPosts.length > 0 ?
                <ImageList variant="masonry" cols={3} gap={8}>
                    {userPosts.map((item) => (
                        <ImageListItem key={item.image}>
                            <img
                                src={`${API_URL}${item.image}`}
                                srcSet={`${API_URL}${item.image}`}
                                loading="lazy"
                                onClick={() => navigate(`/post?idPost=${item.idPost}`)}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                : <NoPost /> : null}
        </Box>
    );
}