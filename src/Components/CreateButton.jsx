import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Menu, MenuItem } from '@mui/material';
import ModalNewPost from './ModalNewPost';

export default function CreateButton() {
    const [openModal, setOpenModal] = React.useState(false)
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const handleNewPost = () => {
        setOpenModal(!openModal)
    }

    return (
        <div>

            <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 15, right: 15 }}>
                <AddIcon onClick={handleNewPost} />
            </Fab>
            <ModalNewPost
                isOpen={openModal}
                toggle={handleNewPost}
            />

        </div>
    );
}