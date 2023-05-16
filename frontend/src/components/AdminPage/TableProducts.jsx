import React, { useState, useEffect, useContext, createRef, useRef } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import { useProductsStore } from "../../services/state";
import { shallow } from "zustand/shallow";
import { LangContext } from "../../context/langContext";
import TableProdRow from "./TableProdRow";


export default function TableProducts() {
    const productlist = useProductsStore((state) => state.products, shallow);
    const portion = 20;
    const totalPages = Math.ceil(productlist.length / portion);
    const [arrProd, setArrProd] = useState({ data: [], page: 1});
    const lastItem = createRef();
    const observerLoader = useRef();
    const [selectLang] = useContext(LangContext);

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

    useEffect(() => getNewProds(), [])

    useEffect(() => {
        if (observerLoader.current) observerLoader.current.disconnect();
        observerLoader.current = new IntersectionObserver(actionInSight);
        if (lastItem.current) observerLoader.current.observe(lastItem.current);
    }, [lastItem]);

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    {selectLang.tableProd.map(param => 
                        <TableCell key={param} style={{width: "500px"}} align="center">{param}</TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {arrProd.data?.map((product, index) => index + 1 === arrProd.data.length 
                    ? <TableProdRow product={product} key={product.id} ref={lastItem}/>
                    : <TableProdRow product={product} key={product.id}/>
                )}
            </TableBody>
        </Table>
    )
}