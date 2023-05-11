import React, { forwardRef } from "react";
import { ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useCategoriesStore, useCanvasStore } from "../../services/state";
import { shallow } from "zustand/shallow";

const ProductItem = forwardRef((props, ref) => {
    const categories = useCategoriesStore((state) => state.categories, shallow);
    const selectedProducts = useCanvasStore((state)=> state.selectedProducts, shallow);

    return (
        <ListItem
            button
            divider
            secondaryAction={<IconButton edge="end" aria-label="delete">
                { selectedProducts.filter(selpro => selpro.id === props.product.id)[0] ? <RemoveIcon color="su"/> :  <AddIcon color="su" />}
            </IconButton>}
            onClick={() => { selectedProducts.filter(selpro => selpro.id === props.product.id)[0] ? props.unselect(props.product.id) :  props.select(props.product.id)}}
            ref={ref}
        >   
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={props.product.image} />
            </ListItemAvatar>
            <ListItemText primary={props.product.name} secondary={categories ?
                categories.filter(category => category.id === props.product.category_id)[0]?.name : ''} />
        </ListItem>  
    )
})

export default ProductItem;