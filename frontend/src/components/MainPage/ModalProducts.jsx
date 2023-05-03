import React, { useContext } from "react";
import { 
    Typography, 
    Button, 
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Slide,
    InputBase,
    Box,
    Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useCategoriesStore } from "../../services/state";
import { shallow } from "zustand/shallow";
import CategoriaSelect from "./CategoriaSelect";
import { LangContext } from "../../context/langContext";
import { useState } from "react";
import ProductList from "./ProductList";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '40ch',
      },
    },
}));

export default function ModalProducts({ open, handleClose, select, unselect }) {
    const categories = useCategoriesStore((state) => state.categories, shallow);
    const [selectLang] = useContext(LangContext);
    const [searchtext, setSearch] = useState('');
    const [filtercategory, setfiltercategory] = useState([]); 

    function categoryfilter(category_names){
        let categories_id = category_names.map(category_name =>{
            let category_id = categories.filter(category => category_name === category.name)[0].id;
            return category_id;
        })
        setfiltercategory(categories_id);
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px", flex: 1}}>
                        <Typography sx={{ ml: 2}} variant="h6" component="div">
                            {selectLang.addingProduct}
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder={selectLang.search}
                                value={searchtext}
                                onChange={(e)=> {setSearch(e.target.value)}}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <CategoriaSelect categories={categories} categoryfilter={categoryfilter}/>
                    </Box>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        {selectLang.done}
                    </Button>
                </Toolbar>
            </AppBar>
            <Paper sx={{maxHeight: devicePixelRatio.height, overflow: 'auto', mt: "80px"}}>
                <ProductList 
                    searchtext={searchtext} 
                    filtercategory={filtercategory} 
                    select={select}
                    unselect={unselect}
                />
            </Paper>
        </Dialog>
    )
}