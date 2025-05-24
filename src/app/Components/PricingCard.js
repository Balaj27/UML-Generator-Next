import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  List,
  ListItem,
  Box
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

function PricingCard({ title, price, features, buttonText }) {
  return (
    <Card
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        width: 320,
        m: 2,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        textAlign: "center",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        bgcolor: "#fff",
        p: "2%",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgb(66, 61, 174)",
          color: "white",
          py: 3,
          px: 2.5,
          borderBottom: "1px solid #ddd",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ m: 0 }}>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 300, mt: 0.5, fontSize: "1.2rem" }}
        >
          {price}
        </Typography>
      </Box>
      <CardContent sx={{ py: 2.5, px: 4 }}>
        <List sx={{ p: 0 }}>
          {features.map((feature, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "1rem",
                color: "#555",
                position: "relative",
                pl: 0,
                mb: 1.5,
              }}
              disableGutters
            >
              <CheckIcon
                sx={{
                  color: "rgb(66, 61, 174)",
                  fontWeight: "bold",
                  fontSize: 20,
                  mr: 1.5,
                }}
              />
              <span>{feature}</span>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "center",
          backgroundColor: "#f7f7f7",
          py: 2.5,
          px: 0,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgb(66, 61, 174)",
            color: "white",
            borderRadius: "25px",
            px: 3,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "rgb(56, 51, 164)",
              boxShadow: "none",
            },
          }}
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}

export default PricingCard;