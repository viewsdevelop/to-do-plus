import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    width: '70%',
    margin: '0 auto',
    marginTop: theme.spacing(4),
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  cardHeight: {
    minHeight: '310px',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      minHeight: '330px',
      overflow: 'auto',
    },
  },
  signUpButton: {
    marginTop: theme.spacing(4),
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpError: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}))

export default useStyles
