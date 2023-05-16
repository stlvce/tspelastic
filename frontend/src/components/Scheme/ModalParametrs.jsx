import React, { useContext } from "react";
import { Dialog, Toolbar, IconButton, Typography, Button, TextField, Grid, Tooltip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useCanvasStore } from "../../services/state";
import { shallow } from "zustand/shallow";
import { LangContext } from "../../context/langContext";

export default function ModalParametrs({ open, handleClose }) {
    const [selectLang] = useContext(LangContext);
    const state = useCanvasStore((state) => state, shallow);

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        state.params[id] = Number(value);
    }

    const handleSubmit = () => {
        handleClose();
        // state.saveParams(state.params);
    }

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
                {Object.keys(state.params).map(key =>(
                    <Grid item key={key}>
                        <Tooltip title={selectLang.parmDescript[key]} placement="left" arrow>
                            <TextField 
                                id={key} 
                                label={key} 
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleChange} 
                                defaultValue={state.params[key]} 
                                fullWidth
                            />
                        </Tooltip>
                    </Grid>       
                ))}
            </Grid>
            <Button onClick={handleSubmit} sx={{ mt: "20px"}} variant="text" color="success">
                {selectLang.done}
            </Button>
        </Dialog>   
    )
}