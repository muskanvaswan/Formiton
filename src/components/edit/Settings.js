import React from 'react';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close';

const classes = {
  root: {
    position: 'absolute',
    minHeight: '100vh',
    height: '100vh',
    width: '100%',
    zIndex: 90,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  paper: {
    position: 'relative',
    bgcolor: 'background.paper',
    opacity: 1,
    width: {lg: "35%", sm: "100%"},
    height: "100%",
    //left: 100,
    p: 5,
  }
}

export default function Settings({data, update, close}) {
  const [ title, setTitle ] = React.useState(data.title)
  const [ description, setDescription ] = React.useState(data.description)
  const [ startButton, setStartButton ] = React.useState(data.startButton)
  const [ conclusion, setConclusion ] = React.useState(data.conclusion)
  const [ redirect, setRedirect ] = React.useState(data.redirect)

  const save = () => {
    update({
      title: title,
      description: description,
      startText: startText,
      redirect: redirect,
      conclusion: conclusion
    });
    close(false);
  }
  return (
    <Box sx={classes.root}>
      <Box sx={classes.paper}>
        <IconButton
          sx={{position: 'relative', mr: '-19px', bgcolor: 'rgba(166, 164, 167, 0.49)'}}
          onClick={() => close(false)}
        >
          <CloseIcon />
        </IconButton>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Form Title"
          fullWidth
          sx={{mt: 5}}
          variant="filled"
        />
        <TextField
          sx={{my: 1}}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Form Description"
          multiline
          rows={4}
          fullWidth
          variant="filled"
        />
        <TextField
          sx={{my: 1, width: '49%', mr: 1}}
          value={startButton}
          onChange={(e) => setStartButton(e.target.value)}
          label="Test that will appear on the start button"
          variant="filled"
        />
        <TextField
          sx={{my: 1, width: '49%'}}
          value={redirect}
          onChange={(e) => setRedirect(e.target.value)}
          label="URL to go to on form submit"
          variant="filled"
        />

        <TextField
          sx={{my: 1}}
          value={conclusion}
          onChange={(e) => setConclusion(e.target.value)}
          label="Thank you Message"
          variant="filled"
          multiline
          rows={4}
          fullWidth
        />
        <Button onClick={save}>Save Edit</Button>
      </Box>
    </Box>
  )
}
