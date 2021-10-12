import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Create from '../src/components/index/Create'

const classes = {
  root: {
    height: '100vh',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'hidden'
  },

}

export default function Index() {
  const [ creatOpen, setCreateOpen ] = React.useState(true)



  return (
    <Box sx={classes.root}>
      <Typography variant="h1" sx={{textAlign: 'center', mt: 20}}>Formiton</Typography>
      <Container sx={{display: 'flex', justifyContent: "center", mt: 2, mb: 15}} >
        <Button variant="contained" color="inherit" onClick={() => setCreateOpen(open => !open)}sx={{mx: 1, width: '30%'}} > Create A Form </Button>
        <Button variant="contained" color="inherit" sx={{mx: 1, width: '30%'}} > Edit an Existing form </Button>
      </Container>
      <Collapse in={creatOpen} size={40} sx={{width: '100%', height: '40vh', bgcolor: 'rgba(198, 198, 198, 0.22)'}}>
        <Create />
      </Collapse>
    </Box>
  );
}
