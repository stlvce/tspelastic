import React, { useState, useContext } from "react";
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
import { LangContext } from "../../context/langContext";

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [selectLang, isLang, setIsLang] = useContext(LangContext);

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
                        pages={selectLang.pages}
                        anchorElNav={anchorElNav}
                        handleOpenNavMenu={handleOpenNavMenu}
                        handleCloseNavMenu={handleCloseNavMenu}
                    />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {selectLang.pages.map((page) => (
                                <Link to={page.link} key={page.name}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 1, color: 'black', mr: '10px', fontSize: '20px' }}
                                        key={page.name}
                                    >
                                        {page.name}
                                    </Button>
                                </Link>
                            ))}
                        
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <FormControlLabel control={<BlueSwitch onChange={() => setIsLang(!isLang)}/>} label={selectLang.lang}/>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;