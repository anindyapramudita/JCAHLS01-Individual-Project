import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector } from 'react-redux';
import { useUserPosts } from '../api/use-user-posts';
import { Box } from '@mui/material';
import { API_URL } from '../helper';
import Axios from 'axios';

export default function UserPosts() {
    const { id, username } = useSelector((state) => {
        return {
            id: state.usersReducer.id,
            username: state.usersReducer.username
        }
    })


    const { posts } = useUserPosts(id);

    const [userPosts, setUserPosts] = React.useState();

    React.useEffect(() => {
        getUserPosts();
    }, [])

    const getUserPosts = () => {
        Axios.get(`${API_URL}/posts?username_like=${username}`)
            .then((response) => {
                setUserPosts(response.data)
            }).catch((error) => {
                console.log(error);
            })
    }

    //     return (
    //         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    //             {posts && posts[0].id ?
    //                 <ImageList sx={{ width: { xs: 350, sm: 550, md: 850, lg: 1000, xl: 1500 }, height: { xs: 350, sm: 550, md: 850, lg: 1000, xl: 1500 } }} cols={3} rowHeight={164}>
    //                     {posts.map((item) => (
    //                         <ImageListItem key={item.image} sx={{ m: 1 }}>
    //                             <img
    //                                 src={`${item.image}?w=350&h=350&fit=crop&auto=format`}
    //                                 srcSet={`${item.image}?w=350&h=350&fit=crop&auto=format&dpr=2 2x`}
    //                                 // src={`${item.image}`}
    //                                 // srcSet={`${item.image}`}
    //                                 // style={{ width: "20vw" }}
    //                                 loading="lazy"
    //                             />
    //                         </ImageListItem>
    //                     ))}
    //                 </ImageList>
    //                 :
    //                 null}
    //         </Box>
    //     );
    // }

    return (
        <Box fullwidth sx={{ overflowY: 'scroll', mx: { sm: 2, lg: 10, xl: 20 } }}>
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