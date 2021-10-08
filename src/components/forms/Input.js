
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import validator from './Validators'
import { styled } from '@mui/material/styles';



export default function Input({ question, theme, value, valueChange, validate }) {

  const input = {
      //height: 40,
      //marginTop: 20,
      '& label.Mui-focused': {
        color: theme.primary || 'primary.main',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: theme.primary || 'primary.main',
      },
      '& input' : {
        fontSize: 25,
        color: theme.primary || 'primary.main',
        "& disabled": {
          color: theme.primary || 'primary.main'
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: theme.primary || 'primary.main',
        },
      },
      color: theme.primary || 'primary.main',
      '& div' : {
        fontSize: 25,
        backgroundColor: theme.bgcolor || 'background.default',
        color: theme.primary || 'primary.main'
      },
      '& svg' : {
        color: theme.primary || 'primary.main'
      },
      '& option' : {
        fontSize: 25,
      },
      borderColor: theme.primary || 'primary.main'

    }

  const disabledInput = {
    color: theme.primary || 'primary.main'
  }

  return (
    <TextField
      variant="standard"
      type={question.type}
      select={question.type == 'select'}
      error={!validator(value, question.type)}
      required={question.required}
      placeholder={question.placeholder || "Type Your Answer Here ..."}
      color="primary"
      sx={input}
      value={value}
      multiline={question.multiline}
      rows={3}
      onChange={(e) => (valueChange(e.target.value))}
    >
      {question.options.map((item, index) => {
        return (
          <MenuItem value={item.value}>{item.name}</MenuItem>
        )
      })}
    </TextField>
  )
}
