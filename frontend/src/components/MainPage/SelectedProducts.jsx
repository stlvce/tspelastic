import React from "react"; 
import { Container } from '@mui/material';

import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardMedia, 
    Grid, 
    Typography 
} from '@mui/material';
import { useProductsStore, useCategoriesStore } from "../../services/state";
import { shallow } from 'zustand/shallow'

export default function SelectedProducts() {
    const productlist = useProductsStore((state) => state.products, shallow);
    const categories = useCategoriesStore((state) => state.categories, shallow);

    return (
        <Container sx={{ height: "700px", background: "#FFF", paddingTop: "2em", overflow: 'auto', borderRadius: "10px"}}>
            {/* <Grid 
                container
                direction="column"
                justifyContent="space-around"
                alignItems="stretch"
                sx={{gap: "2em"}}
            >
                {productlist && productlist.map(product=>
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
            </Grid> */}
        </Container>
    )
}