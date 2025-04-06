import React from 'react'
import { Stack, IconButton, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function UpdateCrud({ id, action, patchDelete,info,patchUpdate }) {

    const navigate = useNavigate();
    const handleUpdate = async (id) => {
        navigate(`/${patchUpdate}/${id}`); 
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar ? " + info);
        if (confirmed) {
            await action(id);
            toast.success("Se eliminó con éxito", { position: "top-right" });
            navigate(`/${patchDelete}`);
        } else {
            console.log("Eliminación cancelada por el usuario");
        }
    };

    return (
        <>
            <Stack spacing={1} direction="row" justifyContent="space-around">
                <IconButton key={`accion-${id}`} aria-label="delete" size="large"
                    onClick={() => handleUpdate(id)} >

                    <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton key={`delete-${id}`} onClick={() => handleDelete(id)} aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </Stack>
        </>
    )
}
