import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import DownloadIcon from "@mui/icons-material/Download";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useEffect, useState } from "react";

const useStyles = {
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
  },
};

export default function Welcome({ start }) {
  const classes = useStyles;
  const [submitted, setSubmitted] = useState(true);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.localStorage.getItem("submitted") === "true") {
        setSubmitted(false);
        alert("You have already submitted the form once");
      }
    }
  });

  const handleClick = () => {
    start((ques) => ques + 1);
  };

  const handleDownload = () => {
    var a = document.createElement("a");
    a.href = "/brochure.pdf";
    a.setAttribute("download", "CSI Brochure 2021 - 22");
    a.click();
  };
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handleClick();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const thememing = {
    text: {},
  };

  return (
    <Box sx={classes.root}>
      <Typography
        variant="h4"
        color="primary"
        sx={{ color: thememing.text.primary || "primary.main" }}
      >
        The Application to CSI core 2021 - 22.
      </Typography>
      <Typography variant="body1" color="primary" sx={classes.description}>
        A warm welcome to the Batch of 2025. Find below the pamphlet for CSI and
        also a brief description. To give you a one line summary, Computer
        Society of India Bennett University is a Technical Chapter with one aim:
        to add value to the team as well as the student technical community at
        large. There are various departments in the team, and here is your first
        step to joining us!
      </Typography>
      <div sx={{ display: "flex" }}>
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
          sx={classes.button}
          sx={{ fontWeight: 700, width: 300, mt: 2 }}
          onClick={handleClick}
          endIcon={<KeyboardReturnIcon />}
          disabled={!submitted}
        >
          Start Your Application
        </Button>
      </div>
    </Box>
  );
}