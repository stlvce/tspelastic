import React, { useState } from "react";
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

    function editCategory(id){
        setEditedid(id);
}

    function saveedited(id){
            if(editedId === id){
                const msg = updateCategoryfetch(id);
                setEditedid(0);
            }
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell>Начальное x</TableCell>
                    <TableCell>Начальное y</TableCell>
                    <TableCell>Конечное x</TableCell>
                    <TableCell>Конечное y</TableCell>
                    <TableCell>Действие</TableCell>
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
                    <TableCell>
                        {editedId === category.id ?
                        <Button onClick={(e)=>saveedited(category.id)} sx={{ color: "#000" }}>Сохранить</Button>
                        :
                        <Button onClick={(e)=>editCategory(category.id)} sx={{ color: "#000" }}>Редактировать</Button>
                        }
                        </TableCell>
                </TableRow>)
            })}
            </TableBody>
        </Table>
    )
}
