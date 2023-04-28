import React from 'react';
import { Container } from '@mui/material';
import Canvas from '../Scheme/Canvas'
import SelectedProducts from './SelectedProducts';

const MainPage = () => {
    return (
        <main>
            <Container sx={{ p: '100px 0' }}>
                <Canvas width={1200} height={800}/>
                <SelectedProducts />
            </Container>
        </main>      
    )
}

export default MainPage;