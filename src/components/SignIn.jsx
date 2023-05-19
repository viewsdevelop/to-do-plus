import React, { useState } from 'react'
import {
  TextField,
  Button,
  FormHelperText,
  CircularProgress,
  Card,
  CardContent,
  makeStyles,
} from '@material-ui/core'
import { LockOpen } from '@material-ui/icons'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const useStyles = makeStyles((theme) => ({
  card: {
    width: '70%',
    margin: '0 auto',
    marginTop: theme.spacing(4),
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('sm')]: {
      width: '90%', // Adjust the width for mobile view
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  cardHeight: {
    height: '310px',
    [theme.breakpoints.down('sm')]: {
      height: '350px',
    },
  },
  signInButton: {
    marginTop: theme.spacing(4),
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInError: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '48px',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start', // Left-aligned for larger screens
    },
    formHelperText: {
      textAlign: 'center', // Add this
    },
  },
}))

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [signInError, setSignInError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const classes = useStyles()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setEmailError('')
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setPasswordError('')
  }

  const isValidEmail = (email) => {
    // Regex pattern for valid email
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return pattern.test(email)
  }

  const isValidPassword = (password) => {
    return password.length >= 6
  }

  const handleSignIn = () => {
    setEmailError('')
    setPasswordError('')
    setSignInError('')
    setIsLoading(true)

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email')
      setIsLoading(false)
    } else if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 6 characters long')
      setIsLoading(false)
    } else {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log('User signed in:', user)
          setIsLoading(false)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.error('Sign-in error:', errorCode, errorMessage)
          if (errorCode === 'auth/user-not-found') {
            setSignInError(
              'User not found. Please check your email / password or create a new account.'
            )
          } else if (errorCode === 'auth/wrong-password') {
            setSignInError('Incorrect password. Please try again.')
          } else {
            setSignInError(errorMessage)
          }
          setIsLoading(false)
        })
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleSignIn()
  }

  return (
    <Card className={`${classes.card} ${classes.cardHeight}`}>
      <CardContent className={classes.cardContent}>
        <h1>Sign Into Your Account</h1>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <FormHelperText error={!!emailError}>{emailError}</FormHelperText>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <FormHelperText error={!!passwordError}>
            {passwordError}
          </FormHelperText>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.signInButton}
            disabled={isLoading}
            startIcon={<LockOpen />}
          >
            {isLoading ? (
              <div className={classes.loadingContainer}>
                <CircularProgress size={24} />
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
        <div className={classes.signInError}>
          <FormHelperText
            className={classes.formHelperText}
            error={!!signInError}
          >
            {signInError}
          </FormHelperText>
        </div>
      </CardContent>
    </Card>
  )
}

export default SignIn
