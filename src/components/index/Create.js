import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import bcrypt from 'bcryptjs';


function hashIt(password){
  const salt = bcrypt.genSaltSync(6);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed
}


export default function CreateForm(props) {
  const [ title, setTitle ] = React.useState('')
  const [ owner, setOwner ] = React.useState('')
  const [ password, setPassword ] = React.useState('')
  const [ description, setDescription ] = React.useState('')
  const [ ownerEmail, setOwnerEmail ] = React.useState('')

  const router = useRouter();

  React.useEffect(()=> {
    console.log(hashIt('hello'))
  }, [])

  const create = async () => {

    const data = {
      form: {
        title: title,
        description: description,
        owner: owner,
        ownerEmail: ownerEmail,
        password: hashIt(password),
        questions: [{
          type: "text",
          question: "Put your main question here",
          subText: "Add some sub text",
          description: "Give some background",
          required: true,
        }],
        theme: {
          primary: '#556cd6',
          secondary: '#19857b',
          bgcolor: 'rgba(240, 240, 240, 0.85)'
        }
      }
    }
    try {
      let hostname;
      if (window)
        hostname = window.location.hostname
      if (hostname == 'localhost')
        hostname = 'http://' + hostname + ':3000'
      else
        hostname = 'https://' + hostname
      const rawResponse = await fetch(`${hostname}/api/forms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const form = await rawResponse.json()
      router.push(`${hostname}/edit/form/${form.id}`)
    } catch (error) {
      console.log(error)
    }
  }
  const classes = {

    createInput: {
      minWidth: '30%',
      borderRadius: '10px',

      mx: 1,

      '& input': {
        fontSize: 25,
        borderColor: 'rgba(247, 249, 246, 0)'
      },
      '& div': {
        borderColor: 'rgba(247, 249, 246, 0)'
      }
    },
    createInputFlex: {
      borderRadius: '10px',

      mx: 1,

      '& input': {
        fontSize: 25,
        borderColor: 'rgba(247, 249, 246, 0)'
      },
      '& div': {
        borderColor: 'rgba(247, 249, 246, 0)'
      }
    },
    createInputDescription: {
      minWidth: '61%',
      borderRadius: '10px',

      mx: 1,

      '& input': {
        fontSize: 25,
        borderColor: 'rgba(247, 249, 246, 0)'
      },
      '& div': {
        borderColor: 'rgba(247, 249, 246, 0)'
      }
    }

  }

  return (
    <Box sx={{height: '40vh', width: '100%', mt:5, py:2, px: 12,mb: 0, display: 'flex', flexWrap: 'wrap'}}>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        label="Title"
        sx={classes.createInput}
      ></TextField>
      <TextField
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        variant="outlined"
        label="Owner Name"
        sx={classes.createInput}
      ></TextField>
      <TextField
        value={ownerEmail}
        onChange={(e) => setOwnerEmail(e.target.value)}
        variant="outlined"
        label="Owner Email"
        sx={classes.createInput}
      ></TextField>
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
        label="Form Description"
        sx={classes.createInputDescription}
        multiline
        rows={5}
      ></TextField>
      <Box sx={{width: '30%'}}>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          variant="outlined"
          fullWidth
          label="Create Form Admin Password"
          sx={classes.createInputFlex}
        ></TextField>
        <Button variant="contained" onClick={create} sx={{mx: 1, mt: 5, width: '100%'}}>Make form</Button>
      </Box>
    </Box>
  )
}
