import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import Navbar from '@/app/Components/Navbar';
import '../page.css';
import Footer from '@/app/Components/Footer';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight="bold"
          color="rgb(66, 61, 174)"
        >
          🧠 About Us — smartUML
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to <strong>smartUML</strong>, your AI-powered assistant for effortless UML diagram generation.
        </Typography>

        <Typography variant="body1" paragraph>
          At smartUML, we believe in simplifying software design. Whether you&rsquo;re a developer, student, or systems architect, creating accurate and clear UML diagrams shouldn&rsquo;t be a time-consuming task. That&rsquo;s why we built smartUML — a powerful tool that turns your natural language prompts into fully-formed UML diagrams in seconds.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom color="rgb(66, 61, 174)">
            🚀 Our Mission
          </Typography>
          <Typography variant="body1">
            To eliminate the manual hassle of diagram creation by using AI to transform your ideas into precise, professional UML diagrams — instantly.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom color="rgb(66, 61, 174)">
            ⚙️ What We Do
          </Typography>
          <Typography variant="body1" paragraph>
            smartUML uses advanced AI models to understand your text input and convert it into structured diagrams such as:
          </Typography>
          <ul>
            <li><Typography variant="body1">Sequence Diagram</Typography></li>
            <li><Typography variant="body1">Use Case Diagram</Typography></li>
            <li><Typography variant="body1">Class Diagram</Typography></li>
            <li><Typography variant="body1">Object Diagram</Typography></li>
            <li><Typography variant="body1">Activity Diagram (Beta)</Typography></li>
            <li><Typography variant="body1">Component Diagram</Typography></li>
            <li><Typography variant="body1">Deployment Diagram</Typography></li>
            <li><Typography variant="body1">State Diagram</Typography></li>
            <li><Typography variant="body1">Entity Relationship (ER) Diagram</Typography></li>
          </ul>
          <Typography variant="body1">
            No more dragging and dropping shapes or struggling with diagramming tools. Just describe what you need &mdash; we&rsquo;ll do the rest.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom color="rgb(66, 61, 174)">
            💡 Why smartUML?
          </Typography>
          <ul>
            <li><Typography variant="body1">Save Time: Focus on building software, not drawing boxes.</Typography></li>
            <li><Typography variant="body1">Boost Productivity: Generate diagrams in seconds, not hours.</Typography></li>
            <li><Typography variant="body1">Reduce Errors: Eliminate human mistakes in structure and syntax.</Typography></li>
            <li><Typography variant="body1">AI-Powered: Get smart results tailored to your input.</Typography></li>
          </ul>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom color="rgb(66, 61, 174)">
            👨‍💻 Built for Developers, by Developers
          </Typography>
          <Typography variant="body1">
            We understand the pain of repetitive design tasks because we&rsquo;ve been there. smartUML was born out of a need to speed up software documentation without compromising on quality.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom color="rgb(66, 61, 174)">
            📈 The Future
          </Typography>
          <Typography variant="body1">
            We&rsquo;re continuously improving smartUML to support more diagram types, better prompt understanding, and even direct integration with your development tools.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default AboutUs;
