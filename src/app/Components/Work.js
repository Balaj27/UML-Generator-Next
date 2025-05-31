'use client';

import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';


const Work = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f9f9f9',
        p: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '70vh',
      }}
    >
        <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: 'rgb(66, 61, 174)', // same as your navbar
              textAlign: 'center',
            }}
          >
            Demo of SmartUML
          </Typography>
      <Card sx={{ maxWidth: 800, width: '100%', boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          
          <Box
            component="video"
            src="assets/Demo.mp4"
            controls
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              border: '2px solid #ccc',
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Work;
