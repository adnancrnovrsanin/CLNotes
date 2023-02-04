
import { gql, useQuery } from "@apollo/client"
import Grid2 from "@mui/material/Unstable_Grid2";
import logo from '../assets/CLNotesLogo.png';
import { Button, CircularProgress, Divider, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteDialog from "../components/DeleteDialog";

export default function SearchCommands() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [commands, setCommands] = useState<any[]>([]);

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

    const GET_COMMANDS_BY_SEARCH = gql`
        query GetCommandsBySearch {
            command (where: {or: [
                {howTo: {contains: "${searchQuery}"}},
                {commandLine: {contains: "${searchQuery}"}},
				{platform: {name: {contains: "${searchQuery}"}}}
            ]}, order: {howTo: DESC}){
                id
                howTo
                commandLine
                platform{
                    name
                }
            }
        }
    `
    const { loading: loadingCommands, error, data, refetch } = useQuery((searchQuery === "") ? GET_ALL_COMMANDS : GET_COMMANDS_BY_SEARCH);

    if (false) return <div
        style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <CircularProgress />
    </div>;

    useEffect(() => {
        refetch();
        if (data) {
            setCommands(data.command);
        }
    }, [data])
    
    return (
        <Grid2 xs={12} sm={12} md={10} lg={9} xl={9} container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2rem",
                minHeight: "100vh",
            }}
        >
            <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2rem",
                    marginTop: "2rem",
                }}
            >
                <img src={logo} alt="Logo"
                    style={{
                        width: "150px"
                    }}
                />

                <Typography
                    sx={{
                        fontFamily: "Roboto Mono, monospace",
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                    }}
                >
                    CL Notes
                </Typography>
            </Grid2>

            <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography
                    sx={{
                        fontFamily: "Roboto Mono, monospace",
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem", lg: "2rem", xl: "2rem"}
                    }}
                >
                    Everything you need to master the terminal.
                </Typography>
            </Grid2>

            <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button
                    component={Link}
                    to="/add"
                    variant="contained"
                    sx={{
                        fontFamily: "Roboto Mono, monospace",
                        fontWeight: "bold",
                        fontSize: { xs: "0.75rem", sm: "0.75rem", md: "1rem", lg: "1rem", xl: "1rem"},
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "black",
                            color: "white",
                        },
                        textTransform: "none",
                    }}
                >
                    Add a new command
                </Button>
            </Grid2>

            <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                    id="outlined-basic"
                    label="Search for a command"
                    variant="outlined"
                    fullWidth
                    placeholder="Search..."
                    onChange={(e) => {
                        setSearchQuery(e.target.value.trim());
                        refetch();
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "black",
                            },
                            "&:hover fieldset": {
                                borderColor: "black",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "black",
                            },
                        },
                        "& .MuiInputLabel-root": {
                            color: "black",
                            fontFamily: "Roboto Mono, monospace",
                        },
                        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                            transform: "translate(14px, -6px) scale(0.65)",
                            color: "black"
                        },
                        "& .MuiOutlinedInput-input": {
                            '&::placeholder': {
                                fontFamily: "Roboto Mono, monospace",
                            },
                        },
                    }}
                />
            </Grid2>

            <Grid2 xs={12} sm={12} md={12} lg={12} xl={12} container>
                <List sx={{ width: "100%", bgcolor: 'background.paper'}}>
                    {!loadingCommands ? (commands.map((command, i) => (
                        <Grid2 key={i} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <ListItem
                                secondaryAction={
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            paddingRight: "1rem",
                                        }}
                                    >
                                        <IconButton edge="end" aria-label="edit command"
                                            sx={{
                                                marginRight: "1rem",
                                            }}
                                            component={Link}
                                            to={`/edit/${command.id}`}
                                        >
                                            <EditIcon sx={{ fontSize: "2rem" }} />
                                        </IconButton>

                                        <DeleteDialog commandId={command.id} />
                                    </div>
                                }
                            >
                                <ListItemText primary={
                                    <Typography
                                        sx={{
                                            fontFamily: "Roboto Mono, monospace",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {command.commandLine}
                                    </Typography>
                                } secondary={
                                    <>
                                        <Typography
                                            sx={{
                                                fontFamily: "Roboto Mono, monospace",
                                                margin: "10px"
                                            }}
                                        >
                                            {command.howTo}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontFamily: "Roboto Mono, monospace",
                                                fontWeight: "bold",
                                                fontSize: "0.75rem",
                                            }}
                                        >
                                            {command.platform.name}
                                        </Typography>
                                    </>
                                } />
                            </ListItem>
                            <Divider component="li" />
                        </Grid2>
                    ))) : (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <CircularProgress />
                        </div>
                    )}
                </List>
            </Grid2>
        </Grid2>
    )
}