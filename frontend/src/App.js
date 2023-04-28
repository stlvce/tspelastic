import React, { useEffect, useState } from 'react';
import Rout from './components/Rout';
import { useProductsStore, useCategoriesStore } from './services/state';
import { LangContext, langList } from './context/langContext';
import "./styles/App.css"

function App() {
    const getProducts = useProductsStore((state) => state.getProducts);
    const getCategories = useCategoriesStore((state) => state.getCategories);
    const [isLang, setIsLang] = useState(false)
    const [selectLang, setSelectState] = useState(langList.ru)

    useEffect(() =>  isLang ? setSelectState(langList.en) : setSelectState(langList.ru), [isLang])
    useEffect(()=> {
        getProducts();
        getCategories();
    }, [])

    return (
        <LangContext.Provider value={[selectLang, isLang, setIsLang]}>
            <Rout />
        </LangContext.Provider>
    );
}

export default App;
