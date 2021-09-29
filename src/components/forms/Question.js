import { useState, useEffect } from 'react';
import { useTheme, makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import useMediaQuery from '@mui/material/useMediaQuery'
import validator from './Validators'

const useStyles = makeStyles((theme) => ({
  root: {
    //height: '95vh',
    minHeight: '95vh',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
    padding: 10
  },
  question: {
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    marginLeft: '-35px'
  },
  icon: {
    fontSize: 25,
    marginRight: 10,
    marginTop: 5
  },
  subHeading: {
    fontStyle: 'italic'
  },
  description: {
    marginTop: 20
  },
  input: {
    height: 40,
    marginTop: 20,
    '& input' : {
      fontSize: 25,
      color: 'rgb(55, 255, 144)'
    },
    '& div' : {
      fontSize: 25,
      backgroundColor: 'black',
      color: 'rgb(55, 255, 144)'
    },
    '& svg' : {
      color: 'rgb(55, 255, 144)'
    },
    '& option' : {
      fontSize: 25,
    }
  },
}));

export default function Form(props) {
  const classes = useStyles();

  const mobile = useMediaQuery('(max-width:500px)')

  const [value, valueChange] = useState(props.responses[props.question.id] || null);
  const validate = (str) => {
    return !(props.question.required && (str === '' || str === null || !validator(str, props.question.type)))
  }
  const handleNext = () => {

    if (validate(value)){
       if (props.question.id < props.limit) {
          props.addResponse(resp => ({ ...resp, [props.question.id]: value}))
          props.updateQuestion(ques => ques + 1);
        }
        else {
          props.addResponse(resp => ({ ...resp, [props.question.id]: value}))
          props.updateQuestion(ques => ques + 1);
        }
    }
    else {
      alert("This field is required");
    }
  }
  const previous = () => {
    props.updateQuestion(ques => ques - 1);
  }
  const next = () => {
    props.updateQuestion(ques => ques + 1);
  }

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handleNext();
      }
      if (event.code === "ArrowDown") {
        previous();
      }
      if (event.code === "ArrowUp") {
        next();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [value]);

  return (
    <Slide in direction={mobile? "left" :"up"} timeout={{ enter: 1000, exit: 900 }} >
    <div className={classes.root} sx={mobile? {} : {height: '95vh'}}>
      <div className={classes.question}>
        <ArrowForwardIcon color="primary" className={classes.icon}/>
        <Typography variant="h4" color="primary" sx={{ fontWeight: 700}}>{props.question.heading}</Typography>
      </div>
      <Typography variant="h5" color="primary" sx={{ opacity: 0.7}} className={classes.subHeading}>{props.question.subHeading}</Typography>
      <Typography variant="body1" component='div' color="primary" sx={{ opacity: 0.6 }} dangerouslySetInnerHTML={{__html: props.question.description}} className={classes.description}>
      </Typography>
      <TextField
        variant="standard"
        type={props.question.type}
        select={props.question.type == 'select'}
        error={!validator(value, props.question.type)}
        required={props.question.required}
        placeholder={props.question.placeholder || "Type Your Answer Here ..."}
        color="primary"
        value={value}
        multiline={props.question.multiline}
        className={classes.input}
        rows={3}
        autoFocus={mobile? false: true}
        onChange={(e) => (valueChange(e.target.value))}
      >
        {props.question.options.map((item, index) => {
          return (
            <MenuItem value={item.value}>{item.name}</MenuItem>
          )
        })}
      </TextField>
      <Navigators
        previous={previous}
        next={next}
        save={save}
        buttonText={props.question.buttonText}
        multiline={props.question.multiline}
      />

    </div>
    </Slide>
  )
}
