import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
  root: {
    // some css that access to theme
  }
});

export default function Component() {
  const classes = useStyles();
  return (
    <div />
  )
}
