import { Container, Box, Avatar, Typography } from "@mui/material";
import React from "react";

const NoPost = () => {
    return <div>
        <Container sx={{ pb: 15, px: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'primary' }}>
                <Avatar alt="No Post" src="https://cdn.dribbble.com/users/1714010/screenshots/11316341/media/bc323c5d37397497e999b016c7a97c9b.png?compress=1&resize=400x300" sx={{ width: 150, height: 150 }} />
                <Typography variant="h5" component="h1" align="center">
                    It's quiet in here...
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, mb: 4 }} align="center">
                    There are no posts yet
                </Typography>
            </Box>
        </Container>
    </div>
}

export default NoPost;