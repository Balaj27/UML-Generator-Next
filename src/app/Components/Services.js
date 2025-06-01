"use client";
import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';

const umlServices = [
  {
    name: "Sequence Diagram",
    description: "Illustrates how objects interact in a particular sequence of time.",
  },
  {
    name: "Use Case Diagram",
    description: "Represents the functional requirements of a system from a user perspective.",
  },
  {
    name: "Class Diagram",
    description: "Shows the static structure of a system including classes and relationships.",
  },
  {
    name: "Object Diagram",
    description: "Depicts a snapshot of objects in a system at a specific time.",
  },
  {
    name: "Activity Diagram (Beta)",
    description: "Describes workflows and processes using activities and transitions.",
  },
  {
    name: "Component Diagram",
    description: "Visualizes the organization and dependencies of software components.",
  },
  {
    name: "Deployment Diagram",
    description: "Shows the physical deployment of artifacts on nodes.",
  },
  {
    name: "State Diagram",
    description: "Depicts the different states of an object and transitions between those states.",
  },
  {
    name: "Entity Relationship (ER) Diagram",
    description: "Models the logical structure of databases using entities, attributes, and relationships.",
  },
];

function Services() {
  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", px: 2, py: 5 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700, textAlign: "center", mb: 3, color: 'rgb(66, 61, 174)' }}>
        Supported Diagram Types
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center", mb: 4 }}>
        Our platform supports a wide range of diagram types focused on software engineering and system design. Below is a comprehensive list of supported UML and related diagrams with brief explanations to help you understand their usage.
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 3, color: 'rgb(66, 61, 174)' }} >
        UML and Related Diagrams
      </Typography>
      <List>
        {umlServices.map((service) => (
          <ListItem key={service.name} alignItems="flex-start" sx={{ mb: 2 }}>
            <ListItemIcon>
              <DeviceHubIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {service.name}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Services;
