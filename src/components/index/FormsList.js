import * as React from 'react';

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

export default function FormList({ forms }) {
  const redirect = (url) => {
    if (window) {
      window.open(url, '_blank')
    }
  }

  return (
    <Box>
      {forms.map((form, idx) => (
        <Card sx={{ minWidth: 200, m: 2, height: '100%', borderRadius: '10px', position: 'relative'}} key={idx}>
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
  )
}
