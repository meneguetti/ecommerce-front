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

const theme = createTheme();

export default function SignUp() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                "Content-Type": "application/json;", // Your headers
                Accept: "application/json;", // Your headers
                "Allow-Control-Allow-Origin": "http://localhost:3000/",
            },
            body: JSON.stringify({
                fullname: data.get("fullname"),
                email: data.get("email"),
                password: data.get("password"),
            }),
        };

        fetch("http://localhost/api/register", requestOptions)
            .then((response) => response.json())
            .then((data) => (data.success ? performLogin(data) : false));

            return <Navigate to="/ecommerce" />;    
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
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fullname"
                                    name="fullname"
                                    required
                                    fullWidth
                                    id="fullname"
                                    label="Full Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Footer sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
