import React from 'react';
import { NavigationBar } from '../Components/NavigationBar';
import CardComponent from '../Components/CardComponent';
import { useUserData } from '../api/use-user-data';
import { useUserPosts } from '../api/use-user-posts';
import CreateButton from '../Components/CreateButton';
import SideDrawer from '../Components/SideDrawer';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import VerificationInfo from '../Components/VerificationInfo';

const Homepage = (props) => {

    const { status } = useSelector((state) => {
        return {
            status: state.usersReducer.status
        }
    })

    return <div>
        {status ? status == "Verified" ?
            <>
                <NavigationBar />
                <CardComponent />
                <CreateButton />
            </>
            :
            <>
                <NavigationBar />
                <VerificationInfo />
            </>
            : null
        }
    </div >
}

export default Homepage;