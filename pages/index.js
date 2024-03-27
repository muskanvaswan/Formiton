import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Create from "../src/components/index/Create";
import FormsList from "../src/components/index/FormsList";
import { CircularProgress, Drawer } from "@mui/material";
import { Add } from "@mui/icons-material";
import Image from "next/image";

const classes = {
  root: {
    height: "100vh",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "hidden",
    backgroundImage: "url('/backdrop.svg')",
    backgroundSize: "cover",
  },
};

export default function Index() {
  const [creatOpen, setCreateOpen] = React.useState(false);
  const [emailSearch, setEmailSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
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
    setSearchOpen(true);
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
          <Image src="/full-logo.svg" width={900} height={200} />
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
          <Box
            sx={{
              width: 300,
              display: "flex",
            }}
          >
            <TextField
              variant="outlined"
              color="secondary"
              sx={{
                width: "100%",
                borderRadius: "10px",
                my: 0,
                "& input": { fontSize: 12 },
                animation: "width 1s ease-in-out",
              }}
              placeholder="Enter email associated to existing form"
              autoFocus
              value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
              InputProps={{
                endAdornment: loading ? (
                  <CircularProgress sx={{ p: 1 }} />
                ) : (
                  <IconButton onClick={search} sx={{ borderRadius: "10px" }}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
          <Typography variant="h4" sx={{ ml: 2, mr: 1, my: "auto" }}> / </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setSearchOpen(false);
              setCreateOpen((open) => !open);
            }}
            sx={{
              mx: 1,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "0.8em",
            }}
            endIcon={<Add />}
          >
            Create New
          </Button>
        </Box>
      </Box>
      <Drawer
        open={creatOpen}
        position="right"
        anchor="right"
        sx={{ width: "40%" }}
        onBackdropClick={() => setCreateOpen(false)}
      >
        <Create />
      </Drawer>
      <Drawer
        open={searchOpen}
        position="right"
        anchor="right"
        sx={{ width: 700 }}
        onBackdropClick={() => setSearchOpen(false)}
      >
        <FormsList forms={forms} />
      </Drawer>
    </Box>
  );
}
