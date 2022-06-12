import React from "react";
import { Modal, Backdrop, Fade, Box, Typography, Card, CardHeader, Divider, IconButton, Button, Avatar, TextField, InputAdornment } from "@mui/material";
import { useSelector } from "react-redux";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
// import { makeStyles } from "@mui/styles";
import axios from "axios";
import { API_URL } from "../helper";
import { useNavigate } from "react-router-dom";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: "8px"

};

const ModalNewPost = (props) => {
    const { isOpen, toggle } = props;

    const [newImage, setNewImage] = React.useState()
    const [caption, setCaption] = React.useState()

    const navigate = useNavigate();

    const { profPic, username } = useSelector((state) => {
        return {
            profPic: state.usersReducer.profilePicture,
            username: state.usersReducer.username
        }
    })

    const handleUpload = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            setNewImage(e.target.result)
        }
    }

    const handlePost = async () => {
        try {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            const d = new Date();
            let day = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();
            let dateCreated = `${month} ${day}, ${year}`

            let res = await axios.post(`${API_URL}/posts`, {
                username,
                image: [newImage],
                caption,
                userLiked: [],
                comments: [
                    {
                        "username": "",
                        "comment": "",
                        "dateCreated": ""
                    }
                ],
                dateCreated
            })

            toggle();
            navigate(0)

        } catch (error) {
            console.log(error)
        }

    }

    return <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={toggle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={isOpen}>
            <Box sx={style}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 1, alignItems: 'center' }}>
                    <Typography textAlign="center" variant="subtitle1" component="h1">
                        Create a new post!
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {newImage ?
                        <Box sx={{
                            borderRight: 1, borderColor: 'grey.500', minWidth: 350, minHeight: 300, display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}>
                            <img src={newImage} style={{ width: "100%" }} />
                        </Box>
                        :
                        <Box sx={{ borderRight: 1, borderColor: 'grey.500', minWidth: 350, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <InsertPhotoIcon sx={{ color: 'primary.main', fontSize: "50px" }} />
                            <Typography variant="subtitle1" sx={{ color: 'grey.700' }}>
                                Choose a picture to post!
                            </Typography>
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ mt: 2 }}
                            >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handleUpload(e)}
                                />
                            </Button>
                        </Box>
                    }
                    <Box sx={{ minWidth: 250, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ pt: 2, px: 1, display: 'flex', alignItems: 'center' }}>
                            <Avatar
                                src={profPic}
                                sx={{ width: 25, height: 25, mr: 1 }}
                            />
                            <Typography variant='body2'>{username}</Typography>

                        </Box>
                        <Box sx={{ flexGrow: 1, px: 2, pt: 1 }}>
                            <TextField fullWidth id="input-with-sx" label="Write your caption!" variant="standard"
                                inputProps={{ style: { fontSize: 12 } }} // font size of input text
                                InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                                multiline
                                onChange={(e) => setCaption(e.target.value)}
                            // rows={11}
                            />
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3, py: 1, alignItems: 'center' }}>
                    <Button type="button" onClick={() => {
                        toggle();
                        setNewImage()
                    }}>Cancel</Button>
                    <Button type="button" onClick={handlePost}>Post</Button>
                </Box>
            </Box>
        </Fade>
    </Modal>
}

export default ModalNewPost;