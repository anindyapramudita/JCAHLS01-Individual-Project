import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Menu, MenuItem } from '@mui/material';

export default function CreateButton() {
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    return (
        <div>

            <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 15, right: 15 }}>
                <AddIcon />
            </Fab>
            {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Create New Post</MenuItem>
                <MenuItem onClick={handleClose}>Create New Post</MenuItem>
            </Menu> */}
        </div>
    );
}