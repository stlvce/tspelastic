import React, { useState, useContext, useEffect } from "react";
import { LangContext } from "../../context/langContext";
import { 
    Button, 
    Input, 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow 
} from '@mui/material';
import { useCategoriesStore } from "../../services/state";
import { shallow } from "zustand/shallow";

export default function TableParametrs() {
    const categories = useCategoriesStore((state) => state.categories, shallow);
    const updateCategory = useCategoriesStore((state) => state.updateCategory);
    const updateCategoryfetch = useCategoriesStore((state) => state.updateCategoryfetch);
    const [editedId, setEditedid] =  useState(0);
    const [selectLang] = useContext(LangContext);

    function editCategory(id){
        setEditedid(id);
    }
    // function isCorrect(id) {
    //     return categories[id].end_x !== "" && categories[id].end_y !=="" && categories[id].start_x !=="" && categories[id].start_y !==""
    // }
    
    function saveedited(e, id){
        // console.log(e.target)
        // if (isCorrect(id-1)) {
        //     setValid(false)
        // }
        // console.log(categories)
        // if(editedId === id){
        //     updateCategoryfetch(id);
        //     setEditedid(0);
        // }
    }

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    {selectLang.tableParam.map(param => <TableCell key={param} align="center">{param}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
            {categories && categories.map(category=>{
                return(<TableRow key={category.id}>
                    <TableCell>{category.name} </TableCell>
                    <TableCell>
                        <Input type='number' value={category.start_x} onChange={(e)=>{
                            updateCategory(category.id, 'start_x', e.target.value)
                        }} disabled={editedId !== category.id}/>
                    </TableCell>
                    <TableCell>
                        <Input type='number' value={category.start_y} onChange={(e)=>{
                            updateCategory(category.id, 'start_y', e.target.value)
                        }} disabled={editedId !== category.id}/>
                    </TableCell>
                    <TableCell>
                        <Input type='number' value={category.end_x} onChange={(e)=>{
                            updateCategory(category.id, 'end_x', e.target.value)
                        }} disabled={editedId !== category.id}/>
                    </TableCell>
                    <TableCell>
                        <Input type='number' value={category.end_y} onChange={(e)=>{
                            updateCategory(category.id, 'end_y', e.target.value)
                        }} disabled={editedId !== category.id}/>
                        </TableCell>
                    <TableCell align="center">
                        {editedId === category.id ?
                        <Button onClick={(e)=>saveedited(e, category.id)} color="secondary">{selectLang.save}</Button>
                        :
                        <Button onClick={(e)=>editCategory(category.id)} color="secondary">{selectLang.edit}</Button>
                        }
                        </TableCell>
                </TableRow>)
            })}
            </TableBody>
        </Table>
    )
}
