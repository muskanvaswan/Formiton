import { useRouter } from 'next/router';
import Box from '@mui/material/Box'

import Form from '../../src/components/forms/Form'
import getQuestions from '../../sample-questions'

export const getServerSideProps = async (query) => {
  const { id } = query.query;

  const res = await fetch(`http://localhost:3000/api/form/${id}`);
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
    }
  }

  if (!data) {
    return {
      notFound: true,
    }
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
        submit={form.submit}
      />
    </Box>
  )
}
