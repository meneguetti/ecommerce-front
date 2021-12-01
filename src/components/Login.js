import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./Footer";
import { Navigate } from "react-router-dom";
import { Snackbar, Alert as AlertMui } from "@mui/material";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function AlertMui(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

export default function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);

    // handle for login failed
    const handleClick = (message) => {
        setMessage(message);
        setOpen(true);
    };

    // handle for login failed 2
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    if (isLoggedIn) {
        return <Navigate to="/ecommerce" />;
    }

    const performLogin = (response) => {
        localStorage.setItem("accessToken", response["params"]["token"]);
        localStorage.setItem(
            "user",
            JSON.stringify(response["params"]["email"])
        );

        setIsLoggedIn(true);
        return <Navigate to="/ecommerce" />;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;",
                Accept: "application/json;",
                "Allow-Control-Allow-Origin": process.env.REACT_APP_FRONT_URL,
            },
            body: JSON.stringify({
                email: data.get("email"),
                password: data.get("password"),
            }),
        };

        return fetch(process.env.REACT_APP_API_URL + "/api/login", requestOptions)
            .then((response) => response.json())
            .then((data) =>
                data.success ? performLogin(data) : handleClick(message)
            );
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Footer sx={{ mt: 8, mb: 4 }} />
                <Stack spacing={2} sx={{ width: "100%" }}>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert
                            onClose={handleClose}
                            severity="error"
                            sx={{ width: "100%" }}
                        >
                           Login failed!
                        </Alert>
                    </Snackbar>
                </Stack>
            </Container>
        </ThemeProvider>
    );
}
