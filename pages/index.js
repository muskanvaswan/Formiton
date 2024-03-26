import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Collapse from "@mui/material/Collapse";
import Create from "../src/components/index/Create";
import FormsList from "../src/components/index/FormsList";
import LinearProgress from "@mui/material/LinearProgress";
import { CircularProgress, Drawer } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";

const classes = {
  root: {
    height: "100vh",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "hidden",
  },
};

export default function Index() {
  const [creatOpen, setCreateOpen] = React.useState(false);
  const [findForms, setFindForms] = React.useState(false);
  const [emailSearch, setEmailSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [found, setFound] = React.useState(false);
  const [forms, setForms] = React.useState([]);

  const search = async () => {
    setLoading(true);
    let hostname;
    if (window) hostname = window.location.hostname;
    if (hostname == "localhost") hostname = "http://" + hostname + ":3000";
    else hostname = "https://" + hostname;
    const res = await fetch(`${hostname}/api/form/search/${emailSearch}`);
    const data = await res.json();
    setForms(data);
    setCreateOpen(false);
    setFound(true);
    setLoading(false);
  };

  const redirect = (url) => {
    if (window) {
      window.open(url, "_blank");
    }
  };

  return (
    <Box sx={classes.root}>
      <Box sx={{ width: "100%", pl: 20 }}>
        <Box>
          <Typography variant="h1" sx={{ fontWeight: 900 }}>
            formiton
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 2, width: { lg: "40%", sm: "100%" } }}
          >
            Forget clunky builders! Build stunning, user-friendly forms in
            minutes. Customize colors, text, and structure with a
            slide-deck-like interface. Create forms that are as beautiful and
            organized as your vision.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", mt: 2, mb: 15 }}>
          <Button
            variant="contained"
            onClick={() => {
              setFound(false);
              setCreateOpen((open) => !open);
            }}
            sx={{
              mx: 1,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "0.8em",
            }}
            startIcon={<Add />}
          >
            {" "}
            Create{" "}
          </Button>
          {!findForms ? (
            <Button
              variant="contained"
              sx={{
                mx: 1,
                borderRadius: "10px",
                py: "12px",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "0.8em",
              }}
              onClick={() => setFindForms((open) => !open)}
              startIcon={<Edit />}
            >
              Edit
            </Button>
          ) : (
            <Box
              sx={{
                width: 300,
                display: "flex",
              }}
            >
              <TextField
                variant="outlined"
                sx={{
                  width: "100%",
                  borderRadius: "10px",
                  my: 0,
                  "& input": { fontSize: 12 },
                  animation: "width 1s ease-in-out",
                }}
                placeholder="Enter email associated to form"
                autoFocus
                value={emailSearch}
                onChange={(e) => setEmailSearch(e.target.value)}
                InputProps={{
                  endAdornment: loading ? (
                    <CircularProgress sx={{ p: 2 }} />
                  ) : (
                    <IconButton onClick={search} sx={{ borderRadius: "10px" }}>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Drawer open={creatOpen} position="right" anchor="right">
        <Create />
      </Drawer>
      <Drawer open={found} position="right" anchor="right" sx={{}}>
        <FormsList forms={forms} />
      </Drawer>
    </Box>
  );
}
