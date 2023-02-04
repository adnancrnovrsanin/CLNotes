import { TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
    fullWidth?: boolean;
}

export default function EventFormTextInput(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <TextField 
            {...props}
            {...field}
            error={meta.touched && !!meta.error}
            id="outlined-error-helper-text"
            variant="outlined"
            helperText={meta.touched && meta.error}
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
                },
                "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                    color: "black"
                },
                "& .MuiOutlinedInput-input": {
                    '&::placeholder': {
                        fontFamily: "Roboto Mono, monospace",
                    },
                },
            }}
        />
    );
}