import * as React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function CustomDeleteIconChips({options, update}) {
  const [ list, setList ] = React.useState(options);


  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  React.useEffect(() => {
    update(list)
  }, [list])
  
  const handleDelete = (key) => {
    setList(list => list.filter((el, index) => index !== key))
  };

  return (
    <Box sx={{px: 1, py: 2}}>
      <Typography variant="caption">Options</Typography>
      <Box sx={{display: 'flex', gap: '3px', flexWrap: 'wrap'}}>
        {list.map((option, idx)  => (
          <Chip
            key={idx}
            label={option.name}
            onClick={handleClick}
            onDelete={() => handleDelete(idx)}
            variant="outlined"
            sx={{fontSize: 10}}
          />
        ))}
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
