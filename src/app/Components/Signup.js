"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { auth, db, doc, setDoc, googleProvider, signInWithPopup, createUserWithEmailAndPassword } from '../config/firebase';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: new Date()
      });

      console.log("User registered and data stored:", user);
      router.push('/generate');
    } catch (error) {
      console.error("Error during signup:", error);
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: new Date()
      });

      console.log("Google signup successful:", user);
      router.push('/generate');
    } catch (error) {
      console.error("Error during Google signup:", error);
      setError(error.message);
    }
  };

  return (
    <Box className="auth-form-container" sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "#fff" }}>
      <Box className="auth-form-header" sx={{ mb: 3 }}>
        <Typography variant="h4" align="center">Signup</Typography>
      </Box>
      <Box
        className="auth-form-content"
        component="form"
        onSubmit={handleSignup}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Name"
          variant="outlined"
          type="text"
          fullWidth
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          className="form-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleGoogleSignup}
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
          Sign Up
        </Button>
      </Box>
      <Box className="login-links" sx={{ mt: 3, textAlign: "center" }}>
        <Link href="/Pages/Login" passHref>
          <Typography variant="body2" color="primary" component="span" sx={{ cursor: "pointer" }}>
            Already have an account? Login!
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Signup;