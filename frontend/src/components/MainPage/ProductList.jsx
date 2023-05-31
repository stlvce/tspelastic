import React, { useState, useEffect, createRef, useRef } from "react";
import { List } from "@mui/material";
import { useProductsStore } from "../../services/state";
import { shallow } from "zustand/shallow";
import ProductItem from "./ProductItem";

export default function ProductList({ searchtext, filtercategory, select, unselect }) {
    const productlist = useProductsStore((state) => state.products, shallow);
    const portion = 20;
    const totalPages = Math.ceil(productlist.length / portion);
    const [arrProd, setArrProd] = useState({ data: [], page: 1});
    const lastItem = createRef();
    const observerLoader = useRef();

    const getNewProds = () => {
        if (arrProd.data.length > 1) {      
            setArrProd({
                data: [...arrProd.data, ...productlist.slice(arrProd.data.length, portion*arrProd.page)],
                page: arrProd.page+1
            })
        } else {
            setArrProd({
                data: [...productlist.slice(0, portion)],
                page: arrProd.page+1
            })
        }
    }

    const actionInSight = (entries) => {
        if (entries[0].isIntersecting && arrProd.page <= totalPages) {
            getNewProds();
        }
    };

    const categoryFilter = product => {
        return filtercategory.length ? filtercategory.includes(product.category_id) : product
    };

    const searchFilter = product => {
        return product.name.toLowerCase().includes(searchtext.toLowerCase())
    }

    useEffect(() => getNewProds(), [])

    useEffect(() => {
        if (observerLoader.current) observerLoader.current.disconnect();
        observerLoader.current = new IntersectionObserver(actionInSight);
        if (lastItem.current) observerLoader.current.observe(lastItem.current);
        console.log(searchtext)
        console.log(filtercategory)
    }, [lastItem]);

    return (
        <List>
            {searchtext !== '' || filtercategory.length > 0 
            ? productlist.filter(categoryFilter).filter(searchFilter).map(product =>
                <ProductItem product={product} select={select} unselect={unselect} key={product.id}/>
            )
            : arrProd.data.map(
                (product, index) => index + 1 === arrProd.data.length 
                    ? <ProductItem product={product} select={select} unselect={unselect} key={product.id} ref={lastItem}/> 
                    : <ProductItem product={product} select={select} unselect={unselect} key={product.id}/>)
            }
        </List>    
    )
}