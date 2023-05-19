import React, { useState } from 'react'
import {
  TextField,
  Button,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const useStyles = makeStyles((theme) => ({
  signInButton: {
    marginTop: theme.spacing(4),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
    margin: '0 auto',
  },
  signInError: {
    marginTop: theme.spacing(2),
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
            setSignInError(
              'The password is incorrect for the provided email. Please try again.'
            )
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
    <div className={classes.container}>
      <h1>Log In</h1>
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
        <FormHelperText error={!!passwordError}>{passwordError}</FormHelperText>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.signInButton}
          disabled={isLoading} // Disable button when loading
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
        <FormHelperText error={!!signInError}>{signInError}</FormHelperText>
      </div>
    </div>
  )
}

export default SignIn
