import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'

export default function Buttons({ previous, next, save, buttonText, multiline, theme}) {

  const classes = {
    pageIcon: {
      borderRadius: 3,
      mr: 10,
      bgcolor: theme.primary || 'primary.main',
    },
    buttons: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
    },
    pagenation: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  }
  return (
    <div className={classes.buttons} sx={{ mt: multiline? 90: 20}}>
      <div className={classes.pagenation}>
        <IconButton variant="contained" onClick={previous} className={classes.pageIcon}><ArrowDownwardIcon color="inherit" /></IconButton>
        <IconButton variant="contained" onClick={next} className={classes.pageIcon}><ArrowUpwardIcon color="inherit" /></IconButton>
      </div>
      <Button
        color="secondary"
        variant="contained"
        className={classes.button}
        endIcon={<KeyboardReturnIcon/>}
        onClick={save}
        sx={{ fontWeight: 700, width: '50%'}}
      >
        {buttonText}
      </Button>
    </div>
  )
}
