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
import { useEffect } from "react";

export default function SelectedProducts({products, categories}) {
    const {selectedProducts, add_select_product, del_select_product} = useCanvasStore();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectLang] = useContext(LangContext)

    const select = (item) => {
        add_select_product(Math.random(), Math.random(), item);
    }

    const unselect = (item) => {
        del_select_product(item);
    }


    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", m: "40px 0 10px 0" }}>
                <Typography variant="h5">
                    {selectLang.product} ({selectedProducts.length})
                </Typography>
                <Button onClick={handleClickOpen} variant="contained">{selectLang.addProduct}</Button>
                <ModalProducts open={open} handleClose={handleClose} select={select} unselect={unselect}/>
            </Box >
            <Container sx={{ height: "700px", background: "#FFF", pt: "2em", overflow: 'auto', borderRadius: "10px", boxShadow: 3}}>
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
                    return ( <Grid item key={"selpro" + product.id}
                    sx={{
                        width: "300px",
                        height: "300px"
                    }}>
                            <Card
                              sx={{
                                width: "300px",
                                height: "300px",
                                ':hover': {
                                    background: "#0F0",
                                  boxShadow: 20, // theme.shadows[20]
                                },
                              }}>
                                
                                <CardMedia
                                    component="img"
                                    height="128px"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{ maxWidth: "128px", borderRadius: "100%" }}
                                />
                                <CardHeader
                                    title={product.name}
                                    subheader={categories ? 
                                        categories.filter(category => 
                                            category.id === product.category_id
                                        )[0]?.name : ''
                                    }
                                    sx={{width: "60%"}}
                                />
                                {<CardContent>
                                    <Typography>
                                        {product.description}
                                    </Typography>
                                </CardContent> && product.description !== ""}

                            </Card>
                        </Grid>   )
                        }
                    )}
                </Grid>
            </Container>
        </>
    )
}