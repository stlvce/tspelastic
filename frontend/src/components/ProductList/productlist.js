import React, { useEffect } from 'react'
import { 
    Box, 
    Card, 
    CardContent, 
    CardHeader, 
    CardMedia, 
    Grid, 
    Typography 
} from '@mui/material';
import {useProductsStore, useCategoriesStore} from '../../services/state'
import { shallow } from 'zustand/shallow'

export default function Productlist() {
    const productlist = useProductsStore((state) => state.products, shallow);
    const getProducts = useProductsStore((state) => state.getProducts);
    const categories = useCategoriesStore((state) => state.categories, shallow);
    const getCategories = useCategoriesStore((state) => state.getCategories);

    useEffect(()=>{
        getProducts();
        getCategories();
    }, [])

    return (
        <Box>
            {/* <Grid container spacing={6}>
                {productlist && productlist.map(product=>
                    <Grid item key={product.id}>
                        <Card sx={{
                            width: '250px',
                            height: '500px',
                        }}>
                            <CardHeader
                                title={product.name}
                                subheader={categories ? 
                                    categories.filter(category => 
                                        category.id === product.category_id
                                    )[0]?.name : ''
                                }
                            />
                            <CardMedia
                                component="img"
                                height="128px"
                                width="128px"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography>
                                    {product.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>   
                )}
            </Grid> */}
        </Box>
    )
}
