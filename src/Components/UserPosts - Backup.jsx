import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector } from 'react-redux';
import { useUserPosts } from '../api/use-user-posts';
import { Box } from '@mui/material';

export default function UserPosts() {
    const { id } = useSelector((state) => {
        return {
            id: state.usersReducer.id
        }
    })

    const { posts } = useUserPosts(id);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {posts && posts[0].id ?
                <ImageList sx={{ width: { xs: 350, sm: 550, md: 850, lg: 1000, xl: 1500 }, height: { xs: 350, sm: 550, md: 850, lg: 1000, xl: 1500 } }} cols={3} rowHeight={164}>
                    {posts.map((item) => (
                        <ImageListItem key={item.image} sx={{ m: 1 }}>
                            <img
                                src={`${item.image}?w=350&h=350&fit=crop&auto=format`}
                                srcSet={`${item.image}?w=350&h=350&fit=crop&auto=format&dpr=2 2x`}
                                // src={`${item.image}`}
                                // srcSet={`${item.image}`}
                                // style={{ width: "20vw" }}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                :
                null}
        </Box>
    );
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    },
];
