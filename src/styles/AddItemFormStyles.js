import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2),
    backgroundColor: '#fef5ab',
    padding: theme.spacing(2),
    borderRadius: '10px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    width: '250px',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '30px',
      height: '30px',
      backgroundColor: '#FFEE58',
      transform: 'translate(50%, -50%) rotate(45deg)',
      borderTopLeftRadius: '5px',
      boxShadow: '-2px 2px 5px rgba(0, 0, 0, 0.3)',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  pencilIcon: {
    marginRight: theme.spacing(1),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(1),
  },
  button: {
    marginTop: 25,
    marginBottom: 0,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}))

export default useStyles
