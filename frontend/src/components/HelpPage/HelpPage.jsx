import React, { useContext } from 'react';
import { LangContext } from '../../context/langContext';
import { Container, Typography } from '@mui/material';

const HelpPage = () => {
    const [selectLang] = useContext(LangContext);

    return (
        <main>
            <Container maxWidth="xl" sx={{ pt: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant='h4'>{selectLang.param}</Typography>
                <Typography variant='body1' sx={{ fontSize: "20px", mb: "1em"}}>
                    {selectLang.description}
                </Typography>
                <img src={selectLang.imgParam} alt="параметры" loading="lazy" width="500px"/>
            </Container>
        </main>    
    )
}

export default HelpPage;