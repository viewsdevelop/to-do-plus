import './App.css'
import React, { useState, useEffect } from 'react'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'

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
  hero: {
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
  },
  logOutButton: {
    marginRight: '20px',
  },
  cardContainer: {
    marginTop: theme.spacing(4),
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
    position: 'absolute',
    width: '100%',
  },
}))

function App() {
  const [user, setUser] = useState(null)
  const [isSignInVisible, setIsSignInVisible] = useState(false)
  const [isSignUpVisible, setIsSignUpVisible] = useState(true)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [appState, setAppState] = useState(APP_STATES.SIGNED_OUT)

  const duration = 500

  const fadeTimeout = {
    enter: duration,
    exit: duration - 250,
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
    setAppState(APP_STATES.LOGGING_OUT)
    signOut(auth)
      .then(() => {
        setUser(null)
        setTimeout(() => {
          setAppState(APP_STATES.SIGNED_OUT)
        }, duration)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleLogInButtonClick = () => {
    handleShowSignIn()
  }

  useEffect(() => {
    if (isSigningOut && !user) {
      setTimeout(() => {
        setIsSigningOut(false)
      }, duration)
    }
  }, [isSigningOut, user, duration])

  const UnauthenticatedApp = () => (
    <Fade
      in={
        appState === APP_STATES.SIGNING_IN || appState === APP_STATES.SIGNED_OUT
      }
      timeout={fadeTimeout}
      unmountOnExit
    >
      <div className={classes.authComponent}>
        {isSignInVisible && <SignIn />}
        {isSignUpVisible && <SignUp />}
      </div>
    </Fade>
  )

  return (
    <div className={classes.centerContent}>
      <div className={classes.hero}>
        <Typography
          variant="h1"
          className={`${classes.title} ${!user ? classes.clickableTitle : ''}`}
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
    </div>
  )
}

export default App
