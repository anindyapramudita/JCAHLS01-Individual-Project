import React from "react";
import { NavigationBar } from "../Components/NavigationBar";
import { Avatar, Box, Typography, Grid, Badge, IconButton, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import Axios from "axios";
import { API_URL } from "../helper";
import SettingsTab from "../Components/SettingsTab"

const SettingsPage = (props) => {

    return <div>
        <NavigationBar />
        <SettingsTab />
    </div>

}

export default SettingsPage;