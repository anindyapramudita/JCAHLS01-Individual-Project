import React from 'react';
import { NavigationBar } from '../Components/NavigationBar';
import CardComponent from '../Components/CardComponent';
import { useUserData } from '../api/use-user-data';
import { useUserPosts } from '../api/use-user-posts';


const Homepage = (props) => {

    const userData = useUserData();
    const { posts } = useUserPosts(6);

    console.log(posts, 'POSTS');

    return <div>
        <NavigationBar />
        <CardComponent />
    </div >
}

export default Homepage;