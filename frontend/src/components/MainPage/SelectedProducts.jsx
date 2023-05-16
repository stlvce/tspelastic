import React, { useState, useContext } from "react"; 
import {
    Container, 
    Card, 
    CardContent, 
    CardHeader, 
    CardMedia, 
    Grid, 
    Typography,
    Box, 
    Button 
} from '@mui/material';
import { useCanvasStore } from "../../services/state";
import { shallow } from 'zustand/shallow'
import ModalProducts from "./ModalProducts";
import { LangContext } from "../../context/langContext";

export default function SelectedProducts({products, categories, width, height}) {
    const {selectedProducts, add_select_product, del_select_product, setHoverProduct} = useCanvasStore((state)=>state, shallow);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectLang] = useContext(LangContext)

    const select = (item) => {
        const category = categories.find((cat) => cat.id === products.find(product=> product.id === item).category_id);
        add_select_product(item, category, width, height);
    }

    const unselect = (item) => {
        del_select_product(item);
    }

    return (
        <Box sx={{ width: "750px"}}>
            <Box sx={{ display: "flex", justifyContent: "space-between", m: "0 0 1em 0" }}>
                <Typography variant="h5">
                    {selectLang.product} ({selectedProducts.length})
                </Typography>
                <Button onClick={handleClickOpen} variant="contained">{selectLang.addProduct}</Button>
                <ModalProducts open={open} handleClose={handleClose} select={select} unselect={unselect}/>
            </Box >
            <Container sx={{ height: "600px", background: "#FFF", pt: "2em", overflow: 'auto', boxShadow: 3}}>
                {selectedProducts.length === 0 && <Typography sx={{ textAlign: "center", opacity: "0.5"}}>
                    Добавьте продукты, чтобы начать построение
                </Typography>}
                <Grid 
                    container
                    spacing={3}
                    sx={{gap: "2em"}}
                >
                    {selectedProducts && products && products.filter(product=> {
                        return selectedProducts.some(selpro=>{
                            return product.id === selpro.id
                        })
                    }).map(product=>{
                    return ( 
                    <Grid 
                        item 
                        key={"selpro" + product.id}
                        sx={{ width: "200px", height: "250px" }}
                    >
                        <Card
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            textAlign: "center",
                            alignItems: "center",
                            width: "200px",
                            height: "250px",
                            ':hover': {
                                background: "#0F0",
                                boxShadow: 20,
                            },
                          }}
                          onMouseEnter={() => {setHoverProduct(product.id)}}
                          onMouseLeave={() => setHoverProduct(-1)}
                          >
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.name}
                                sx={{ height: "100px", width: "100px", borderRadius: "100%" }}
                            />
                            <CardHeader
                                title={product.name}
                                subheader={categories ? 
                                    categories.filter(category => 
                                        category.id === product.category_id
                                    )[0]?.name : ''
                                }
                                sx={{width: "100%"}}
                            />
                            {<CardContent>
                                <Typography>
                                    {product.description}
                                </Typography>
                            </CardContent> && product.description !== ""}
                        </Card>
                    </Grid>)}
                    )}
                </Grid>
            </Container>
        </Box>
    )
}