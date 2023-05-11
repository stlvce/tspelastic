import React from 'react';
import { Container } from '@mui/material';
import Canvas from '../Scheme/Canvas'
import SelectedProducts from './SelectedProducts';
import { useCategoriesStore, useProductsStore } from '../../services/state';
import { shallow } from 'zustand/shallow';

const MainPage = ({ styleFlex }) => {
    const categories = useCategoriesStore(state=>state.categories, shallow);
    const products = useProductsStore(state=> state.products);
    
    return (
        <main>
            <Container sx={styleFlex} maxWidth="xl">
                <Canvas width={700} height={600}/>
                <SelectedProducts products={products} categories={categories}/>
            </Container>
        </main>      
    )
}

export default MainPage;