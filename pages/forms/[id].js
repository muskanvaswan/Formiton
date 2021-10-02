import { useRouter } from 'next/router';
import Box from '@mui/material/Box'

import Form from '../../src/components/forms/Form'
import getQuestions from '../../sample-questions'

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

export default function FormPage({ form }) {
  return (
    <Box sx={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
      <Form
        theme={form.theme}
        questions={form.questions}
        welcome={form.welcome}
        submit={form.submit}
      />
    </Box>
  )
}
