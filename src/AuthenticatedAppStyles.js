import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  addNewContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100%',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  addNewText: {
    fontSize: '1.5rem',
    fontWeight: 400,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    opacity: 0.7,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      fontWeight: 300,
      marginBottom: theme.spacing(5),
      marginTop: theme.spacing(2),
    },
  },
  searchBar: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  searchResultsWrapper: {
    marginBottom: theme.spacing(5),
    marginTop: '20px',
  },
  welcomeMessage: {
    fontSize: '1.5em',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    },
  },
}))

export default useStyles
