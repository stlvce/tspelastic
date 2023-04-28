import React, { useEffect } from 'react';
import Rout from './components/Rout';
import { useProductsStore, useCategoriesStore } from './services/state';
import "./styles/App.css"

function App() {
    const getProducts = useProductsStore((state) => state.getProducts);
    const getCategories = useCategoriesStore((state) => state.getCategories);

    useEffect(()=>{
        getProducts();
        getCategories();
    }, [])

    return (
        <Rout />
    );
}

export default App;
