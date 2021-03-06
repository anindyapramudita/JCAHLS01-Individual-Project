import React from "react";
import Backdrop from '@mui/material/Backdrop';
import { Modal, Fade, Box, Typography, IconButton, Avatar } from "@mui/material";
import { FacebookIcon, FacebookShareButton, FacebookShareCount, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { API_URL, FE_URL } from "../helper";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Helmet } from "react-helmet";
import HelmetMetaData from "../Helmet/HelmetMetaData";
import { useSelector } from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'space-around'
};

const ModalShare = (props) => {
    const { isOpen, setOpen, toggle, postId, data } = props;
    const { username } = useSelector((state) => {
        return {
            username: state.usersReducer.username
        }
    })

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${FE_URL}/post?idPost=${postId}`)
        alert(`Link copied!`)
    }

    return <div>
        {/* <Helmet>
            <title>Lente - Share your best memories</title>
            <meta
                property="title"
                key="title"
                content={`@${data.username}`}
            />
            <meta
                property="og:description"
                key="og:description"
                content={`Hey! Check out this image by ${data.fullName}`}
            />
            <meta
                property="og:image"
                key="og:image"
                content={`${API_URL}/${data.image}`}
            />
        </Helmet> */}
        <HelmetMetaData
            description={`Look at this picture by ${data.username}`}
            image={`${API_URL}/${data.image}`}
        ></HelmetMetaData>
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
                    <FacebookShareButton url={`${FE_URL}/post?idPost=${postId}`}>
                        <FacebookIcon size={40} round="true" />
                    </FacebookShareButton>
                    <TwitterShareButton url={`${FE_URL}/post?idPost=${postId}`}>
                        <TwitterIcon size={40} round="true" />
                    </TwitterShareButton>
                    <WhatsappShareButton url={`${FE_URL}/post?idPost=${postId}`}>
                        <WhatsappIcon size={40} round="true" />
                    </WhatsappShareButton>
                    <IconButton component="span" sx={{ m: 0, p: 0, width: 40, height: 40 }} onClick={handleCopyLink}>
                        <Avatar src="http://cdn.onlinewebfonts.com/svg/img_211187.png" />
                    </IconButton>


                </Box>
            </Fade>
        </Modal>
    </div >
}

export default ModalShare;