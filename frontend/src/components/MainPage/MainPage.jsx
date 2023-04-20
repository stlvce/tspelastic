import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import Canvas from '../Scheme/Canvas'
import Productlist from '../ProductList/productlist';
import SelectedProducts from './SelectedProducts';

const MainPage = () => {
    return (
        <main>
            <Container sx={{ pt: '100px' }}>
                <Canvas width={1200} height={800}/>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: "10px"}}>
                    <Typography variant="h5">
                        Продукты
                    </Typography>
                    <Button variant="contained">Добавить продукты</Button>
                </Box >
                <SelectedProducts/>
                <Productlist/>
            </Container>
        </main>      
    )
}

export default MainPage;