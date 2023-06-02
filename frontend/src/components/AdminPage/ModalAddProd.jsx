import React, { useState, useContext } from "react";
import { LangContext } from "../../context/langContext";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControl  } from "@mui/material";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import styled from "@emotion/styled";
import { useProductsStore } from "../../services/state";

const blue = {
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
};

  const grey = {
    50: '#f6f8fa',
    200: '#d0d7de',
    300: '#afb8c1',
    700: '#424a53',
    900: '#24292f',
};

const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
        width: 320px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        margin-top: 10px;
        border-radius: 12px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    
        &:hover {
        border-color: ${blue[400]};
        }
    
        &:focus {
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
        }
    
        // firefox
        &:focus-visible {
        outline: 0;
        }
    `,
);

export default function ModalAddProd({ open, handleClose }) {
    const createProduct = useProductsStore((state) => state.AddProductfetch);
    const [selectLang] = useContext(LangContext);
    const [newProduct, setNewProduct] = useState({
        category_id: "",
        description: "",
        image: "",
        name: ""
    });

    const handleChange = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        newProduct[nameInput] = value;
        setNewProduct(newProduct);
    }

    const handleSubmit = () => {
        createProduct(
            newProduct.name,
            newProduct.image,
            newProduct.description,
            newProduct.category_id
        );
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{selectLang.modalCreateProd.header}</DialogTitle>
            <DialogContent>
                <FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label={selectLang.modalCreateProd.name}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="category_id"
                        name="category_id"
                        label={selectLang.modalCreateProd.category}
                        type="number"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="image"
                        name="image"
                        label={selectLang.modalCreateProd.imageLink}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <StyledTextarea
                        aria-label="empty textarea"
                        id="description"
                        name="description"
                        placeholder={selectLang.modalCreateProd.description}
                        onChange={handleChange}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} color="secondary" variant="outlined">
                    {selectLang.modalCreateProd.cancel}
                </Button>
                <Button onClick={handleClose} color="success" variant="outlined">
                    {selectLang.modalCreateProd.create}
                </Button>
            </DialogActions>
        </Dialog>
    )
}