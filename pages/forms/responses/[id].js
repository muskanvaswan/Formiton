import { useRouter } from 'next/router';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box'

export const getServerSideProps = async (query) => {
  const { id } = query.query;

  const res = await fetch(`http://localhost:3000/api/form/respond/${id}`);
  const responses = await res.json()

  const qs = await fetch(`http://localhost:3000/api/form/${id}`)
  const form = await qs.json()

  const table = {
    columns: form.questions.map(question => ({field: question.id, headerName: question.question, flex: 1})),
    rows: responses.map((response, idx) => (Object.assign(JSON.parse(response.responseObject), {id: response.id})))
  }

  return {props: {table: table}}
}

export default function Responses({ table }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid autoHeight rows={table.rows} columns={table.columns} />
        </div>
      </div>
    </div>
  )
}
