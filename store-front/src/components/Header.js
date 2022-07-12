import * as React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const ResponsiveAppBar = () => {
    return (
        <AppBar position="static" color='primary'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img
                        src={`https://cdn.simplertrading.com/2018/11/08120448/Trademark-Simpler-Logo-White.png`}
                        alt=''
                        width="300"
                        loading="lazy"
                    />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 6 }}>
                        <Link to="/">
                            <Button sx={{ my: 2, color: 'white' }}>
                                Home
                            </Button>
                        </Link>
                        <Link to="/store">
                            <Button sx={{ my: 2, color: 'white' }}>
                                Store
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
