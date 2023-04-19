import { Box, Breadcrumbs, Button, Card, CardContent, CardHeader, CardMedia, Grid, Input, List, ListItem, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import {useProductsStore, useCategoriesStore} from '../../services/state'
import { shallow } from 'zustand/shallow'

export default function Productlist() {
    const productlist = useProductsStore((state) => state.products, shallow);
    const getProducts = useProductsStore((state) => state.getProducts);
    const categories = useCategoriesStore((state) => state.categories, shallow);
    const getCategories = useCategoriesStore((state) => state.getCategories);
    const updateCategory = useCategoriesStore((state) => state.updateCategory);
    const updateCategoryfetch = useCategoriesStore((state) => state.updateCategoryfetch);
    const [editedId, setEditedid] =  useState(0);

    useEffect(()=>{
        getProducts();
        getCategories();
    }, [])

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
    <Box>
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
                    <Button onClick={(e)=>saveedited(category.id)}>Сохранить</Button>
                    :
                    <Button onClick={(e)=>editCategory(category.id)}>Редактировать</Button>
                    }
                    </TableCell>
            </TableRow>)
            })}
            </TableBody>
        </Table>
        <Grid container spacing={2}>
            {productlist && productlist.map(product=>{
            return(<Grid key={product.id}>
                <Card sx={{
                    width: '150px',
                    title:{
                        fontSize: '12px'
                    }
                }}>
                    <CardHeader
                    title={product.name}
                    subheader={categories ? categories.filter(category=> category.id === product.category_id)[0].name : ''}
                    />
                <CardMedia
                    component="img"
                    height="128px"
                    width="128px"
                    image={product.image}
                    alt={product.name}
                />
                <CardContent>
                    <Typography>
                        {product.description}
                    </Typography>
                </CardContent>
                </Card>
            </Grid>)
            })}
        </Grid>
    </Box>
  )
}
