import React from "react";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { API_URL } from "../helper";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../Redux/Actions/usersAction";

const VerificationPage = () => {
    let { token } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userData, setUserData] = React.useState()

    React.useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get(`${API_URL}/user/verificationData`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setUserData(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleVerify = () => {
        axios.patch(`${API_URL}/user/verification`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            localStorage.setItem("tokenIdUser", response.data.token)
            dispatch(loginAction(response.data))
            navigate('/', { replace: true })
        }).catch((error) => {
            console.log(error)
        })
    }

    return <div>
        <Container sx={{ py: 15, px: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'primary' }}>
                <Avatar alt="Email Verification" src="https://socialprofiletools.com//assets/images/email-verify.png" sx={{ width: 150, height: 150 }} />
                <Typography variant="h5" component="h1" align="center">
                    Hi {userData ? userData.fullName : null}! You've entered {userData ? userData.email : null} as your email account
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, mb: 4 }} align="center">
                    Please verify your email address by clicking the button below, and you will get full access of the website
                </Typography>
                <Button variant="outlined" onClick={handleVerify}>Verify Email</Button>
            </Box>
        </Container>
    </div>
}

export default VerificationPage;