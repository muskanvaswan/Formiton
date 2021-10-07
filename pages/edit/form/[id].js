import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import IconButton from '@mui/material/IconButton'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Input from '../../../src/components/forms/Input'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'




import getQuestions from '../../../sample-questions'

export const getServerSideProps = async (query) => {
  const { id } = query.query;
  const form = {
    id: id,
    theme: {primary: 'rgb(100, 148, 219)'},
    questions: getQuestions(),
    welcome: {
      title: "The Trial form",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  }
  return {props: {form: form}}
}


export default function Form({ form }) {

  const classes = {
    root: {
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
      bgcolor: form.theme.bgcolor || 'background.paper',
      borderRadius: '20px',
      padding: 10,
      borderColor: form.theme.primary || 'primary.main',
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
      bgcolor: form.theme.bgcolor || 'background.default',
      opacity: 0.8,
      borderRadius: '20px',
      mr: 2,
      mt: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: form.theme.primary || 'primary.main',
      borderWidth: 2,
      borderStyle: 'solid'
    },
    design: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
      marginTop: '5px'
    },
    subHeading: {
      fontStyle: 'italic'
    },
    description: {
      marginTop: 20
    },
  };

  const [ questions, setQuestions ] = React.useState(form.questions);
  const [ activeQuestion, setActiveQuestion ] = React.useState(0);
  const [ focused, setFocused ] = React.useState('false');

  const copyStyle = (obj) => {
    return {
      position: 'relative',
      mt: -1,
      borderWidth: 0,
      '& input' : {
        fontSize: obj.fontSize,
        color: obj.color,
        fontWeight: obj.fontWeight
      },
    }
  }

  const [ heading, setHeading ] = React.useState(questions[activeQuestion].heading);
  const [ subHeading, setSubHeading ] = React.useState(questions[activeQuestion].subHeading);
  const [ description, setDescription ] = React.useState(questions[activeQuestion].description);
  const updateQuestion = (val) => {
    setQuestions(questions => {
      questions[activeQuestion][focused] = val;
      return questions;
    })
    setFocused('false');
  }

  return (
    <Grid container spacing={4} sx={classes.root}>
      <Grid item lg={10} md={10} sm={12} xs={12} sx={classes.preview}>
        <Box sx={{height: '100%', width: '100%', p:0}}>
          <Box sx={classes.question}>
            <Box sx={classes.q}>
              <ArrowForwardIcon color="primary" sx={classes.icon}/>
              {focused === 'heading' ?
                <TextField variant="standard" sx={copyStyle({ fontWeight: 700, fontSize: 36, color: form.theme.primary || 'primary.main'})} autoFocus={true} value={heading} onChange={(e) => setHeading(e.target.value)} onBlur={() => updateQuestion(heading)} />
                :<Typography variant="h4" color="primary" sx={{ fontWeight: 700}} onClick={() => setFocused('heading')}>{questions[activeQuestion].heading}</Typography>
              }
            </Box>
            {focused === 'subHeading' ?
              <TextField variant="standard" sx={copyStyle({ fontWeight: 700, fontSize: 25, color: form.theme.primary || 'primary.main'})} autoFocus={true} value={subHeading} onChange={(e) => setSubHeading(e.target.value)} onBlur={() => updateQuestion(subHeading)} />
              :<Typography variant="h5" color="primary" sx={{ opacity: 0.7}} onClick={() => setFocused('subHeading')} sx={classes.subHeading}>{questions[activeQuestion].subHeading || "Put Sub Heading here..."}</Typography>
            }
            {focused === 'description' ?
              <TextField variant="standard" sx={copyStyle({ fontWeight: 700, fontSize: 25, color: form.theme.primary || 'primary.main'})} autoFocus={true} value={description} onChange={(e) => setDescription(e.target.value)} onBlur={() => updateQuestion(description)} />
              :<Typography variant="body1" component='div' color="primary" sx={{ opacity: 0.6 }} onClick={() => setFocused('description')} dangerouslySetInnerHTML={{__html: questions[activeQuestion].description}} className={classes.description} />
            }

            <Input
              question={questions[activeQuestion]}
              theme={form.theme}
              disabled={true}
            />
          </Box>
          <Box sx={classes.questions}>
            {questions.map((question, idx) => (
              <Box
                key={question.id}
                onClick={() => setActiveQuestion(idx)}
                sx={idx == activeQuestion? classes.activeQuestionPreview: classes.questionPreview}>
                {question.id}
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item lg={2} md={2} sm={12} xs={12} sx={classes.design}>
      </Grid>
    </Grid>
  )
}
