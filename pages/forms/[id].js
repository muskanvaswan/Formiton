import { useRouter } from 'next/router';
import Box from '@mui/material/Box'

import Form from '../../src/components/forms/Form'
import getQuestions from '../../sample-questions'

export const getServerSideProps = async (query) => {
  const { id } = query.query;
  const form = {
    id: id,
    theme: {primary: 'rgb(100, 148, 219)'},
    questions: getQuestions()
  }
  return {props: {form: form}}
}

export default function FormPage({ form }) {
  return (
    <Box sx={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>

      <Form theme={form.theme} questions={form.questions} />|
    </Box>
  )
}
