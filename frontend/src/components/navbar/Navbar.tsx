import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Logout, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export const Navbar = () => {
    const navigate = useNavigate()
    return (
        <AppBar position="static" sx={{background: 'rgb(194, 241, 106)'}}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography onClick={() => navigate('/')} sx={{color: 'purple', cursor: 'pointer'}} variant="h6">Online Shop</Typography>
                <Toolbar sx={{justifyContent: 'flex-end'}}>
                    <IconButton onClick={() => navigate('/cart') } sx={{color: 'purple'}} color="inherit">
                        <ShoppingCart />
                    </IconButton>
                    <IconButton sx={{color: 'purple'}} color="inherit">
                        <Logout />
                    </IconButton>
                </Toolbar>
            </Toolbar>
        </AppBar>
    )
}
