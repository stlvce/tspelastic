import React from "react";
import { Card, CardHeader, CardMedia } from '@mui/material';

const Scheme = () => {
    return (
        <Card>
            <CardHeader
                title="scheme"
            />
            <CardMedia 
                component="img"
                height="800"
                image='../../assets/eng_scheme.jpg'
                alt='scheme'
            />
        </Card>
    )
};

export default Scheme;