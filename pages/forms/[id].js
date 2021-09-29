import { useRouter } from 'next/router';
import Box from '@mui/material/Box'
export const getServerSideProps = async (query) => {
  const { id } = query.query;
  const form = {
    id: id,
    theme: {primary: 'rgb(100, 148, 219)'},
    questions: []
  }
  return {props: {form: form}}
}

export default function Form({ form }) {
  return (
    <Box sx={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
      <h1>{form.id}</h1>
    </Box>
  )
}
