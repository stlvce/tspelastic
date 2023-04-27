import React from "react";
import { Container } from "@mui/material";
import TableParametrs from "../Scheme/TableParametrs";

const AdminPage = () => {
    return (
        <main>
            <Container sx={{ pt: '100px' }}>
                <TableParametrs />
            </Container>
        </main>    
    )
}

export default AdminPage;