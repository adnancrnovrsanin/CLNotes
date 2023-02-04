import Grid2 from "@mui/material/Unstable_Grid2";
import { Form, Formik } from "formik";
import MyTextInput from "../components/MyTextInput";
import { Button, CircularProgress, Typography } from "@mui/material";
import logo from '../assets/CLNotesLogo.png';
import { gql, useMutation, useQuery } from '@apollo/client';
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EditCommand() {
    const { id } = useParams();
    const EDIT_COMMAND = gql`
        mutation EditCommand($commandLine: String!, $howTo: String!, $platformName: String!) {
            editCommand(input: {
                id: ${id},
                howTo: $howTo,
                commandLine: $commandLine,
                platformName: $platformName
            }) 
            {
                command {
                    id
                    howTo
                    commandLine
                }
            }
        }
    `;

    const GET_COMMAND_BY_ID = gql`
        query GetCommandById {
            command(where: { id: { eq: ${id} } })
            {
                id
                howTo
                commandLine
                platform {
                    name
                }
            }
        }
    `

    const [EditCommand, { error }] = useMutation(EDIT_COMMAND);
    const { data, loading } = useQuery(GET_COMMAND_BY_ID)
    const navigate = useNavigate();

    if (loading) return <div
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

    return (
        <Grid2 xs={12} sm={12} md={12} lg={12} xl={12} container
            sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Formik
                initialValues={{ commandLine: data.command[0].commandLine, howTo: data.command[0].howTo, platformName: data.command[0].platform.name }}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                    EditCommand({
                        variables: {
                            howTo: values.howTo,
                            commandLine: values.commandLine,
                            platformName: values.platformName,
                        }
                    }).then((res) => {
                        setSubmitting(false);
                        toast.success("Command edited successfully!");
                        navigate("/");
                    }).catch(err => {
                        setErrors(err);
                    })
                }}
                validationSchema={Yup.object({
                    commandLine: Yup.string().required("Required"),
                    howTo: Yup.string().required("Required"),
                    platformName: Yup.string().required("Required"),
                })}
            >
                {({ isSubmitting, handleSubmit, isValid, dirty }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'
                        style={{ 
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "20px",
                            fontFamily: "Montserrat, serif",
                            width: "80%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "2rem",
                                marginBottom: "3rem",
                                cursor: "pointer",
                            }}
                            onClick={() => navigate('/')}
                        >
                            <img src={logo} alt="logo" 
                                style={{
                                    width: "130px",
                                }}
                            />
                            <Typography sx={{
                                fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem", lg: "2.5rem", xl: "2.5rem" },
                                fontWeight: "bold",
                                fontFamily: "Roboto Mono, monospace",
                            }}>
                                Add a new command
                            </Typography>

                        </div>

                        <MyTextInput placeholder="Type the command that you want to save..." name='commandLine' label="Command" fullWidth/>
                        <MyTextInput placeholder="Type the description of the command" name="howTo" type="text" label="Description" fullWidth/>
                        <MyTextInput placeholder="Type the name of the platform this command is for" name="platformName" type="text" label="Platform" fullWidth/>

                        <Button disabled={!dirty || isSubmitting} type="submit" variant="contained"
                            sx={{
                                textTransform: "none",
                                fontSize: { xs: "0.75rem", sm: "0.75rem", md: "1rem", lg: "1.25rem", xl: "1.25rem" },
                                bgcolor: "#1e1e1e",
                                '&:hover': {
                                    bgcolor: "#575757",
                                },
                            }}
                            fullWidth
                        >
                            {isSubmitting ? "Adding..." : "Add"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Grid2>
    )
}