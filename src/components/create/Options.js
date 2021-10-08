import * as React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const OptionInput = ({defaultValue, update, index, toggle}) => {
  const [ value, setValue ] = React.useState(defaultValue);
  const handleClick = () => {
    if (index !== -1) {
      update(list => {
        list[index] = {name: value, value: value}
        return list;
      })
      toggle(-1)
    } else {
      update(list => {
        list.push({value: value, name: value})
        return list;
      })
      toggle(false)
    }
  }
  return (
    <Box sx={{borderRadius: 10, borderColor: 'rgb(200, 200, 200)', borderStyle: 'solid', borderWidth: '1px', pl: 1, display: 'flex', alignItems: 'flex-end'}}>
    <TextField
       variant="standard"
       value={value}
       onChange={(e) => setValue(e.target.value)}
       sx={{
         '& input' : {
           fontSize: 10,
           border: 'none'
         },
         width: 100,
         borderStyle: 'none'
       }}
    />
    <IconButton
      onClick={handleClick}
      variant="outlined"
      sx={{fontSize: 10, p: 1}}
    >
      <DoneIcon size={10}  sx={{fontSize: 15, color: 'green'}}/>
    </IconButton>
    </Box>
  )
}

export default function CustomDeleteIconChips({options, update, index, active}) {
  const [ list, setList ] = React.useState(options);
  const [ add, setAdd ] = React.useState(false);
  const [ edit, setEdit ] = React.useState(-1);

  const handleAdd = () => {
    setAdd(true);
  };


  React.useEffect(() => {
    update(questions => {
      questions[active].options = list;
      return questions;
    })
  }, [list])

  const handleDelete = (key) => {
    setList(list => list.filter((el, index) => index !== key))
  };

  return (
    <Box sx={{px: 1, py: 2}}>
      <Typography variant="caption">Options</Typography>
      <Box sx={{display: 'flex', gap: '3px', flexWrap: 'wrap'}}>
        {list.map((option, idx)  => (edit === idx?
            <OptionInput defaultValue={list[idx].name} index={idx} update={setList} toggle={setEdit}/>
            : <Chip
              key={idx}
              label={option.name}
              onClick={() => setEdit(idx)}
              onDelete={() => handleDelete(idx)}
              variant="outlined"
              sx={{fontSize: 10}}
            />))}
        {!add ? <IconButton
          onClick={handleAdd}
          variant="outlined"
          sx={{fontSize: 10, borderColor: 'rgb(200, 200, 200)', borderStyle: 'solid', borderWidth: '1px'}}
        >
        <AddIcon size={10} sx={{fontSize: 15}}/>
        </IconButton>
          : <OptionInput  update={setList} toggle={setAdd} index={-1}/>
        }
      </Box>
    </Box>
  );
}
