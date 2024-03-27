import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { Divider } from "@mui/material";

function hashIt(password) {
  const salt = bcrypt.genSaltSync(6);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
}

export default function CreateForm(props) {
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [owner, setOwner] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [ownerEmail, setOwnerEmail] = React.useState("");

  const router = useRouter();

  React.useEffect(() => {
    console.log(hashIt("hello"));
  }, []);

  const create = async () => {
    setLoading(true);
    const data = {
      form: {
        title: title,
        description: description,
        owner: owner,
        ownerEmail: ownerEmail,
        password: hashIt(password),
        questions: [
          {
            type: "text",
            question: "Put your main question here",
            subText: "Add some sub text",
            description: "Give some background",
            required: true,
          },
        ],
        theme: {
          primary: "#556cd6",
          secondary: "#19857b",
          bgcolor: "rgba(240, 240, 240, 0.85)",
        },
      },
    };
    try {
      let hostname;
      if (window) hostname = window.location.hostname;
      if (hostname == "localhost") hostname = "http://" + hostname + ":3000";
      else hostname = "https://" + hostname;
      const rawResponse = await fetch(`${hostname}/api/forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const form = await rawResponse.json();
      router.push(`${hostname}/edit/form/${form.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const classes = {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100vh",
      width: 500,
      gap: 2,
      p: 4,
      backgroundColor: "background.paper",
    },
    createInput: {
      minWidth: "100%",
      borderRadius: "17px",
      my: 1,
      "& input": {
        fontSize: 12,
        borderColor: "rgba(247, 249, 246, 0)",
      },
      "& div": {
        borderColor: "rgba(247, 249, 246, 0)",
      },
    },
  };

  return (
    <Box sx={classes.root}>
      <Box>
        <Typography variant="h4">Create a New Form</Typography>
        <Divider sx={{ width: "100%", my: 2 }} />
      </Box>

      <Box>
        <Typography variant="h6">Form Details</Typography>
        <Typography variant="body2" color="GrayText">
          Details related to the form you want to create. These details can also
          be edited later and will be visible to the user.
        </Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          label="Title"
          sx={classes.createInput}
        ></TextField>
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          label="Form Description"
          sx={classes.createInput}
          multiline
          rows={5}
        ></TextField>
      </Box>
      <Box>
        <Typography variant="h6">Owner Details</Typography>
        <Typography variant="body2" color="GrayText">
          Details related to the owner of the form. The email address can be
          used to search and edit the form later. This information can also be
          that of an organisation.
        </Typography>
        <TextField
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          variant="outlined"
          label="Name"
          sx={classes.createInput}
        ></TextField>
        <TextField
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
          variant="outlined"
          label="Email"
          sx={classes.createInput}
        ></TextField>
      </Box>

      <Box>
        <Typography variant="h6">Password</Typography>
        <Typography variant="body2" color="GrayText">
          Anyone with this password can edit the form, preview the form before
          its published and access its responses. Make sure to keep it safe.
        </Typography>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          variant="outlined"
          fullWidth
          label="Form Password"
          sx={classes.createInput}
        ></TextField>
      </Box>

      <Button
        variant="contained"
        onClick={create}
        disabled={loading}
        sx={{ mx: 1, mt: 5, width: 200, position: "relative" }}
      >
        Create
        {loading && (
          <CircularProgress
            size={24}
            thickness={6}
            sx={{
              position: "absolute",
              top: "20%",
              left: "50%",
            }}
          />
        )}
      </Button>
    </Box>
  );
}
