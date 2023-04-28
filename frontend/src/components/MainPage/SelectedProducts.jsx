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
import { useCategoriesStore } from "../../services/state";
import { shallow } from 'zustand/shallow'
import ModalProducts from "./ModalProducts";
import { LangContext } from "../../context/langContext";

export default function SelectedProducts() {
    const categories = useCategoriesStore((state) => state.categories, shallow);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectProd, setSelectProd] = useState([]);
    const [selectLang] = useContext(LangContext)

    const select = (item) => {
        setSelectProd([...selectProd, item])
    }

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", m: "40px 0 10px 0" }}>
                <Typography variant="h5">
                    {selectLang.product} ({selectProd.length})
                </Typography>
                <Button onClick={handleClickOpen} variant="contained">{selectLang.addProduct}</Button>
                <ModalProducts open={open} handleClose={handleClose} select={select}/>
            </Box >
            <Container sx={{ height: "700px", background: "#FFF", pt: "2em", overflow: 'auto', borderRadius: "10px", boxShadow: 3}}>
                <Grid 
                    container
                    direction="column"
                    justifyContent="space-around"
                    alignItems="stretch"
                    sx={{gap: "2em"}}
                >
                    {selectProd && selectProd.map(product=>
                        <Grid item key={product.id}>
                            <Card sx={{
                                display: "flex",
                                justifyContent: "space-around"
                            }}>
                                <CardMedia
                                    component="img"
                                    height="200px"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{ maxWidth: "200px", borderRadius: "100%" }}
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
                        </Grid>   
                    )}
                </Grid>
            </Container>
        </>
    )
}