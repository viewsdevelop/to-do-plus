import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  welcomeMessage: {
    fontSize: '1.5em',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    },
  },
  searchBar: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  searchResultsWrapper: {
    marginTop: '20px',
  },
  addNewContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  addNewText: {
    marginTop: theme.spacing(1),
    fontWeight: 300,
    opacity: 0.7,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
}))

export default useStyles
