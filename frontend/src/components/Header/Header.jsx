import React, { useState } from "react";
import { 
    AppBar, 
    Container, 
    Toolbar,
    Box,
    Button,
    ThemeProvider,
    createTheme
} from '@mui/material';
import DropDownMenu from "./DropDownMenu";
import { Link } from "react-router-dom";

const pages = ['Home', 'Help'];
const mainTheme = createTheme({
    palette: {
      primary: {
        main: '#94B8C0',
      },
    },
});

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    return (
        <ThemeProvider theme={mainTheme}>
            <AppBar position="fixed" color="primary" enableColorOnDark>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <DropDownMenu 
                            pages={pages}
                            anchorElNav={anchorElNav}
                            handleOpenNavMenu={handleOpenNavMenu}
                            handleCloseNavMenu={handleCloseNavMenu}
                        />
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Link to={page === "Home" ? "/" : "/help"}>
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 1, color: 'black', display: 'block', fontSize: "20px" }}
                                    >
                                        {page}
                                    </Button>
                                </Link>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>    
    )
}

export default Header;