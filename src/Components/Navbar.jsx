import React from 'react';
import { HomeRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../Redux/Actions/usersAction';
import { MenuComponent } from './Menu';
import { Avatar } from '@mui/material';
import { AvatarDropdown } from './AvatarDropdown';





const NavbarComponent = (props) => {

    const dispatch = useDispatch();
    let navigate = useNavigate();


    const { fullname, profPic } = useSelector((state) => {
        return {
            fullname: state.usersReducer.fullName,
            profPic: state.usersReducer.profilePicture
        }
    })

    const getFirstName = () => {
        let firstName = fullname.split(" ")
        return firstName[0]
    }

    return <div>
        <nav class="d-flex justify-content-between align-items-center" style={{ borderBottom: "solid", borderBottomColor: "lightGray" }}>
            <div className="p-3">
                <HomeRounded
                    sx={{ color: "#134E4A" }}
                    fontSize="large"
                />
            </div>
            <div className='p-2 d-flex justify-content-end align-items-center'>
                <div className="p-2">
                    <h6 style={{ color: "#134E4A" }}>Welcome back, {getFirstName()}</h6>
                </div>
                <div className="p-2">
                    <AvatarDropdown
                        fullname={fullname}
                        profPic={profPic}
                    />
                </div>
            </div>
        </nav>



    </div >
}

export default NavbarComponent;