import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  appRoot: {
    height: '100vh',
    overflowY: 'auto',
  },
  authComponent: {
    position: 'absolute',
    width: '100%',
  },
  authContainer: {
    position: 'relative',
    minHeight: '250px',
  },
  cardContainer: {
    marginTop: '100px',
    width: '75%',
    marginBottom: theme.spacing(10),
  },
  cardContent: {
    padding: theme.spacing(5),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#F0F0F0',
  },
  centerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'fixed',
    width: '100%',
  },
  clickableTitle: {
    cursor: 'pointer',
  },
  hero: {
    position: 'fixed',
    top: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
    padding: '20px',
    marginBottom: '20px',
    width: '100%',
  },
  logo: {
    height: '48px',
    width: '48px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    margin: 'auto',
  },
  modalActions: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    textAlign: 'center',
  },
  modalMessage: {
    marginBottom: theme.spacing(2),
  },
  searchInput: {
    marginBottom: theme.spacing(4),
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  signInForm: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
    },
  },
  signInTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  signingOutContainer: {
    position: 'fixed',
    top: 'calc(50%)',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  signingOutMessage: {
    fontSize: '24px',
    marginBottom: theme.spacing(2),

    '@media (max-width: 600px)': {
      fontSize: '16px',
    },
  },
  signUpForm: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(8),
    },
  },
  signUpTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    cursor: 'default',
  },
  titleContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  todoText: {
    fontSize: '46px',
    fontWeight: 'bold',
    fontFamily: 'Tsukimi Rounded, sans-serif',
    margin: '0 10px',
    lineHeight: '1',
  },
  unauthenticatedAppContainer: {
    position: 'fixed',
    width: '75%',
  },
  welcomeMessage: {
    fontSize: '1.5em',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    },
  },
}))

export default useStyles
