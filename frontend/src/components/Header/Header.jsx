import React, { useState } from "react";
import { 
    AppBar, 
    Container, 
    Toolbar,
    Box,
    Button,
    FormControlLabel
} from '@mui/material';
import DropDownMenu from "./DropDownMenu";
import { Link } from "react-router-dom";
import BlueSwitch from "./BlueSwitch";

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const pages = ['Домой', 'Помощь'];

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    return (
        <AppBar position="fixed" color="primary">
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <DropDownMenu 
                        pages={pages}
                        anchorElNav={anchorElNav}
                        handleOpenNavMenu={handleOpenNavMenu}
                        handleCloseNavMenu={handleCloseNavMenu}
                    />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link to={page === "Домой" ? "/" : "/help"} key={page}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 1, color: 'black', mr: '10px', fontSize: '20px' }}
                                    key={page}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <FormControlLabel control={<BlueSwitch />} label="ЯЗЫК"/>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>  
    )
}

export default Header;