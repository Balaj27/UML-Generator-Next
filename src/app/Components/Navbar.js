'use client';

import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import { useState } from "react";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Generate", href: "/Pages/UML" },
    { label: "Pricing", href: "/Pages/Pricing" },
    { label: "Login", href: "/Pages/Login" },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'rgb(66, 61, 174)' }}>
        <Toolbar>
          <Typography variant="h6" component={Link} href="/" sx={{ color: "white", textDecoration: "none", flexGrow: 1, fontWeight: 600 }}>
            UML Generator
          </Typography>
          {/* Desktop Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, ml: "auto" }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontWeight: 500
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: "auto" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 220 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton component={Link} href={link.href}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;