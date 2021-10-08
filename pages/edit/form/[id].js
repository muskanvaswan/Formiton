import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import IconButton from '@mui/material/IconButton'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Input from '../../../src/components/forms/Input'
import Navigators from '../../../src/components/forms/Navigators'

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import ColorPicker from '../../../src/components/create/ColorPicker'
import OptionsEdit from '../../../src/components/create/Options'

import { useTheme } from '@mui/material/styles'

import getQuestions from '../../../sample-questions'

export const getServerSideProps = async (query) => {
  const { id } = query.query;
  const form = {
    id: id,
    theme: {
      primary: 'rgb(100, 148, 219)',
      secondary: 'rgb(42, 127, 255)'
    },
    questions: getQuestions(),
    welcome: {
      title: "The Trial form",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  }
  return {props: {form: form}}
}


export default function Form({ form }) {


  const theme = useTheme();

  const [ questions, setQuestions ] = React.useState(form.questions);
  const [ activeQuestion, setActiveQuestion ] = React.useState(0);
  const [ focused, setFocused ] = React.useState('false');

  const [ inp, setInp ] = React.useState();

  const [ heading, setHeading ] = React.useState(questions[activeQuestion].heading);
  const [ subHeading, setSubHeading ] = React.useState(questions[activeQuestion].subHeading);
  const [ description, setDescription ] = React.useState(questions[activeQuestion].description);
  const [ placeholder, setPlaceholder ] = React.useState(questions[activeQuestion].placeholder);
  const [ buttonText, setButtonText ] = React.useState(questions[activeQuestion].buttonText);
  const [ required, setRequired ] = React.useState(questions[activeQuestion].required);
  const [ type, setType ] = React.useState(questions[activeQuestion].type);

  const [ bgcolor, setBgcolor ] = React.useState(form.theme.bgcolor || theme.palette.background.default)
  const [ primary, setPrimary ] = React.useState(form.theme.primary || theme.palette.primary.main)
  const [ secondary, setSecondary ] = React.useState(form.theme.secondary || theme.palette.secondary.main)

  const copyStyle = (obj) => {
    return {
      position: 'relative',
      mt: -1,
      borderWidth: 0,
      '& input' : {
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
      padding: 10,
      borderColor: primary || 'primary.main',
      borderWidth: 2,
      borderStyle: 'solid'
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
      alignItems: 'center'
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
      borderStyle: 'solid'
    },
    design: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      //justifyContent: 'center',
      //alignItems: 'center',
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
    subHeading: {
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
    setHeading(questions[activeQuestion].heading);
    setSubHeading(questions[activeQuestion].subHeading);
    setDescription(questions[activeQuestion].description);
    setPlaceholder(questions[activeQuestion].placeholder);
    setButtonText(questions[activeQuestion].buttonText || "Save");
    setRequired(questions[activeQuestion].required);
  }, [activeQuestion]);

  const updateQuestion = (val) => {
    setQuestions(questions => {
      questions[activeQuestion][focused] = val;
      return questions;
    })
    setFocused('false');
  }

  const handleCheck = (e) => {
    setRequired(e.target.checked);
    setQuestions(questions => {
      questions[activeQuestion].required = e.target.checked;
      return questions;
    })
  }
  return (
    <Grid container spacing={4} sx={classes.root}>
      <Grid item lg={10} md={10} sm={12} xs={12} sx={classes.preview}>
        <Box sx={{height: '100%', width: '100%', p:0}}>
          <Box sx={classes.question}>
            <Box sx={classes.q}>
              <ArrowForwardIcon color="primary" sx={classes.icon}/>
              {focused === 'heading' ?
                <TextField variant="standard" sx={copyStyle({ fontWeight: 700, fontSize: 36, color: primary || 'primary.main'})} autoFocus={true} value={heading} onChange={(e) => setHeading(e.target.value)} onBlur={() => updateQuestion(heading)} />
                :<Typography variant="h4" color="primary" sx={{ fontWeight: 700, color: primary || 'primary.main'}} onClick={() => setFocused('heading')}>{questions[activeQuestion].heading}</Typography>
              }
            </Box>
            {focused === 'subHeading' ?

              <TextField variant="standard" sx={copyStyle({ fontSize: 25, color: primary || 'primary.main'})} autoFocus={true} value={subHeading} onChange={(e) => setSubHeading(e.target.value)} onBlur={() => updateQuestion(subHeading)} />
              :<Typography variant="h5" onClick={() => setFocused('subHeading')} sx={classes.subHeading}>{questions[activeQuestion].subHeading || "Put Sub Heading here..."}</Typography>
            }
            {focused === 'description' ?
              <TextField variant="standard" sx={copyStyle({ fontSize: 14, color: primary || 'primary.main'})} autoFocus={true} value={description} onChange={(e) => setDescription(e.target.value)} onBlur={() => updateQuestion(description)} />
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
                key={question.id}
                onClick={() => setActiveQuestion(idx)}
                sx={idx == activeQuestion? classes.activeQuestionPreview: classes.questionPreview}>
                <Typography sx={idx == activeQuestion? {color: primary || 'primary.main' }: {color: 'white'}} variant="h3">{question.id}</Typography>
              </Box>
            ))}
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
        <Box sx={{px: 1, py: 2, mt: 5}}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            variant="standard"
            sx={{width: '100%'}}
            label="Age"
            onChange={(e) => setType(e.target.value)}
            onFocus={() => setFocused('type')}
            onBlur={() => updateQuestion(type)}
          >
            <MenuItem value={"text"}>Text</MenuItem>
            <MenuItem value={"select"}>Select</MenuItem>
            <MenuItem value={"email"}>E-mail</MenuItem>
            <MenuItem value={"url"}>URL</MenuItem>
            <MenuItem value={"number"}>Number</MenuItem>
          </Select>
        </Box>
        {type === 'select' && <OptionsEdit />}
        <Box sx={{px: 1, py: 2}}>
          <Typography variant="caption" color={focused ==='placeholder' && "primary"}>Required</Typography>
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

      </Grid>
    </Grid>
  )
}
