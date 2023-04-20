import React, { useState } from 'react';
import { 
    Container, 
    Box, 
    Typography, 
    Button
} from '@mui/material';
import Canvas from '../Scheme/Canvas'
import Productlist from '../ProductList/productlist';
import SelectedProducts from './SelectedProducts';
import ModalProducts from './ModalProducts';

const MainPage = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <main>
            <Container sx={{ pt: '100px' }}>
                <Canvas width={1200} height={800}/>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: "10px"}}>
                    <Typography variant="h5">
                        Продукты
                    </Typography>
                    <Button onClick={handleClickOpen} variant="contained">Добавить продукты</Button>
                    <ModalProducts open={open} handleClose={handleClose}/>
                </Box >
                <SelectedProducts/>
                <Productlist/>
            </Container>
        </main>      
    )
}

export default MainPage;