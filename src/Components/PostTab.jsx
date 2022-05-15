import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { useSelector } from 'react-redux';
import { useUserPosts } from '../api/use-user-posts';
import { ImageList, ImageListItem, Grid, Container } from '@mui/material';
import UserPosts from './UserPosts';
import UserLikedPosts from './UserLikedPosts';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function PostTab() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const { id } = useSelector((state) => {
        return {
            id: state.usersReducer.id
        }
    })




    return (
        <Container>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Tab icon={<PhotoLibraryIcon />} iconPosition="start" label="Posts" {...a11yProps(0)} sx={{ minWidth: "50%" }} />
                        <Tab icon={<FavoriteIcon />} iconPosition="start" label="Liked" {...a11yProps(1)} sx={{ minWidth: "50%" }} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <UserPosts />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UserLikedPosts />
                </TabPanel>
            </Box>
        </Container>
    );
}