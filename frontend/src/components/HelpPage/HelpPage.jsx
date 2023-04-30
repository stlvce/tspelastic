import React, { useContext } from 'react';
import { LangContext } from '../../context/langContext';
import { Container, Typography } from '@mui/material';

const styleContainerFlex = {
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center",
    pt: "100px"
};

const HelpPage = () => {
    const [selectLang] = useContext(LangContext);

    return (
        <main>
            <Container maxWidth="xl" sx={styleContainerFlex}>
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