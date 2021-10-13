import React from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import LockIcon from '@mui/icons-material/Lock';

import bcrypt from 'bcryptjs';
import { useCookies } from 'react-cookie'


function compareIt(password, correct){
  const validPassword = bcrypt.compareSync(password, correct);
  return validPassword
}

export default function VerifyScreen({ setVerify, correct, id }) {
  const [ passcode, setPasscode ] = React.useState('')
  const [ cookie, setCookie ] = useCookies(["validated"])

  React.useEffect(() => {
    const valid = compareIt(passcode, correct)
    if (valid) {
      setCookie("validated", valid, {
         path: `/edit/form/${id}`,
         maxAge: 3600, // Expires after 1hr
         sameSite: true,
      })
    }
    setVerify(valid)
  })

  const verify = () => {
    const valid = compareIt(passcode, correct)
    setCookie("validated", valid, {
       path: `/edit/form/${id}`,
       maxAge: 3600, // Expires after 1hr
       sameSite: true,
    })
    setVerify(valid)
  }

  return (
    <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Box sx={{width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <LockIcon sx={{my: 1, fontSize: 300, color: 'rgba(136, 136, 136, 0.38)'}}/>
        <TextField variant="outlined" fullWidth type="password" onBlur={verify} value={passcode} onChange={(e) => setPasscode(e.target.value)}/>
        <Typography variant="caption" > To edit this form, we must confirm that you have the required access</Typography>
      </Box>
    </Box>
  )
}
