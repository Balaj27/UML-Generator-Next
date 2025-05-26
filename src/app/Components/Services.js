"use client";
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, Collapse, List, ListItem, ListItemIcon, ListItemText, Grid, Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';

const umlServices = [
  "Sequence Diagram",
  "Use Case Diagram",
  "Class Diagram",
  "Object Diagram",
  "Activity Diagram (Beta)",
  "Component Diagram",
  "Deployment Diagram",
  "State Diagram"
];

const nonUmlServices = [
  "JSON & YAML Data Visualization",
  "EBNF Diagram",
  "Regex Diagram",
  "Network Diagram (nwdiag)",
  "Archimate Diagram",
  "Specification and Description Language (SDL)",
  "Ditaa Diagram",
  "Gantt Diagram",
  "Chronology Diagram",
  "MindMap Diagram",
  "WBS Diagram",
  "Mathematics with AsciiMath or JLaTeXMath",
  "Information Engineering (IE) Diagram",
  "Entity Relationship (ER) Diagram"
];

function Services() {
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (card) => {
    setActiveCard(activeCard === card ? null : card);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", py: 6, px: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}>
        Our Services
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: "center", mb: 5 }}>
        Explore the variety of diagrams we support:
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* UML Services Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 4,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&.MuiCard-root:hover": {
                transform: "translateY(-8px)",
                boxShadow: 8,
              },
              textAlign: "center"
            }}
            raised={activeCard === 'uml'}
          >
            <CardContent sx={{ pb: 1 }}>
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/5485/5485712.png"
                alt="UML Diagrams"
                sx={{ width: 70, height: 70, mx: "auto", mb: 2, bgcolor: 'white' }}
              >
                <ListAltIcon sx={{ fontSize: 50 }} />
              </Avatar>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                UML Diagrams
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Create well-structured UML diagrams for your projects.
              </Typography>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  endIcon={activeCard === 'uml' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  variant="outlined"
                  onClick={() => toggleCard('uml')}
                  sx={{ borderRadius: 2, fontWeight: 500 }}
                  color="primary"
                >
                  {activeCard === 'uml' ? "Hide Services" : "Show Services"}
                </Button>
              </CardActions>
              <Collapse in={activeCard === 'uml'} timeout="auto" unmountOnExit>
                <List dense>
                  {umlServices.map((service) => (
                    <ListItem key={service} sx={{ justifyContent: "center" }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <DeviceHubIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={service} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
        {/* Non-UML Services Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 4,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&.MuiCard-root:hover": {
                transform: "translateY(-8px)",
                boxShadow: 8,
              },
              textAlign: "center"
            }}
            raised={activeCard === 'non-uml'}
          >
            <CardContent sx={{ pb: 1 }}>
              <Avatar
                src="https://static.vecteezy.com/system/resources/previews/020/814/240/non_2x/database-icon-for-your-website-design-logo-app-ui-free-vector.jpg"
                alt="Non-UML Diagrams"
                sx={{ width: 70, height: 70, mx: "auto", mb: 2, bgcolor: 'white' }}
              >
                <DeviceHubIcon sx={{ fontSize: 50 }} />
              </Avatar>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                Non-UML Diagrams
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Explore a variety of other diagram types beyond UML.
              </Typography>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  endIcon={activeCard === 'non-uml' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  variant="outlined"
                  onClick={() => toggleCard('non-uml')}
                  sx={{ borderRadius: 2, fontWeight: 500 }}
                  color="primary"
                >
                  {activeCard === 'non-uml' ? "Hide Services" : "Show Services"}
                </Button>
              </CardActions>
              <Collapse in={activeCard === 'non-uml'} timeout="auto" unmountOnExit>
                <List dense>
                  {nonUmlServices.map((service) => (
                    <ListItem key={service} sx={{ justifyContent: "center" }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <DeviceHubIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={service} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Services;