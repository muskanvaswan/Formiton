import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

export default function Buttons({ previous, next, save, buttonText, multiline, theme}) {

  const classes = {
    root: {
      mt: 2,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    pageIcon: {
      borderRadius: '3px',
      mr: 1,
      bgcolor: theme.secondary || 'secondary.main',
      color: theme.text || 'text.primary'
    },

    pagenation: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: 'auto'
    }
  }
  return (
      <Box sx={classes.root}>
        <Box sx={classes.pagenation}>
          <IconButton variant="contained" onClick={previous} sx={classes.pageIcon}><ArrowDownwardIcon color="inherit" /></IconButton>
          <IconButton variant="contained" onClick={next} sx={classes.pageIcon}><ArrowUpwardIcon color="inherit" /></IconButton>
        </Box>
        <Button
          color="inherit"
          variant="contained"
          endIcon={<KeyboardReturnIcon/>}
          onClick={save}
          sx={{ fontWeight: 700, width: '50%', bgcolor: theme.secondary || 'secondary.main', color: theme.text || 'text.primary'}}
        >
          {buttonText}
        </Button>
      </Box>
  )
}
