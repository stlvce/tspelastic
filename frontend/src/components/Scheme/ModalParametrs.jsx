import React from "react";
import { 
    Dialog,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    IconButton,
    Typography,
    Button,
    TextField,
    Grid
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

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
    return (
        <Dialog open={open} onClose={handleClose} scroll="body" maxWidth="md">
            <Toolbar>
                <Typography sx={{ flex: 1 }} variant="h5">Параметры</Typography>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            {/* <List sx={{ p: "5px 20px" }}>
                {parametrs.map((p) => (
                    <ListItem disableGutters key={p.name}>
                        <TextField fullWidth label={p.name} id={p.name} />
                    </ListItem>
                ))}
            </List> */}
            <Grid container justifyContent="space-between" sx={{ gap: "10px", p: "10px 24px"}}>
                {parametrs.map((p) => (
                    <Grid item key={p.name}>
                        <TextField fullWidth label={p.name} id={p.name} />
                    </Grid>
                ))}
            </Grid>
            <Button onClick={handleClose} sx={{ mt: "20px"}} variant="text" color="success">Готово</Button>
        </Dialog>   
    )
}