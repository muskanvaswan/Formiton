import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import IconButton from '@mui/material/IconButton'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import SettingsIcon from '@mui/icons-material/Settings';
import Input from '../../../src/components/forms/Input'
import Navigators from '../../../src/components/forms/Navigators'

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import ColorPicker from '../../../src/components/edit/ColorPicker'
import OptionsEdit from '../../../src/components/edit/Options'
import Settings from '../../../src/components/edit/Settings'
import Verify from '../../../src/components/edit/Verify'

import parseCookies from "../../../src/helpers/cookies"

import { useTheme } from '@mui/material/styles'

import getQuestions from '../../../sample-questions'

export const getServerSideProps = async (props) => {
  const { id } = props.query;

  const validated = parseCookies(props.req)
  console.log(validated)

  const res = await fetch(`http://localhost:3000/api/form/${id}`);
  const form = await res.json()
  // TODO: Handle bug when form doesnt exist
  if (!form) {
    return {
      notFound: true,
    }
  }
  return {props: {form: JSON.stringify(form), validated: validated.validated === 'true'}}
}


export default function Form(props) {

  const form = JSON.parse(props.form)
  const theme = useTheme();
  const [ verified, setVerify ] = React.useState(props.validated);
  const [ questions, setQuestions ] = React.useState(form.questions);
  const [ activeQuestion, setActiveQuestion ] = React.useState(0);
  const [ focused, setFocused ] = React.useState('false');

  const [ inp, setInp ] = React.useState();
  const [ deleted, setDeleted ] = React.useState([]);
  const [ question, setQuestion ] = React.useState(questions[activeQuestion].question);
  const [ subText, setSubText ] = React.useState(questions[activeQuestion].subText);
  const [ description, setDescription ] = React.useState(questions[activeQuestion].description);
  const [ placeholder, setPlaceholder ] = React.useState(questions[activeQuestion].placeholder);
  const [ buttonText, setButtonText ] = React.useState(questions[activeQuestion].buttonText);
  const [ required, setRequired ] = React.useState(questions[activeQuestion].required);
  const [ type, setType ] = React.useState(questions[activeQuestion].type || "text");

  const [ bgcolor, setBgcolor ] = React.useState(form.theme.bgcolor || theme.palette.background.default)
  const [ primary, setPrimary ] = React.useState(form.theme.primary || theme.palette.primary.main)
  const [ secondary, setSecondary ] = React.useState(form.theme.secondary || theme.palette.secondary.main)

  const [ openSettings, setOpenSettings ] = React.useState(false)
  const [ settings, setSettings ] = React.useState({title: form.title, description: form.description, startText: form.startText, redirect: form.redirect, conclusion: form.conclusion})


  const copyStyle = (obj) => {
    return {
      position: 'relative',
      mt: -1,
      borderWidth: 0,
      '& input, textarea' : {
        fontSize: obj.fontSize,
        color: obj.color,
        fontWeight: obj.fontWeight,
      },
      '& div' : {
        bgcolor: bgcolor || 'background.default',
      },
    }
  }

  const classes = {
    root: {
      minHeight: '100vh',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      p: 5,
      pb: 0,
      pr: {lg: 0, md: 0, sm: 5, xs: 5},
      position: 'relative',
      zIndex: 0
    },
    preview: {
      height: '100%',
      p: 0
    },
    question: {
      mt: 0,
      height: '80%',
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      //alignItems: 'center',
      bgcolor: bgcolor || 'background.paper',
      borderRadius: '20px',
      p: 10,
      borderColor: primary || 'primary.main',
      borderWidth: 2,
      borderStyle: 'solid',
      overflowY: 'scroll'
    },
    questions: {
      height: '20%',
      //width: '100%',
      position: 'relative',
      ml: 0,
      mt: 1,
      display: 'flex',
      //flexWrap: 'nowrap',
      overflowX: 'scroll',


    },
    questionPreview: {
      minWidth: '200px',
      height: '80%',
      bgcolor: 'rgb(210, 207, 212)'|| 'background.paper',
      borderRadius: '20px',
      mr: 2,
      mt: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        bgcolor: 'rgba(164, 164, 164, 0.67)'
      }
    },
    activeQuestionPreview: {
      minWidth: '200px',
      height: '80%',
      bgcolor: bgcolor || 'background.default',
      opacity: 0.8,
      borderRadius: '20px',
      mr: 2,
      mt: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: primary || 'primary.main',
      borderWidth: 2,
      borderStyle: 'solid',
      position: 'relative'
    },
    design: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      //justifyContent: 'center',
      //alignItems: 'center',
      overflowY: 'scroll',
      pr: 5,
    },
    q: {
      display: 'flex',
      alignItems: 'flex-start',
      position: 'relative',
      marginLeft: '-35px'
    },
    icon: {
      fontSize: 25,
      marginRight: 1,
      marginTop: '5px',
      color: primary || 'primary.main'
    },
    subText: {
      opacity: 0.7,
      fontStyle: 'italic',
      color: primary || 'primary.main'
    },
    description: {
      marginTop: 20,
      opacity: 0.6,
      color: primary || 'primary.main'
    },
  };

  React.useEffect(() => {
    setQuestion(questions[activeQuestion].question);
    setSubText(questions[activeQuestion].subText);
    setDescription(questions[activeQuestion].description);
    setPlaceholder(questions[activeQuestion].placeholder);
    setButtonText(questions[activeQuestion].buttonText || "Save");
    setRequired(questions[activeQuestion].required);
    setType(questions[activeQuestion].type);
  }, [activeQuestion]);

  const updateQuestion = (val) => {
    setQuestions(questions => {
      questions[activeQuestion][focused] = val;
      return questions;
    })
    setFocused('false');
  }

  const updateOptions = (options) => {
    setQuestions(questions => {
      questions[activeQuestion].options = options;
      return questions;
    })
    console.log("updated")
  }

  const handleCheck = (e) => {
    setRequired(e.target.checked);
    setQuestions(questions => {
      questions[activeQuestion].required = e.target.checked;
      return questions;
    })
  }

  const deleteQuestion = () => {
    if (questions[activeQuestion].id) {
      setDeleted(dele => [...dele, {id: questions[activeQuestion].id}])
    }

    setQuestions(list => list.filter((el, index) => index !== (activeQuestion)))
    setActiveQuestion(active => (active > 0? active - 1: active))
  }

  const addQuestion = () => {
    const defaultQuestion = {
      id: -1,
      type: "text",
      question: "Put your main question here",
      subText: "Add some sub text",
      description: "Give some background",
      required: true,
      options: [],
    }
    setQuestions(questions => [...questions, defaultQuestion])
    setActiveQuestion(questions.length)
  }

  const save = async () => {
    const data = {
      form: {
        deleted: deleted,
        questions: questions,
        theme: {
          primary: primary,
          secondary: secondary,
          bgcolor: bgcolor
        },
        title: settings.title,
        description: settings.description,
        startText: settings.startText,
        redirect: settings.redirect,
        conclusion: settings.conclusion
      }
    }
    try {
      const rawResponse = await fetch(`http://localhost:3000/api/form/${form.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      console.log(rawResponse)
    } catch (error) {
      console.log(error)
    }
  }
  const publish = async () => {
    try {
      const rawResponse = await fetch(`http://localhost:3000/api/form/publish/${form.id}`, {
        method: 'UPDATE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(rawResponse)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    {verified?
      <>
        {openSettings && <Settings update={setSettings} data={settings} close={setOpenSettings}/>}
        <Grid container spacing={2} sx={classes.root}>
          <Grid item lg={10} md={10} sm={12} xs={12} sx={classes.preview}>
            <Box sx={{height: '100%', width: '100%', p:0}}>
              <Box sx={classes.question}>
                <Box sx={classes.q}>
                  <ArrowForwardIcon color="primary" sx={classes.icon}/>
                  {focused === 'question' ?
                    <TextField variant="standard" sx={copyStyle({ fontWeight: 700, fontSize: 36, color: primary || 'primary.main'})} autoFocus={true} value={question} onChange={(e) => setQuestion(e.target.value)} onBlur={() => updateQuestion(question)} />
                    :<Typography variant="h4" color="primary" sx={{ fontWeight: 700, color: primary || 'primary.main'}} onClick={() => setFocused('question')}>{questions[activeQuestion].question}</Typography>
                  }
                </Box>
                {focused === 'subText' ?

                  <TextField variant="standard" sx={copyStyle({ fontSize: 25, color: primary || 'primary.main'})} autoFocus={true} value={subText} onChange={(e) => setSubText(e.target.value)} onBlur={() => updateQuestion(subText)} />
                  :<Typography variant="h5" onClick={() => setFocused('subText')} sx={classes.subText}>{questions[activeQuestion].subText || "Put Sub Heading here..."}</Typography>
                }
                {focused === 'description' ?
                  <TextField variant="standard" sx={copyStyle({ fontSize: 14, color: primary || 'primary.main'})} autoFocus={true} value={description} onChange={(e) => setDescription(e.target.value)} onBlur={() => updateQuestion(description)} multiline={true}/>
                  :<Typography variant="body1" component='div' color="primary" sx={{ opacity: 0.6 , color: primary || 'primary.main'}} onClick={() => setFocused('description')} dangerouslySetInnerHTML={{__html: questions[activeQuestion].description}} className={classes.description} />
                }

                <Input
                  question={questions[activeQuestion]}
                  theme={{bgcolor: bgcolor, primary: primary, secondary: secondary}}
                  value={undefined}
                  multiline={questions[activeQuestion].multiline}
                  valueChange={setInp}
                  validate={() => true}
                />
                <Navigators
                  previous={() => {}}
                  next={() => {}}
                  save={() => {}}
                  buttonText={questions[activeQuestion].buttonText}
                  multiline={questions[activeQuestion].multiline}
                  theme={{primary: primary, secondary: secondary, bgcolor: bgcolor}}
                />
              </Box>
              <Box sx={classes.questions}>
                {questions.map((question, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setActiveQuestion(idx)}
                    sx={idx == activeQuestion? classes.activeQuestionPreview: classes.questionPreview}>
                    {idx === activeQuestion && <IconButton sx={{position: 'absolute', p: '2.5px', right: 10, top: 10, bgcolor: 'rgba(145, 145, 145, 0.34)'}} onClick={deleteQuestion}><CloseIcon sx={{color: 'white', fontSize: 15}}/></IconButton>}
                    <Typography
                      sx={idx == activeQuestion? {color: primary || 'primary.main', width: '75%', textAlign:'center'}: {color: 'white',  width: '75%', textAlign:'center'}}
                      variant="body1">{idx + 1} - {questions[idx].question}</Typography>
                  </Box>
                ))}
                <Box
                  onClick={addQuestion}
                  sx={classes.questionPreview}>
                  <Typography sx={{color: 'white'}} variant="h3"><AddIcon /></Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={2} md={2} sm={12} xs={12} sx={classes.design}>

            <Box sx={{px: 1, display: 'flex', alignItems: 'center'}}>
              <ColorPicker value={bgcolor} setValue={setBgcolor} />
              <Typography variant="caption" sx={{mx: 1}}>Background</Typography>
              {/*<TextField variant="standard" value={bgcolor} onChange={(e) => setBgcolor(e.target.value)}/>*/}
            </Box>

            <Box sx={{px: 1, display: 'flex', alignItems: 'center'}}>
              <ColorPicker value={primary} setValue={setPrimary} />
              <Typography variant="caption" sx={{mx: 1}}>Primary</Typography>
              {/*<TextField variant="standard" value={primary} onChange={(e) => setPrimary(e.target.value)}/>*/}
            </Box>

            <Box sx={{px: 1, display: 'flex', alignItems: 'center'}}>
              <ColorPicker value={secondary} setValue={setSecondary} />
              <Typography variant="caption" sx={{mx: 1}}>Secondary</Typography>
              {/*<TextField variant="standard" value={secondary} onChange={(e) => setSecondary(e.target.value)}/>*/}
            </Box>

            <Box sx={{px: 0, py: 1, display: 'flex', alignItems: 'center'}}>
              <Button variant="text" color="inherit" onClick={() => setOpenSettings(sett => !sett)} fullWidth endIcon={<SettingsIcon />}>More Settings</Button>
            </Box>
            <Box sx={{px: 1, py: 2, mt: 5}}>
              <Typography variant="caption" color={focused == 'type'? "primary": ""}>Type</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                type="select"
                variant="standard"
                sx={{width: '100%', '& svg' : {
                  color: theme.primary || 'primary.main'
                },}}
                label="Type"
                onChange={(e) => setType(e.target.value)}
                onFocus={() => setFocused('type')}
                onBlur={() => updateQuestion(type)}
              >
                <MenuItem value={"text"} default={type == 'text'}>Text</MenuItem>
                <MenuItem value={"select"}>Select</MenuItem>
                <MenuItem value={"email"} default={type == 'email'}>E-mail</MenuItem>
                <MenuItem value={"url"}>URL</MenuItem>
                <MenuItem value={"number"}>Number</MenuItem>
                <MenuItem value={"tel"}>Phone Number</MenuItem>
                <MenuItem value={"file"}>File</MenuItem>
              </Select>
            </Box>
            {type === 'select' && <OptionsEdit options={questions[activeQuestion].options} update={setQuestions} active={activeQuestion}/>}
            <Box sx={{px: 1, py: 2}}>
              <Typography variant="caption" color={focused ==='placeholder' && "primary"}>Placeholder</Typography>
              <TextField
                variant="standard"
                onFocus={() => setFocused('placeholder')}
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                onBlur={() => updateQuestion(placeholder)}
              />
            </Box>
            <Box sx={{px: 1, py: 2, display: 'flex', alignItems: 'center'}}>
              <TextField
                variant="standard"
                label="Button Text"
                onFocus={() => setFocused('buttonText')}
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                onBlur={() => updateQuestion(buttonText)}/>
            </Box>
            <Box sx={{px: 1, py: 2, display: 'flex', alignItems: 'center'}}>
              <Typography variant="body1" sx={{}}>Required</Typography>
              <Switch
                variant="standard"
                checked={required}
                onChange={handleCheck}
              />
            </Box>

            <Box sx={{px: 0, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column', height: '100%'}}>
              <Box sx={{my: 1, borderRadius: '10px', bgcolor: 'rgba(200, 200, 199, 0.4)', width: '100%', p: 1, display:'flex',flexWrap: 'wrap', overflowX: 'scroll'}}>
                <Typography variant="caption" color="primary" sx={{textAlign: 'center'}}>Preview form at: </Typography>
                <Typography variant="caption" sx={{textAlign: 'center', }}>http://localhost/forms/preview/{form.id}</Typography>
              </Box>
              <Button variant="outlined" onClick={save} fullWidth>Save</Button>
              <Button variant="contained" sx={{mt: 1}} onClick={publish} fullWidth>Publish</Button>
            </Box>

          </Grid>
        </Grid>
      </>
    : <Verify setVerify={setVerify} correct={form.password} id={form.id}/>
    }


    </>
  )
}
