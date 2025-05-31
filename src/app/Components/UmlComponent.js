"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CssBaseline,
  Paper,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useTheme } from "@mui/material/styles";

const SIDEBAR_BG = "#e9eef6";
const SIDEBAR_TEXT = "#2e3a59";
const SIDEBAR_WIDTH = 350;
const INPUT_BG = "#f5f8fd";
const BUTTON_BG = "#7da9e8";
const BUTTON_TEXT = "#fff";
const BUTTON_BG_HOVER = "#6698d4";

function UmlComponent() {
  const [message, setMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [initialSubmitted, setInitialSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Handles initial and edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: !initialSubmitted ? message : message,
          editMessage: initialSubmitted ? editMessage : "",
        }),
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
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Download handler
  const handleDownload = async () => {
    if (!images[0]) return;
    try {
      const imageResponse = await fetch(images[0], { mode: 'cors' });
      const imageBlob = await imageResponse.blob();
      const url = window.URL.createObjectURL(imageBlob);
      const link = document.createElement("a");
      link.href = url;
      // Try to infer extension if possible, fallback to png
      const extMatch = images[0].match(/\.(png|jpg|jpeg|svg|gif)(\?|$)/i);
      const ext = extMatch ? extMatch[1] : "png";
      link.download = `uml-diagram.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch {
      alert("Failed to download image.");
    }
  };

  const renderInputForm = () => (
    <form onSubmit={handleSubmit} style={{ width: "100%" }} autoComplete="off">
      {!initialSubmitted ? (
        <>
          <Typography
            sx={{
              color: "#627199",
              fontWeight: 500,
              mb: 1,
              fontSize: 19,
              opacity: 0.92,
            }}
          >
            Scenario
          </Typography>
          <TextField
            variant="outlined"
            size="medium"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your scenario(1 diagram per request)..."
            required
            multiline
            minRows={2}
            maxRows={8}
            InputProps={{
              sx: {
                color: "#384569",
                background: INPUT_BG,
                borderRadius: "11px",
                fontSize: 18,
                fontWeight: 400,
                "&::placeholder": {
                  color: "#bfcce2",
                  opacity: 0.9,
                  fontSize: 16,
                },
                boxShadow: "0 1px 3px #e2e8f0",
              },
            }}
            sx={{
              mb: 3,
              input: { color: "#384569" },
            }}
          />
          <Button
            type="submit"
            fullWidth
            sx={{
              bgcolor: BUTTON_BG,
              color: BUTTON_TEXT,
              fontWeight: 700,
              fontSize: 20,
              borderRadius: "10px",
              textTransform: "none",
              height: 54,
              mb: 2,
              letterSpacing: 0.5,
              boxShadow: "0 2px 8px 0 rgba(125,169,232,0.08)",
              "&:hover": {
                bgcolor: BUTTON_BG_HOVER,
              },
            }}
            disableElevation
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
        </>
      ) : (
        <>
          <Typography
            sx={{
              color: "#627199",
              fontWeight: 500,
              mb: 1,
              fontSize: 19,
              opacity: 0.92,
            }}
          >
            Edit Diagram
          </Typography>
          <TextField
            variant="outlined"
            size="medium"
            fullWidth
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            placeholder="Describe your edit (e.g. add a class, change relation...)"
            multiline
            minRows={2}
            maxRows={8}
            InputProps={{
              sx: {
                color: "#384569",
                background: INPUT_BG,
                borderRadius: "11px",
                fontSize: 17,
                fontWeight: 400,
                "&::placeholder": {
                  color: "#bfcce2",
                  opacity: 0.8,
                  fontSize: 15,
                },
                boxShadow: "0 1px 3px #e2e8f0",
              },
            }}
            sx={{
              mb: 3,
              input: { color: "#384569" },
            }}
          />
          <Button
            type="submit"
            fullWidth
            sx={{
              bgcolor: BUTTON_BG,
              color: BUTTON_TEXT,
              fontWeight: 700,
              fontSize: 20,
              borderRadius: "10px",
              textTransform: "none",
              height: 54,
              mb: 2,
              letterSpacing: 0.5,
              boxShadow: "0 2px 8px 0 rgba(125,169,232,0.08)",
              "&:hover": {
                bgcolor: BUTTON_BG_HOVER,
              },
            }}
            disableElevation
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Edit"}
          </Button>
        </>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 1, fontWeight: 500 }}>
          {error}
        </Typography>
      )}
    </form>
  );

  return (
    <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar for desktop/tablet only */}
        {!isMobile && (
          <Box
            sx={{
              width: SIDEBAR_WIDTH,
              bgcolor: SIDEBAR_BG,
              color: SIDEBAR_TEXT,
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "2px 0 12px 0 rgba(180, 200, 230, 0.13)",
              borderTopRightRadius: 24,
              borderBottomRightRadius: 24,
              py: 6,
              px: 0,
              zIndex: 2,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                width: "87%",
                bgcolor: "transparent",
                boxShadow: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 0,
              }}
            >
              <Typography
                sx={{
                  color: "#4c5c7a",
                  fontWeight: 700,
                  mb: 5,
                  fontSize: 30,
                  letterSpacing: 1,
                  fontFamily: "inherit",
                  opacity: 0.93,
                  textAlign: "center",
                }}
              >
                UML Generator
              </Typography>
              {renderInputForm()}
            </Paper>
          </Box>
        )}

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            px: { xs: 1, sm: 3, md: 6 },
            pt: { xs: 6, sm: 7, md: 10 },
            minHeight: "100vh",
            bgcolor: "#f5f7fb",
            paddingBottom: "3%",
          }}
        >
          {/* On mobile, show input form above preview */}
          {isMobile && (
            <Paper
              elevation={1}
              sx={{
                width: "100%",
                maxWidth: 520,
                mx: "auto",
                mt: 0,
                mb: 4,
                p: 2.5,
                bgcolor: "#f5f7fb",
                boxShadow: "0 1px 4px #e2e8f0",
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#4c5c7a",
                  fontWeight: 700,
                  mb: 3,
                  fontSize: 24,
                  letterSpacing: 1,
                  fontFamily: "inherit",
                  opacity: 0.93,
                  textAlign: "center",
                }}
              >
                UML Generator
              </Typography>
              {renderInputForm()}
            </Paper>
          )}

          <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt: 1, marginTop: '-5%' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#2e3a59",
                fontSize: { xs: 30, md: 38 },
                mr: 2,
              }}
            >
              Diagram Preview
            </Typography>
            {images.length > 0 && (
              <Tooltip title="Download Diagram" arrow>
                <IconButton
                  aria-label="Download Diagram"
                  sx={{
                    bgcolor: "#f0f4fa",
                    color: "#71a5ea",
                    borderRadius: 2,
                    ml: 1,
                    "&:hover": { bgcolor: "#e3eaf6", color: "#3c7dca" },
                  }}
                  onClick={handleDownload}
                >
                  <DownloadIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Box
            sx={{
              mt: 1,
              width: { xs: "98%", sm: "90%", md: "84%" },
              maxWidth: 900,
              minHeight: 450,
              background: "#fff",
              borderRadius: 10,
              border: "3px dashed #b5c8e2",
              mx: "auto",
              boxShadow: "0 2px 24px 0 rgba(125,169,232,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              pb: 2,
            }}
          >
            {images.length === 0 ? (
              <Box sx={{ textAlign: "center", mt: 5 }}>
                <img
                  src="https://img.icons8.com/color/96/000000/combo-chart--v2.png"
                  alt="diagram icon"
                  style={{ width: 64, height: 64, margin: "0 auto 20px auto" }}
                />
                <Typography
                  sx={{
                    color: "#b5c8e2",
                    fontSize: 24,
                    fontWeight: 500,
                    opacity: 0.7,
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