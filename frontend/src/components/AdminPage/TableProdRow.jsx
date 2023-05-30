import React, { useState, forwardRef, useContext } from "react";
import { Button, Input, TableCell, TableRow, IconButton, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useProductsStore } from "../../services/state";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { LangContext } from "../../context/langContext";

const TableProdRow = forwardRef(({ product }, ref) => {
    const updateProduct = useProductsStore((state) => state.updateProduct);
    const updateProductfetch = useProductsStore((state) => state.updateProductfetch);
    const deleteProduct = useProductsStore((state) => state.deleteProduct);
    const [editedId, setEditedid] =  useState(0);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClickClose = () => setOpen(false);
    const [selectLang] = useContext(LangContext);

    function editCategory(id){
        setEditedid(id);
    }

    function saveedited(id){
        if (editedId === id) {
            updateProductfetch(id);
            setEditedid(0);
        }
    }

    function handleDelete() {
        deleteProduct(product.id);
        handleClickClose();
    }

    return (
        <TableRow key={product.id} ref={ref}>
            <TableCell>
                <Input type='string' value={product.name} onChange={(e)=>{
                    updateProduct(product.id, 'name', e.target.value)
                }} disabled={editedId !== product.id} fullWidth/>
            </TableCell>
            <TableCell>
                <Input type='number' value={product.category_id} onChange={(e)=>{
                    updateProduct(product.id, 'category_id', e.target.value)
                }} disabled={editedId !== product.id}/>
            </TableCell>
            <TableCell>
                <Input type='string' value={product.description} onChange={(e)=>{
                    updateProduct(product.id, 'description', e.target.value)
                }} disabled={editedId !== product.id}/>
            </TableCell>
            <TableCell align="center">
                <ButtonGroup>
                    {editedId === product.id ?
                    <IconButton onClick={(e)=>saveedited(product.id)} color="secondary"><SaveIcon /></IconButton>
                    :
                    <IconButton onClick={(e)=>editCategory(product.id)} color="secondary"><EditIcon /></IconButton>
                    }
                    <IconButton onClick={handleClickOpen}><DeleteIcon /></IconButton>
                    <Dialog
                        open={open}
                        onClose={handleClickClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {selectLang.questDelete}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClickClose} color="secondary">{selectLang.disagree}</Button>
                            <Button onClick={handleDelete} color="error">{selectLang.agree}</Button>
                        </DialogActions>
                    </Dialog>
                </ButtonGroup>
            </TableCell>    
        </TableRow>
    )
})

export default TableProdRow;