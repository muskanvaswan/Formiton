import * as React from "react";

import Question from "./Question";
import Welcome from "./Welcome";
import Submit from "./Submit";

import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container'

export default function Form({ questions, theme, welcome, submit }) {

  const [ ques, updateQuestion ] = React.useState(0);
  const [ responses, setResponses ] = React.useState({ 0: true });
  const limit = questions.length;

  return (
    <>
      <LinearProgress
        value={ques / (limit + 1) * 100}
        color="primary"
        sx={{height: 5, bgcolor: theme.bgcolor || 'background.default'}}
        variant="determinate"
      />
      <Container maxWidth="md" sx={{overflowY: {lg: 'hidden', sm: 'scroll'}}}>
        {ques == 0 && <Welcome start={updateQuestion} data={welcome} />}
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
              fields={limit}
            />
          ))}
      </Container>
    </>
  )
}
