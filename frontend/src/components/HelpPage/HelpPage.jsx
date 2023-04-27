import { Container, Typography, Image } from '@mui/material';
import React from 'react';
import imag from '../../assets/parameters.png'

const HelpPage = () => {
    return (
        <main>
            <Container maxWidth="xl" sx={{ pt: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant='h4'>Параметры</Typography>
                <Typography variant='body1' sx={{ fontSize: "20px", mb: "1em"}}>
                    При нажатии на кнопку параметры появляется диалоговое 
                    окно с параметрами для вычисления эластичной нейронной 
                    сети. Можете их корректировать для лучшей скорости. По 
                    умолчанию установлены оптимальные значения.
                </Typography>
                <img src={imag} alt="параметры" loading="lazy" width="500px"/>
            </Container>
        </main>    
    )
}

export default HelpPage;