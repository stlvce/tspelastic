import React from 'react';
import { Box, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function DropDownMenu({ pages, anchorElNav, handleOpenNavMenu, handleCloseNavMenu }) {
    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                {pages.map((page) => (
                    <Link to={page.link} key={page.name}>
                        <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{page.name}</Typography>
                        </MenuItem>
                    </Link>
                ))}
            </Menu>
        </Box>
    )
}