import { useRouter } from 'next/router';
import Box from '@mui/material/Box'

import Form from '../../src/components/forms/Form'
import getQuestions from '../../sample-questions'

export const getServerSideProps = async (query) => {
  const { id } = query.query;
  let hostname = query.req.headers.host
  if (hostname == 'localhost:3000')
    hostname = 'http://' + hostname
  else
    hostname = 'https://' + hostname
  const res = await fetch(`${hostname}/api/form/${id}`);
  const data = await res.json()
  if (data.status == 400) {
    return {
      notFound: true,
    }
  }



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
    published: data.published,

  }

  return {props: {form: form}}
}

export default function FormPage({ form }) {
  return (
    <Box sx={{ minHeight: '100vh', width: '100%', pb: 0, bgcolor: form.theme.bgcolor }}>
      <Form
        theme={form.theme}
        questions={form.questions}
        welcome={form.welcome}
        submit={{conclusion: form.conclusion, redirect: form.redirect, published: form.published}}
        formId={form.id}
      />
    </Box>
  )
}
