import { gql, useMutation } from "@apollo/client";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    commandId: string;
}

export default function DeleteDialog({ commandId }: Props) {
    const DELETE_COMMAND = gql`
        mutation DeleteCommand($id: Int!) {
            deleteCommand(input: { id: $id }) {
                command {
                    id
                }
            }
        }
    `;

    const GET_ALL_COMMANDS = gql`
        query GetAllCommands {
            command(order: {howTo: DESC}) 
            {
                id
                howTo
                commandLine
                platform{
                    name
                }
            }
        }
    `


    const [open, setOpen] = useState(false);
    const [deleteCommand] = useMutation(DELETE_COMMAND, {
        variables: {
            id: commandId,
        },
        refetchQueries: [{ query: GET_ALL_COMMANDS }],
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        deleteCommand();
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen} edge="end">
                <DeleteIcon sx={{ fontSize: "2rem" }}/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Command?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this command?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error" autoFocus variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}