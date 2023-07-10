import './App.css'
import React, { useState, useEffect } from 'react'

// Material UI
import { MaterialUIComponents } from './components/MaterialUIComponents'

// Animations / Styles
import { FadeLoader } from 'react-spinners'
import useStyles from './styles/AppStyles'

// Assets
import logo from './assets/logo.png'

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

const {
  Modal,
  CssBaseline,
  Typography,
  Button,
  Fade,
  createTheme,
  ThemeProvider,
} = MaterialUIComponents

const APP_STATES = {
  SIGNED_OUT: 'SIGNED_OUT',
  SIGNING_IN: 'SIGNING_IN',
  SIGNED_IN: 'SIGNED_IN',
  LOGGING_OUT: 'LOGGING_OUT',
}

function App() {
  const [authState, setAuthState] = useState({
    user: null,
    appState: APP_STATES.SIGNED_OUT,
    isSigningOut: false,
    showSigningOutMessage: false,
  })

  const { user, appState, isSigningOut, showSigningOutMessage } = authState
  const [isSignInVisible, setIsSignInVisible] = useState(false)
  const [isSignUpVisible, setIsSignUpVisible] = useState(true)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const duration = 500
  const classes = useStyles()

  const fadeTimeout = {
    enter: duration,
    exit: 250,
  }

  const confirmationModalFadeTimeout = {
    enter: duration,
    exit: 0,
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#20509E',
      },
    },
  })

  // Handler functions
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
    setAuthState((prevState) => ({
      ...prevState,
      appState: APP_STATES.LOGGING_OUT,
      isSigningOut: true,
      showSigningOutMessage: true,
    }))

    signOut(auth)
      .then(() => {
        setAuthState((prevState) => ({
          ...prevState,
          user: null,
          appState: APP_STATES.SIGNED_OUT,
          isSigningOut: false,
          showSigningOutMessage: false,
        }))
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

  // useEffect hooks
  useEffect(() => {
    if (isSigningOut && !user) {
      setAuthState((prevState) => ({
        ...prevState,
        isSigningOut: false,
      }))
    }
  }, [isSigningOut, user])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const { displayName, uid, email } = userAuth
        setAuthState((prevState) => ({
          ...prevState,
          user: { displayName, uid, email },
          appState: APP_STATES.SIGNED_IN,
        }))
      } else {
        setAuthState((prevState) => ({
          ...prevState,
          user: null,
          appState: APP_STATES.SIGNED_OUT,
        }))
      }
    })

    return () => unsubscribe()
  }, [])

  // Other components and JSX
  const UnauthenticatedApp = () => (
    <div className={classes.unauthenticatedAppContainer}>
      <Fade in={showSigningOutMessage} timeout={fadeTimeout} unmountOnExit>
        <div className={classes.signingOutContainer}>
          <Typography className={classes.signingOutMessage}>
            Signing Out...
          </Typography>
          <FadeLoader {...{ color: '#333', loading: showSigningOutMessage }} />
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
    </div>
  )

  return (
    <ThemeProvider theme={theme}>
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
            <div className={classes.logoContainer}>
              <img src={logo} alt="ToDo+ Logo" className={classes.logo} />
            </div>
          </Typography>
          {!user && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogInButtonClick}
            >
              Sign In
            </Button>
          )}
          {user && (
            <Button variant="contained" color="primary" onClick={handleSignOut}>
              Sign Out
            </Button>
          )}
        </div>
        <div className={classes.cardContainer}>
          <div className={classes.titleContainer}>
            <span className={classes.todoText}>ToDo+</span>
          </div>
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
                <AuthenticatedApp {...{ fadeTimeout, user }} />
              ) : (
                <UnauthenticatedApp />
              )}
            </Fade>
          </div>
        </div>
        <Modal
          {...{
            open: showConfirmationModal,
            onClose: handleCancelSignOut,
            className: classes.modal,
          }}
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
    </ThemeProvider>
  )
}

export default App
