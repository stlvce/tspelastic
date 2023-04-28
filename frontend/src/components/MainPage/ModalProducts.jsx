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
    Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useProductsStore, useCategoriesStore } from "../../services/state";
import { shallow } from "zustand/shallow";
import CategoriaSelect from "./CategoriaSelect";
import { LangContext } from "../../context/langContext";

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

export default function ModalProducts({ open, handleClose, select }) {
    const productlist = useProductsStore((state) => state.products, shallow);
    const categories = useCategoriesStore((state) => state.categories, shallow);
    const [selectLang] = useContext(LangContext);

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar >
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
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <CategoriaSelect categories={categories}/>
                    </Box>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        {selectLang.done}
                    </Button>
                </Toolbar>
            </AppBar>
            <List sx={{top: "80px"}}>
                {productlist.map(product => 
                    <ListItem 
                        divider 
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <AddIcon color="su"/>
                            </IconButton>
                        }
                        key={product.id} 
                        onClick={() => select(product)}
                    >
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={product.image} />
                        </ListItemAvatar>
                        <ListItemText primary={product.name} secondary={categories ? 
                            categories.filter(category => category.id === product.category_id)[0]?.name : ''} 
                        />
                    </ListItem>
                )}

            </List>
        </Dialog>
    )
}