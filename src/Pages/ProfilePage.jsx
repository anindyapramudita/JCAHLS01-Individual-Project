import React from 'react';
import CardComponent from '../Components/CardComponent';
import ProfileInfo from '../Components/ProfileInfo';
import { NavigationBar } from '../Components/NavigationBar';
import PostTab from '../Components/PostTab';


const Homepage = (props) => {

    return <div>
        <NavigationBar />
        <ProfileInfo />
        <PostTab />


    </div >
}

export default Homepage;