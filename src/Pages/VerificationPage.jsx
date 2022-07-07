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
    const [buttonValidity, setButtonValidity] = React.useState(false)

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
        setButtonValidity(true)
        axios.patch(`${API_URL}/user/verification`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            localStorage.setItem("tokenIdUser", response.data.token)
            dispatch(loginAction(response.data))
            navigate('/', { replace: true })
            navigate(0)
        }).catch((error) => {
            console.log(error)
            setButtonValidity(false)
        })
    }

    return <div>
        {userData ? userData.lastToken == token ?
            <Container sx={{ py: 15, px: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'primary' }}>
                    <Avatar alt="Email Verification" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e4a53b96617943.5eb2835412e3c.png" sx={{ width: 300, height: 300 }} />
                    {/* <Avatar alt="Email Verification" src="https://i.pinimg.com/736x/d8/ee/47/d8ee47d2fda6044e5c07aea05af91e9a.jpg" sx={{ width: 300, height: 300 }} /> */}
                    <Typography variant="h5" component="h1" align="center">
                        You're one click away!
                    </Typography>
                    {/* <Typography variant="h5" component="h1" align="center">
                        Hi {userData ? userData.fullName : null}! You've entered {userData ? userData.email : null} as your email account
                    </Typography> */}
                    <Typography variant="body2" sx={{ mt: 2, mb: 4 }} align="center">
                        Hi {userData ? userData.fullName : null}! Please verify your email address by clicking the button below, and you will get full access of the website
                    </Typography>
                    <Button variant="outlined" disabled={buttonValidity} onClick={handleVerify}>Verify Email</Button>
                </Box>
            </Container>
            :
            <Container sx={{ py: 15, px: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'primary' }}>

                    <Avatar
                        flexItem
                        src="https://i.kym-cdn.com/entries/icons/original/000/024/027/blog_image_3822_4926_Webcomic_Name_April_Fools_Day_201703231756.jpg"
                        sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h5" component="h1" align="center">
                        We're sorry, your token has expired!
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, mb: 4 }} align="center">
                        Please check your inbox for the updated verification link or log in to your account and get a new verification link!
                    </Typography>
                    <Button variant="outlined" onClick={() => navigate('/')}>Login</Button>
                </Box>
            </Container>
            :
            <Container sx={{ py: 15, px: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'primary' }}>

                    <Avatar
                        flexItem
                        src="https://i.kym-cdn.com/entries/icons/original/000/024/027/blog_image_3822_4926_Webcomic_Name_April_Fools_Day_201703231756.jpg"
                        sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h5" component="h1" align="center">
                        We're sorry, your token has expired!
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, mb: 4 }} align="center">
                        Please check your inbox for the updated verification link or log in to your account and get a new verification link!
                    </Typography>
                    <Button variant="outlined" onClick={() => navigate('/')}>Login</Button>
                </Box>
            </Container>
        }
    </div>
}

export default VerificationPage;