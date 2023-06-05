import './App.css'
import React, { useState, useEffect } from 'react'

// Material UI
import {
  makeStyles,
  Modal,
  CssBaseline,
  useMediaQuery,
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'

// Animations
import { FadeLoader } from 'react-spinners'

// Components
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import AuthenticatedApp from './components/AuthenticatedApp'

// Firebase
import { initializeApp } from 'firebase/app'
import { getAuth, signOut } from 'firebase/auth'
import firebaseConfig from './firebaseConfig'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const APP_STATES = {
  SIGNED_OUT: 'SIGNED_OUT',
  SIGNING_IN: 'SIGNING_IN',
  SIGNED_IN: 'SIGNED_IN',
  LOGGING_OUT: 'LOGGING_OUT',
}

const useStyles = makeStyles((theme) => ({
  appRoot: {
    height: '100vh',
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
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    marginLeft: '20px',
    cursor: 'default',
  },
  clickableTitle: {
    cursor: 'pointer',
  },
  centerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
  },
  logOutButton: {
    marginRight: '20px',
  },
  cardContainer: {
    marginTop: '100px',
    width: '75%',
  },
  cardContent: {
    padding: theme.spacing(5),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#F0F0F0',
  },
  signInTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  signUpTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  signInForm: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
    },
  },
  signUpForm: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(8),
    },
  },
  searchInput: {
    marginBottom: theme.spacing(4),
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  welcomeMessage: {
    fontSize: '1.5em',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    },
  },

  authContainer: {
    position: 'relative',
    minHeight: '250px',
  },
  authComponent: {
    position: 'fixed',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '100px',
    width: '75%',

    '@media (max-width: 480px)': {
      top: '50%',
      transform: 'translate(-50%, -50%)',
      marginTop: 0,
      width: '75%',
    },
  },
  signingOutContainer: {
    position: 'absolute',
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
      fontSize: '20px',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    margin: 'auto',
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
  modalActions: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
  },
}))

function App() {
  const [user, setUser] = useState(null)
  const [isSignInVisible, setIsSignInVisible] = useState(false)
  const [isSignUpVisible, setIsSignUpVisible] = useState(true)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [appState, setAppState] = useState(APP_STATES.SIGNED_OUT)
  const [showSigningOutMessage, setShowSigningOutMessage] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const duration = 500

  const fadeTimeout = {
    enter: duration,
    exit: 250,
  }

  const confirmationModalFadeTimeout = {
    enter: duration,
    exit: 0,
  }

  const classes = useStyles()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const { displayName, uid, email } = userAuth
        setUser({ displayName, uid, email })
        setAppState(APP_STATES.SIGNED_IN)
      } else {
        setUser(null)
        setAppState(APP_STATES.SIGNED_OUT)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleShowSignUp = () => {
    setIsSignInVisible(false)
    setIsSignUpVisible(true)
  }

  const handleShowSignIn = () => {
    setIsSignInVisible(true)
    setIsSignUpVisible(false)
  }

  const handleSignOut = () => {
    setShowConfirmationModal(true)
  }

  const handleConfirmSignOut = () => {
    setShowConfirmationModal(false)
    setAppState(APP_STATES.LOGGING_OUT)
    setIsSigningOut(true)
    setShowSigningOutMessage(true)
    signOut(auth)
      .then(() => {
        setUser(null)
        setAppState(APP_STATES.SIGNED_OUT)
        setTimeout(() => {
          setIsSigningOut(false)
          setShowSigningOutMessage(false)
        }, 1000)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleCancelSignOut = () => {
    setShowConfirmationModal(false)
  }

  const handleLogInButtonClick = () => {
    handleShowSignIn()
  }

  useEffect(() => {
    if (isSigningOut && !user) {
      setIsSigningOut(false)
    }
  }, [isSigningOut, user])

  const UnauthenticatedApp = () => (
    <>
      <Fade in={showSigningOutMessage} timeout={fadeTimeout} unmountOnExit>
        <div className={classes.signingOutContainer}>
          <Typography className={classes.signingOutMessage}>
            Signing Out...
          </Typography>
          <FadeLoader color="#333" loading={showSigningOutMessage} />
        </div>
      </Fade>
      <Fade
        in={
          appState === APP_STATES.SIGNING_IN ||
          (appState === APP_STATES.SIGNED_OUT && !showSigningOutMessage)
        }
        timeout={fadeTimeout}
        unmountOnExit
      >
        <div className={classes.authComponent}>
          {appState === APP_STATES.SIGNED_OUT && !showSigningOutMessage && (
            <>
              {isSignInVisible && <SignIn />}
              {isSignUpVisible && <SignUp />}
            </>
          )}
        </div>
      </Fade>
    </>
  )

  return (
    <>
      <CssBaseline />
      <div className={`${classes.centerContent} ${classes.appRoot}`}>
        <div className={classes.hero}>
          <Typography
            variant="h1"
            className={`${classes.title} ${
              !user ? classes.clickableTitle : ''
            }`}
            onClick={user ? null : handleShowSignUp}
          >
            ✅ ToDo+
          </Typography>
          {!user && (
            <Button
              variant="contained"
              color="primary"
              className={classes.logOutButton}
              onClick={handleLogInButtonClick}
            >
              Sign In
            </Button>
          )}
          {user && (
            <Button
              variant="contained"
              color="primary"
              className={classes.logOutButton}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          )}
        </div>
        <div className={classes.cardContainer}>
          <div className={classes.authContainer}>
            <Fade
              in={
                appState !== APP_STATES.SIGNING_IN &&
                appState !== APP_STATES.SIGNED_OUT
              }
              timeout={fadeTimeout}
              style={{
                transitionDelay:
                  appState === APP_STATES.SIGNED_OUT ? '500ms' : '0ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {user ? (
                <AuthenticatedApp fadeTimeout={fadeTimeout} user={user} />
              ) : (
                <UnauthenticatedApp />
              )}
            </Fade>
          </div>
        </div>
        <Modal
          open={showConfirmationModal}
          onClose={handleCancelSignOut}
          className={classes.modal}
        >
          <Fade
            in={showConfirmationModal}
            timeout={confirmationModalFadeTimeout}
          >
            <div className={classes.modalContent}>
              <Typography variant="h5" className={classes.modalMessage}>
                Are you sure you want to sign out?
              </Typography>
              <div className={classes.modalActions}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmSignOut}
                >
                  Sign Out
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  onClick={handleCancelSignOut}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  )
}

export default App
