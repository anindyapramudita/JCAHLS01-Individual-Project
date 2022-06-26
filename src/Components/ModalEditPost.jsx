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

const ModalEditPost = (props) => {
    const { isOpen, toggle, postId, data, caption } = props;

    const [newCaption, setNewCaption] = React.useState(caption)

    const navigate = useNavigate();

    const { profPic, username } = useSelector((state) => {
        return {
            profPic: state.usersReducer.profilePicture,
            username: state.usersReducer.username
        }
    })

    const handlePost = async () => {
        try {

            // let res = await axios.patch(`${API_URL}/post?idPost=${postId}`, { caption: newCaption })
            await axios.patch(`${API_URL}/posting/editPost?idPost=${postId}`, { caption: newCaption })
            toggle();

        } catch (error) {
            console.log(error)
        }
    }

    return <div>
        <Modal
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
                            Edit your post!
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        {/* {newImage ? */}
                        <Box sx={{
                            borderRight: 1, borderColor: 'grey.500', minWidth: 350, minHeight: 300, display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}>
                            <img src={`${API_URL}${data.image}`} style={{ width: "100%" }} />
                        </Box>
                        <Box sx={{ minWidth: 250, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ pt: 2, px: 1, display: 'flex', alignItems: 'center' }}>
                                <Avatar
                                    src={profPic}
                                    sx={{ width: 25, height: 25, mr: 1 }}
                                />
                                <Typography variant='body2'>{username}</Typography>

                            </Box>
                            <Box sx={{ flexGrow: 1, px: 2, pt: 1 }}>
                                <TextField fullWidth id="input-with-sx" label="Edit your caption!" variant="standard"
                                    inputProps={{ style: { fontSize: 12 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                                    multiline
                                    defaultValue={caption}
                                    onChange={(e) => setNewCaption(e.target.value)}
                                // rows={11}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3, py: 1, alignItems: 'center' }}>
                        <Button type="button" onClick={() => {
                            toggle();
                            setNewCaption(caption)
                        }}>Cancel</Button>
                        <Button type="button" onClick={handlePost}>Save</Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    </div>
}

export default ModalEditPost;