
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import validator from './Validators'

export default function Input({ question, theme, value, valueChange, validate }) {

  const input = {
      height: 40,
      marginTop: 20,
      '& input' : {
        fontSize: 25,
        color: theme.primary || 'primary.main'
      },
      '& div' : {
        fontSize: 25,
        backgroundColor: 'black',
        color: theme.primary || 'primary.main'
      },
      '& svg' : {
        color: theme.primary || 'primary.main'
      },
      '& option' : {
        fontSize: 25,
      }
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