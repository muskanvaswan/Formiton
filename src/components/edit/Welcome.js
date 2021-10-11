import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import DownloadIcon from "@mui/icons-material/Download";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useEffect, useState } from "react";


export default function Welcome({ start, data, theme }) {
  const classes = {
    root: {
      height: "95vh",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      width: "100%",
    },
    description: {
      marginTop: "20px",
      opacity: 0.5,
      color: theme.primary || 'primary'
    },
  };

  const handleClick = () => {};

  const handleDownload = () => {};

  const [ title, setTitle ] = React.useState(data.title);
  const [ description, setDescription ] = React.useState(data.description);
  const [ startButton, setTitle ] = React.useState(data.startButton);


  return (
    <Box sx={classes.root}>
      <Typography
        variant="h4"
        color="primary"
        sx={{ color: theme.primary || "primary.main" }}
      >
        {title}
      </Typography>
      <Typography variant="body1" color="primary" sx={classes.description}>
        {description}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Button
          variant="outlined"
          sx={classes.button}
          sx={{ fontWeight: 700, width: 200, mt: 2, mr: 2 }}
          endIcon={<DownloadIcon />}
          onClick={handleDownload}
        >
          Download Brochure
        </Button>
        <Button
          variant="contained"
          component="a"
          sx={{ fontWeight: 700, width: 300, mt: 2, color: theme.primary || "primary.main" }}
          onClick={handleClick}
          endIcon={<KeyboardReturnIcon />}
          disabled={!submitted}
        >
          {startButton}
        </Button>
      </Box>
    </Box>
  );
}
