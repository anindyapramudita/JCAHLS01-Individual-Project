import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../Redux/Actions/usersAction';
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';

export const AvatarDropdown = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { fullname, profPic } = props

    return <div className="dropdown">
        <a className="btn" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <Avatar alt={fullname} src={profPic} />
        </a>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a className="dropdown-item" href="#" onClick={() => {
                navigate("/profile");
            }}>My Profile</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <div className="dropdown-divider"></div>
            <li>
                <a className="dropdown-item" href="#" onClick={() => {
                    dispatch(logoutAction());
                    navigate("/login");
                    navigate(0);
                }}>Log Out</a>
            </li>
        </ul>
    </div>
}