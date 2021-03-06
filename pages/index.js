import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Collapse from '@mui/material/Collapse';
import Create from '../src/components/index/Create'
import FormsList from '../src/components/index/FormsList'
import LinearProgress from '@mui/material/LinearProgress';

const classes = {
  superRoot: {
    backgroundImage: 'url("f-2.png")',
    backgroundSize: '5% 5%',
  },
  root: {
    height: '100vh',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'hidden',
    //backgroundImage: 'url("f-2.png")',
    //backgroundSize: '5% 5%',
    backgroundColor: 'rgba(238, 238, 238, 0.83)'
  },

}

export default function Index() {
  const [ creatOpen, setCreateOpen ] = React.useState(false)
  const [ findForms, setFindForms  ] = React.useState(false)
  const [ emailSearch, setEmailSearch  ] = React.useState('')
  const [ loading, setLoading ] = React.useState(false)
  const [ found, setFound ] = React.useState(false)
  const [ forms, setForms ] = React.useState([])

  const search = async () => {
    setLoading(true)
    let hostname;
    if (window)
      hostname = window.location.hostname
    if (hostname == 'localhost')
      hostname = 'http://' + hostname + ':3000'
    else
      hostname = 'https://' + hostname
    const res = await fetch(`${hostname}/api/form/search/${emailSearch}`);
    const data = await res.json()
    setForms(data)
    setCreateOpen(false)
    setFound(true)
    setLoading(false)
  }

  const redirect = (url) => {
    if (window) {
      window.open(url, '_blank')
    }
  }


  return (
    <Box sx={classes.superRoot}>
      <Box sx={classes.root}>
        <Typography variant="h1" sx={{textAlign: 'center', mt: 20}}>Formiton</Typography>
        <Container sx={{display: 'flex', justifyContent: "center", mt: 2, mb: 15}} >
          <Button variant="contained" color="inherit" onClick={() => {setFound(false); setCreateOpen(open => !open)}}sx={{mx: 1, width: '30%'}} > Create A Form </Button>
          { !findForms? <Button variant="contained" color="inherit" sx={{mx: 1, width: '30%'}} onClick={() => setFindForms(open => !open)}> Edit an Existing form </Button>:
            <Box sx={{mx: 1, width: '30%', px: 1, pt: 1, borderRadius: '10px', bgcolor: 'rgba(198, 198, 198, 0.22)', position: 'relative'}}>
              <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', mb: 1}}>
                <TextField
                  variant="standard"
                  sx={{width: '80%', p:1, bgcolor: 'white', borderRadius: '10px', '& input': {fontSize: 12}}}
                  value={emailSearch}
                  onChange={(e) => setEmailSearch(e.target.value)}
                />
                <IconButton onClick={search}><SearchIcon /></IconButton>
              </Box>
              {loading && <LinearProgress/>}
            </Box>
          }
        </Container>
        <Collapse in={creatOpen} sx={{width: '100%', height: creatOpen? '40vh': '0vh', bgcolor: 'rgba(226, 225, 225, 1)'}}>
          <Create />
        </Collapse>
        <Collapse in={found} sx={{width: '100%', minHeight: '40vh', bgcolor: 'rgba(226, 225, 225, 1)', }}>
          <FormsList forms={forms} />
        </Collapse>
      </Box>
    </Box>
  );
}
