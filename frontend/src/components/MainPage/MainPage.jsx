import React from 'react';
import { Container } from '@mui/material';
import Canvas from '../Scheme/Canvas'
import Productlist from '../ProductList/productlist';

const MainPage = () => {
    return (
        <main>
            <Container sx={{ pt: '100px' }}>
                <Canvas width={1200} height={800}/>
                <Productlist/>
            </Container>
        </main>      
    )
}

export default MainPage;