import React from "react";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useProductsStore, useCategoriesStore, useCanvasStore } from "../../services/state";
import { shallow } from "zustand/shallow";

export default function ProductList({ searchtext, filtercategory, select, unselect }) {
    const productlist = useProductsStore((state) => state.products, shallow);
    const selectedProducts = useCanvasStore((state)=> state.selectedProducts, shallow);
    const categories = useCategoriesStore((state) => state.categories, shallow);

    return (
        <List>
            {productlist.filter(product=> filtercategory.length ? filtercategory.includes(product.category_id) : product).filter(
                product=>product.name.toLowerCase().includes(searchtext.toLowerCase())).map(
                    product => {
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
                )
            }
        </List>    
    )
}