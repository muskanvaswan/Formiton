import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "95vh",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    textAlign: "center",
  },
  button: {
    //marginTop: 20,
    width: "50%",
    //marginLeft: '50%'
  },
  pageIcon: {
    //padding: 10,
    borderRadius: 3,
    marginRight: 10,
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  pagination: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

const submitResponse = async (data) => {
  const status = await fetch("https://api.csi-bu.tech/forms/apply/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  }).catch((rejected) => {
    alert("Could Not submit your response");
  });
  return status;
};

export default function ThankYouScreen({ responses, updateQuestion, fields }) {
  const classes = useStyles();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (responses) => {
    return Object.keys(responses).length >= fields;
  };

  const handleClick = async () => {
    if (validate(responses)) {
      setLoading(true);
      const status = await submitResponse(JSON.stringify(responses));
      if (status) {
        setSubmitted(true);
        if (typeof window !== undefined)
          window.localStorage.setItem("submitted", "true");
      } else {
        alert("Could Not submit your response");
      }
    } else
      alert(
        "We have not received all the responses, did you make sure to save your answers?"
      );
    setLoading(false);
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handleClick();
      }
      if (event.code === "ArrowLeft") {
        previous();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const previous = () => {
    updateQuestion((ques) => ques - 1);
  };
  return (
    <div className={classes.root}>
      <Typography variant="h4" sx={{ color: "primary.main" }}>
        Please make sure that you have cross checked all your answers as you
        will not be able to edit your response.
      </Typography>
      <div className={classes.buttons}>
        <div className={classes.pagination}>
          <IconButton
            variant="contained"
            onClick={previous}
            className={classes.pageIcon}
            sx={{ backgroundColor: "secondary.main" }}
          >
            <ArrowBackIcon color="inherit" />
          </IconButton>
        </div>
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
          onClick={handleClick}
          disabled={loading}
        >
          Submit
        </Button>
      </div>
      <Snackbar
        open={submitted}
        autoHideDuration={3000}
        onClose={() => router.push("https://csi-bu.tech/")}
      >
        <Alert
          onClose={() => router.push("https://csi-bu.tech/")}
          severity="success"
          sx={{ width: "100%", bgcolor: "rgb(76, 226, 149)" }}
        >
          Your response was successfully recorded! You will be redirected to
          CSI's main page now.
        </Alert>
      </Snackbar>
    </div>
  );
}
