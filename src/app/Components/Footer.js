"use client";
import React from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Box component="footer" sx={{
            py: 2,
            px: 1,
            mt: 'auto',
            textAlign: 'center',
            backgroundColor: "rgb(66, 61, 174)"
        }}>
            <Link href="/" passHref legacyBehavior>
                <Typography
                    variant="h6"
                    component="a"
                    sx={{
                        textDecoration: 'none',
                        color: "white",
                        fontWeight: 'bold',
                        fontFamily: 'inherit',
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    SmartUML
                </Typography>
            </Link>
            <Typography variant="body2" sx={{ mt: 1, color:"white" }}>
                All Rights Reserved Ⓒ SmartUML
            </Typography>
        </Box>
    );
}

export default Footer;