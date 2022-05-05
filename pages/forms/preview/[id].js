import { useState } from 'react';
import Box from '@mui/material/Box'

import Form from '../../../src/components/forms/Form'
import getQuestions from '../../../sample-questions'
import parseCookies from "../../../src/helpers/cookies"
import Verify from '../../../src/components/edit/Verify'



export const getServerSideProps = async (query) => {
  const { id } = query.query;
  let hostname = query.req.headers.host
  const validated = parseCookies(query.req)
  if (hostname == 'localhost:3000')
    hostname = 'http://' + hostname
  else
    hostname = 'https://' + hostname
  const res = await fetch(`${hostname}/api/form/${id}`);
  const data = await res.json()
  const form = {
    id: data.id,
    theme: data.theme,
    questions: data.questions,
    welcome: {
      title: data.title,
      description: data.description,
      startText: data.startText,
      redirect: data.redirect,
      conclusion: data.conclusion,
    },
    conclusion: data.conclusion,
    redirect: data.redirect,
    published: false,

  }

  if (!data) {
    return {
      notFound: true,
    }
  }
  return {props: {form: form, validated: validated.validated == 'true', password: data.password}}
}

export default function FormPage({ form, validated, password }) {
  const [ verify, setVerify ] = useState(validated);

  return (
    verify? <Box sx={{ minHeight: '100vh', width: '100%', pb: 0, bgcolor: form.theme.bgcolor }}>
      <Form
        theme={form.theme}
        questions={form.questions}
        welcome={form.welcome}
        submit={{conclusion: form.conclusion, redirect: form.redirect, published: form.published}}
      />
    </Box> : <Verify correct={password} setVerify={setVerify} />
   )
}
