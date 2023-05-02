import React from 'react';
import { Container } from '@mui/material';
import Canvas from '../Scheme/Canvas'
import SelectedProducts from './SelectedProducts';
import { useCategoriesStore, useProductsStore } from '../../services/state';
import { shallow } from 'zustand/shallow';

const MainPage = () => {
    const categories = useCategoriesStore(state=>state.categories, shallow);
    const products = useProductsStore(state=> state.products);
    return (
        <main>
            <Container sx={{ p: '100px 0' }}>
                <Canvas width={1200} height={800}/>
                <SelectedProducts products={products} categories={categories}/>
            </Container>
        </main>      
    )
}

export default MainPage;