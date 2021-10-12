import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Collapse from '@mui/material/Collapse';
import Create from '../src/components/index/Create'

import { useRouter } from "next/router";

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
  const [ creatOpen, setCreateOpen ] = React.useState(false)
  const [ findForms, setFindForms  ] = React.useState(false)
  const [ emailSearch, setEmailSearch  ] = React.useState('')
  const [ found, setFound ] = React.useState(false)
  const [ forms, setForms ] = React.useState([])

  const search = async () => {
    const res = await fetch(`http://localhost:3000/api/form/search/${emailSearch}`);
    const data = await res.json()
    setForms(data)
    setFound(true)
  }

  const redirect = (url) => {
    if (window) {
      window.open(url, '_blank')
    }
  }

  const router = useRouter();

  return (
    <Box sx={classes.root}>
      <Typography variant="h1" sx={{textAlign: 'center', mt: 20}}>Formiton</Typography>
      <Container sx={{display: 'flex', justifyContent: "center", mt: 2, mb: 15}} >
        <Button variant="contained" color="inherit" onClick={() => {setFound(false); setCreateOpen(open => !open)}}sx={{mx: 1, width: '30%'}} > Create A Form </Button>
        { !findForms? <Button variant="contained" color="inherit" sx={{mx: 1, width: '30%'}} onClick={() => setFindForms(open => !open)}> Edit an Existing form </Button>:
          <Box sx={{mx: 1, width: '30%', display: 'flex', p: 1, borderRadius: '10px', bgcolor: 'rgba(198, 198, 198, 0.22)', justifyContent: 'space-between'}}>
            <TextField
              variant="standard"
              sx={{width: '80%', p:1, bgcolor: 'white', borderRadius: '10px', '& input': {fontSize: 12}}}
              value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
            />
            <IconButton onClick={search}><SearchIcon /></IconButton>
          </Box>
        }
      </Container>
      <Collapse in={creatOpen} sx={{width: '100%', height: '40vh', bgcolor: 'rgba(198, 198, 198, 0.22)'}}>
        <Create />
      </Collapse>
      <Collapse in={found} sx={{width: '100%', minHeight: '40vh', bgcolor: 'rgba(198, 198, 198, 0.22)', }}>
        <Box sx={{height: '40vh', width: '100%', mt:5, py:2, px: 12,mb: 0, display: 'flex', overflowX: 'scroll'}}>
          {forms.map((form, idx) => (
            <Card sx={{ minWidth: 200, m: 2, height: '80%', borderRadius: '10px', position: 'relative'}} key={idx}>
              <Box sx={{bgcolor: form.theme.bgcolor, height: 100, width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Box sx={{ bgcolor: form.theme.primary, height: '100%', width: 30, borderRadius: '2px', m: 1}} />
                <Box sx={{ bgcolor: form.theme.secondary, height: '100%', width: 30, borderRadius: '2px', m: 1}} />
              </Box>
              <CardContent>
                <Typography variant="h4" color="text.secondary" gutterBottom>
                  {form.title}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton size="small" onClick={() => redirect(`/edit/form/${form.id}`)}><EditIcon sx={{fontSize: 20}}/></IconButton>
                <IconButton size="small" onClick={() => redirect(`/forms/preview/${form.id}`)}><VisibilityIcon sx={{fontSize: 20}}/></IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
