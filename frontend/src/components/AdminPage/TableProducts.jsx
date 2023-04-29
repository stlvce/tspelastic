import React, { Suspense, useContext } from "react";
import { LangContext } from "../../context/langContext";
import { Table, TableHead, TableRow, TableCell, Typography } from "@mui/material";

const TableProdBody = React.lazy(() => import('./TableProdBody'))

export default function TableProducts() {
    const [selectLang] = useContext(LangContext);

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    {selectLang.tableProd.map(param => 
                        <TableCell key={param} style={{width: "500px"}} align="center">{param}</TableCell>
                    )}
                </TableRow>
            </TableHead>
            <Suspense fallback={<Typography>Загрузка...</Typography>}>
                <TableProdBody />
            </Suspense>
        </Table>
    )
}