import React from 'react';
import Box from '@mui/material/Box'
import { BlockPicker } from 'react-color'

export default function ColorPicker({ value, setValue }) {
  const [ picker, setPicker ] = React.useState(false);
  const handleChange = (color, e) => {
    setValue(color.hex);
    setPicker(false);
  }

  return (
    <Box sx={{position: 'relative'}}>
      <Box
        sx={{ width: 20, height: 20, bgcolor: value, borderRadius: 1, borderColor: '#000', borderWidth: '1px', my: 1}}
        onClick={() => setPicker(picker => !picker)}
      />
      <Box sx={{position: 'absolute', zIndex: 2}}>
        {picker && <BlockPicker
          color={value}
          triangle="hide"
          colors={['#76FF03', '#FFF9C4', '#f7c3f7', '#FFEBEE', '#F3E5F5', '#E3F2FD', '#448AFF', '#9575CD', '#B388FF', '#4DD0E1', '#64FFDA', '#000']}
          onChangeComplete={handleChange}
        />}
      </Box>
    </Box>
  )
}
