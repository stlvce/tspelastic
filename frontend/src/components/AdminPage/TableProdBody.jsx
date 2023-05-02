import React, { useState, useContext } from "react";
import { LangContext } from "../../context/langContext";
import { Button, Input, TableBody, TableCell, TableRow } from '@mui/material';
import { useProductsStore } from "../../services/state";
import { shallow } from "zustand/shallow";

export default function TableProdBody() {
    const productlist = useProductsStore((state) => state.products, shallow);
    const updateProduct = useProductsStore((state) => state.updateProduct);
    const updateProductfetch = useProductsStore((state) => state.updateProductfetch);
    const [editedId, setEditedid] =  useState(0);
    const [selectLang] = useContext(LangContext);

    function editCategory(id){
        setEditedid(id);
    }

    function saveedited(id){
        if (editedId === id) {
            updateProductfetch(id);
            setEditedid(0);
        }
    }
    
    return (
        <TableBody>
            {productlist.slice(0,20)?.map(product => {
                return(<TableRow key={product.id}>
                    <TableCell>
                        <Input type='string' value={product.name} onChange={(e)=>{
                            updateProduct(product.id, 'name', e.target.value)
                        }} disabled={editedId !== product.id} fullWidth/>
                    </TableCell>
                    <TableCell>
                        <Input type='number' value={product.category_id} onChange={(e)=>{
                            updateProduct(product.id, 'category_id', e.target.value)
                        }} disabled={editedId !== product.id}/>
                    </TableCell>
                    <TableCell>
                        <Input type='string' value={product.description} onChange={(e)=>{
                            updateProduct(product.id, 'description', e.target.value)
                        }} disabled={editedId !== product.id}/>
                    </TableCell>
                    <TableCell align="center">
                        {editedId === product.id ?
                        <Button onClick={(e)=>saveedited(product.id)} color="secondary">{selectLang.save}</Button>
                        :
                        <Button onClick={(e)=>editCategory(product.id)} color="secondary">{selectLang.edit}</Button>
                        }
                        </TableCell>
                </TableRow>)
            })}
        </TableBody>
    )
}