import React from 'react';
import { Container } from '@mui/material';
import Scheme from './Scheme';

const MainPage = () => {
    return (
        <main>
            <Container sx={{ pt: '100px' }}>
                <Scheme />
            </Container>
        </main>      
    )
}

export default MainPage;