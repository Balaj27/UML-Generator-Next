"use client";

import React, { useState } from "react";
import Navbar from "@/app/Components/Navbar";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  CssBaseline,
} from "@mui/material";

// Colors to match the navbar/sidebar theme in your screenshot
const NAVBAR_BG = "#423dae";
const SIDEBAR_BG = "#282828";
const SIDEBAR_TEXT = "#fff";
const SIDEBAR_WIDTH = 340;

function UmlComponent() {
  const [message, setMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [initialSubmitted, setInitialSubmitted] = useState(false);

  // Handles initial and edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, editMessage }),
      });

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || "Failed to fetch diagram");
      }

      const data = await response.json();
      if (data.url) {
        setImages((prevImages) => [data.url, ...prevImages]);
        setInitialSubmitted(true);
        setEditMessage(""); // Always clear edit field after submit
      } else {
        setError("No image URL received");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>

      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Box
          component="aside"
          sx={{
            width: SIDEBAR_WIDTH,
            bgcolor: SIDEBAR_BG,
            color: SIDEBAR_TEXT,
            minHeight: "calc(100vh - 0px)",
            pt: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          {/* Make sure sidebar starts below navbar */}
          <Box sx={{ width: "100%", px: 3, pt: 10 }}>
         
            {/* Scenario input and Generate button */}
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Typography
                sx={{
                  color: "#bfcce2",
                  fontWeight: 500,
                  mb: 1,
                  fontSize: 19,
                  opacity: 0.7,
                }}
              >
                Scenario
              </Typography>
              <TextField
                variant="filled"
                size="medium"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter scenario"
                required
                disabled={initialSubmitted}
                InputProps={{
                  sx: {
                    color: "#d9e3f0",
                    background: "#232946",
                    borderRadius: "8px",
                    fontSize: 18,
                    fontWeight: 400,
                    "&::placeholder": {
                      color: "#bfcce2",
                      opacity: 0.8,
                      fontSize: 16,
                    },
                  },
                }}
                sx={{
                  mb: 3,
                  input: { color: "#d9e3f0" },
                }}
              />
              <Button
                type="submit"
                fullWidth
                sx={{
                  bgcolor: "#ffb0d4",
                  color: "#232946",
                  fontWeight: 700,
                  fontSize: 20,
                  borderRadius: "8px",
                  textTransform: "none",
                  boxShadow: "none",
                  height: 56,
                  mb: 2,
                  "&:hover": {
                    bgcolor: "#faa2c1",
                  },
                }}
                disableElevation
              >
                Generate
              </Button>
            </form>
            {/* Edit input and button (appears after first diagram is generated) */}
            {initialSubmitted && (
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Typography
                  sx={{
                    color: "#bfcce2",
                    fontWeight: 500,
                    mb: 1,
                    fontSize: 19,
                    opacity: 0.7,
                    mt: 2,
                  }}
                >
                  Edit Diagram
                </Typography>
                <TextField
                  variant="filled"
                  size="medium"
                  fullWidth
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  placeholder="Describe your edit (e.g. add a class, change relation...)"
                  InputProps={{
                    sx: {
                      color: "#d9e3f0",
                      background: "#232946",
                      borderRadius: "8px",
                      fontSize: 17,
                      fontWeight: 400,
                      "&::placeholder": {
                        color: "#bfcce2",
                        opacity: 0.8,
                        fontSize: 15,
                      },
                    },
                  }}
                  sx={{
                    mb: 2,
                    input: { color: "#d9e3f0" },
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    bgcolor: "#ffb0d4",
                    color: "#232946",
                    fontWeight: 700,
                    fontSize: 20,
                    borderRadius: "8px",
                    textTransform: "none",
                    boxShadow: "none",
                    height: 52,
                    mb: 2,
                    "&:hover": {
                      bgcolor: "#faa2c1",
                    },
                  }}
                  disableElevation
                >
                  Submit Edit
                </Button>
              </form>
            )}
            {error && (
              <Typography color="error" sx={{ mt: 1, fontWeight: 500 }}>
                {error}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            px: { xs: 1, sm: 3, md: 6 },
            pt: { xs: 6, sm: 7, md: 10 },
            minHeight: "100vh",
            bgcolor: "#f8fafc",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#181e34",
              mb: 3,
              mt: 1,
              fontSize: { xs: 30, md: 38 },
            }}
          >
            Diagram Preview
          </Typography>
          <Box
            sx={{
              mt: 1,
              width: { xs: "98%", sm: "90%", md: "84%" },
              maxWidth: 900,
              minHeight: 450,
              background: "#fff",
              borderRadius: 5,
              border: "3px dashed #ffb0d4",
              mx: "auto",
              boxShadow: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              pb: 2,
            }}
          >
            {/* Preview icon or generated image */}
            {images.length === 0 ? (
              <Box sx={{ textAlign: "center", mt: 5 }}>
                <img
                  src="https://img.icons8.com/color/96/000000/combo-chart--v2.png"
                  alt="diagram icon"
                  style={{ width: 64, height: 64, margin: "0 auto 20px auto" }}
                />
                <Typography
                  sx={{
                    color: "#b8c1ec",
                    fontSize: 24,
                    fontWeight: 500,
                    opacity: 0.5,
                  }}
                >
                  Your UML diagram will appear here!
                </Typography>
              </Box>
            ) : (
              <Box sx={{ width: "100%", textAlign: "center", mt: 3 }}>
                <img
                  src={images[0]}
                  alt="PlantUML Diagram"
                  style={{
                    maxWidth: "90%",
                    maxHeight: 370,
                    margin: "0 auto",
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UmlComponent;