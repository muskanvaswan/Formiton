import React from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function VerifyScreen({ setVerify }) {
  return (
    <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
    <Box sx={{width: '50%'}}>
      <Typography variant="h4">To edit this form, we must confirm that you have the required access</Typography>
      <TextField variant="filled" fullWidth type="password"/>
    </Box>
    </Box>
  )
}
