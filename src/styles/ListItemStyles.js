import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: '10px',
    backgroundColor: '#fef5ab',
    width: '250px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '10px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  task: {
    marginBottom: '5px',
  },
  description: {
    marginTop: '5px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    width: '100%',
  },
  button: {
    flex: 1,
    margin: theme.spacing(1),
    padding: theme.spacing(1, 2),
    fontSize: '0.8rem',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default useStyles
