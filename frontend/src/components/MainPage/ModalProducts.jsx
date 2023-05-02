import React, { useContext } from "react";
import { 
    Typography, 
    Button, 
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Slide,
    InputBase,
    Box,
    ListItemAvatar,
    Avatar,
    Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useProductsStore, useCategoriesStore, useCanvasStore } from "../../services/state";
import { shallow } from "zustand/shallow";
import CategoriaSelect from "./CategoriaSelect";
import { LangContext } from "../../context/langContext";
import { useState } from "react";
import { useEffect } from "react";

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
    const productlist = useProductsStore((state) => state.products, shallow);
    const categories = useCategoriesStore((state) => state.categories, shallow);
    const selectedProducts = useCanvasStore((state)=> state.selectedProducts, shallow);
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
            <List>
                {productlist.filter(product=> filtercategory.length ? filtercategory.includes(product.category_id) : product).filter(
                    product=>product.name.toLowerCase().includes(searchtext.toLowerCase())).map(
                        product => 
                    {
                                return <ListItem
                                    divider
                                    secondaryAction={<IconButton edge="end" aria-label="delete">
                                        { selectedProducts.filter(selpro => selpro.id === product.id)[0] ? <RemoveIcon color="su"/> :  <AddIcon color="su" />}
                                    </IconButton>}
                                    key={product.id}
                                    onClick={() => { selectedProducts.filter(selpro => selpro.id === product.id)[0] ? unselect(product.id) :  select(product.id)}}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={product.image} />
                                    </ListItemAvatar>
                                    <ListItemText primary={product.name} secondary={categories ?
                                        categories.filter(category => category.id === product.category_id)[0]?.name : ''} />
                                </ListItem>;
                            }
                )}

            </List>
            </Paper>
        </Dialog>
    )
}