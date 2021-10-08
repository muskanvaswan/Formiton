import * as React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function CustomDeleteIconChips() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Box sx={{px: 1, py: 2}}>
      <Typography variant="caption">Options</Typography>
      <Box sx={{display: 'flex', gap: '3px', flexWrap: 'wrap'}}>
        <Chip
          label="Custom delete icon"
          onClick={handleClick}
          onDelete={handleDelete}
          deleteIcon={<DeleteIcon size="small" sx={{fontSize: 10}}/>}
          variant="outlined"
          sx={{fontSize: 10}}
        />
        <Chip
          label="Custom"
          onClick={handleClick}
          onDelete={handleDelete}
          deleteIcon={<DeleteIcon size={10}/>}
          variant="outlined"
          sx={{fontSize: 10}}
        />
        <Chip
          label="Custom"
          onClick={handleClick}
          onDelete={handleDelete}
          deleteIcon={<DeleteIcon size={10}/>}
          variant="outlined"
          sx={{fontSize: 10}}
        />
        <IconButton
          onClick={handleClick}
          variant="outlined"
          sx={{fontSize: 10, borderColor: 'rgb(200, 200, 200)', borderStyle: 'solid', borderWidth: '1px'}}
        >
        <AddIcon size={10} sx={{fontSize: 15}}/>
        </IconButton>
      </Box>
    </Box>
  );
}
