import React, { useContext } from 'react';
import { LangContext } from '../../context/langContext';
import { Container, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';
import DescriptParams from './DescriptParams';

const FlexBox = styled('div')(({ theme }) => ({
    maxWidth: "800px",
    [theme.breakpoints.up('xl')]: {
        maxWidth: "600px"
    },
}));

const HelpPage = ({ styleFlex }) => {
    const [selectLang] = useContext(LangContext);

    return (
        <main>
            <Container maxWidth="xl" sx={styleFlex}>
                <Box sx={{width: "800px"}}>
                    <Typography variant='h4'>{selectLang.param}</Typography>
                    <Typography variant='body1' sx={{ fontSize: "20px"}}>
                        {selectLang.description}
                    </Typography>
                    <DescriptParams />
                </Box>
                <FlexBox>
                    <img src={selectLang.imgParam} alt="параметры" loading="lazy" width="100%"/>
                </FlexBox>
            </Container>
        </main>    
    )
}

export default HelpPage;