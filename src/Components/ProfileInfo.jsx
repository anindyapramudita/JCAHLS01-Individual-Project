import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const ProfileInfo = (props) => {
    const { profPic, fullname } = useSelector((state) => {
        return {
            profPic: state.usersReducer.profilePicture,
            fullname: state.usersReducer.fullName
        }
    })

    return <div>
        <div className="d-flex justify-content-center my-3">
            <Avatar
                src={profPic}
                sx={{ width: 120, height: 120 }}
            />
        </div>
        <h1 className="display-6">{fullname}</h1>
    </div>
}

export default ProfileInfo;