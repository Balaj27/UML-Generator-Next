"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword } from '../config/firebase';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", userCredential.user);
      router.push('/generate');
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google login successful:", result.user);
      router.push('/generate');
    } catch (error) {
      console.error("Error during Google login:", error);
      setError(error.message);
    }
  };

  return (
    <Box className="auth-form-container" sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "#fff" }}>
      <Box className="auth-form-header" sx={{ mb: 3 }}>
        <Typography variant="h4" align="center">Login</Typography>
      </Box>
      <Box
        className="auth-form-content"
        component="form"
        onSubmit={handleLogin}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Email Address"
          variant="outlined"
          type="email"
          fullWidth
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleGoogleLogin}
          className="google"
          type="button"
          fullWidth
          sx={{ mt: 1, mb: 1, textTransform: "none" }}
        >
          Continue with Google
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="auth-button"
          fullWidth
          sx={{ mt: 1 }}
        >
          Login
        </Button>
      </Box>
      <Box className="login-links" sx={{ mt: 3, textAlign: "center" }}>
        <Link href="/Pages/Signup" passHref>
          <Typography variant="body2" color="primary" component="span" sx={{ cursor: "pointer" }}>
            Don't have an account? Sign up!
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Login;