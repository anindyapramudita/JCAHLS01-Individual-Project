import React from "react";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { API_URL } from "../helper";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../Redux/Actions/usersAction";

const VerificationInfo = () => {

    const [userData, setUserData] = React.useState()
    const [sendStatus, setSendStatus] = React.useState(false)

    React.useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        let token = localStorage.getItem("tokenIdUser")
        axios.get(`${API_URL}/user/verificationData`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data)
            setUserData(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleVerify = () => {
        let token = localStorage.getItem("tokenIdUser")

        axios.get(`${API_URL}/user/resend`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setSendStatus(true)
        }).catch((error) => {
            console.log(error)
        })
    }

    return <div>
        {sendStatus ?
            <Container sx={{ py: 15, px: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'primary' }}>
                    <Avatar alt="Email Verification" src="https://media.istockphoto.com/vectors/confirmed-letter-vector-id1357207733?k=20&m=1357207733&s=612x612&w=0&h=wAx-f6hQ6-BJQNJsHQcSP32paK8g36qQ8TCdBAvYha4=" sx={{ width: 150, height: 150 }} />
                    <Typography variant="h5" component="h1" align="center">
                        It's sent!
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, mb: 4 }} align="center">
                        Please check your email at {userData ? userData.email : null} to get the verification link!
                    </Typography>
                </Box>
            </Container>
            :
            <Container sx={{ py: 15, px: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'primary' }}>
                    <Avatar alt="Email Verification" src="https://socialprofiletools.com//assets/images/email-verify.png" sx={{ width: 150, height: 150 }} />
                    <Typography variant="h5" component="h1" align="center">
                        Thanks for joining us, {userData ? userData.fullName : null}!
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, mb: 4 }} align="center">
                        You have one more step to get full access of our website! Check your email for the verification link or resend the verification email here
                    </Typography>
                    <Button variant="outlined" onClick={handleVerify}>Resend Verification Link</Button>
                </Box>
            </Container>
        }
    </div>
}

export default VerificationInfo;