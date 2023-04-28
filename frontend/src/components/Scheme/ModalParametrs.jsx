import React, { useContext } from "react";
import { 
    Dialog,
    Toolbar,
    IconButton,
    Typography,
    Button,
    TextField,
    Grid
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { LangContext } from "../../context/langContext";

// Убрать это
const parametrs = [
    {name: 'alpha', def: '0.2'}, 
    {name: 'beta', def: '2.0'}, 
    {name: 'init_k', def: '0.2'}, 
    {name: 'epsilon', def: '0.02'}, 
    {name: 'k_alpha', def: '0.99'}, 
    {name: 'k_update_period', def: '25'}, 
    {name: 'k_num_iter', def: '10000'}, 
    {name: 'num_neurons_factor', def: '2.5'}, 
    {name: 'radius', def: '0.1'}, 
];

export default function ModalParametrs({ open, handleClose }) {
    const [selectLang] = useContext(LangContext);

    return (
        <Dialog open={open} onClose={handleClose} scroll="body" maxWidth="md">
            <Toolbar>
                <Typography sx={{ flex: 1 }} variant="h5">{selectLang.param}</Typography>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <Grid container justifyContent="space-between" sx={{ gap: "10px", p: "10px 24px"}}>
                {parametrs.map((p) => (
                    <Grid item key={p.name}>
                        <TextField fullWidth label={p.name} id={p.name} defaultValue={p.def}/>
                    </Grid>
                ))}
            </Grid>
            <Button onClick={handleClose} sx={{ mt: "20px"}} variant="text" color="success">{selectLang.done}</Button>
        </Dialog>   
    )
}