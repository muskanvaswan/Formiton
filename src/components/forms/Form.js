import * as React from "react";

import Question from "./Question";
import Welcome from "./Welcome";
import Submit from "./Submit";

import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

export default function Form({ questions, theme, welcome, submit, formId }) {

  const [ ques, updateQuestion ] = React.useState(0);
  const [ responses, setResponses ] = React.useState({});
  const limit = questions.length;

  return (
    <Box sx={{width: '100%'}}>
      <LinearProgress variant="determinate" value={(ques / (limit + 1) ) * 100} sx={{height: '10px', bgcolor: theme.bgcolor, '& span': {bgcolor: theme.primary + "60"}}}/>
      <Container maxWidth="md" sx={{overflowY: {lg: 'hidden', sm: 'scroll'}}}>
        {ques == 0 && <Welcome start={updateQuestion} theme={theme} data={welcome} />}
        {ques > 0 && ques <= limit ?
          (<Question
            key={ques}
            question={questions[ques - 1]}
            updateQuestion={updateQuestion}
            limit={limit}
            responses={responses}
            addResponse={setResponses}
            theme={theme}
          />) :
          (ques == limit + 1 &&
            (<Submit
              responses={responses}
              updateQuestion={updateQuestion}
              data={submit}
              fields={limit}
              theme={theme}
              formId={formId}
            />
          ))}
      </Container>
    </Box>
  )
}
