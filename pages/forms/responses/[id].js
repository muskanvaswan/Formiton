import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box'
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
  const res = await fetch(`${hostname}/api/form/respond/${id}`);
  const responses = await res.json()

  const qs = await fetch(`${hostname}/api/form/${id}`)
  const form = await qs.json()

  const table = {
    columns: form.questions.map(question => ({field: question.id, headerName: question.question, flex: 1})),
    rows: responses.map((response, idx) => (Object.assign(JSON.parse(response.responseObject), {id: response.id})))
  }

  return {props: {table: table, password: form.password, validated: validated}}
}

export default function Responses({ table, password, validated}) {
  const [ verify, setVerify ] = useState(validated);

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      {verify? <Box sx={{ display: 'flex', height: '100%', flexGrow: 1}}>
          <DataGrid autoHeight rows={table.rows} columns={table.columns} />
      </Box>
    : <Verify setVerify={setVerify} correct={password} />}
    </Box>
  )
}
