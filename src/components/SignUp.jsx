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

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { PersonAdd } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  card: {
    width: '70%',
    margin: '0 auto',
    marginTop: theme.spacing(4),
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  signUpButton: {
    marginTop: theme.spacing(4),
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInError: {
    marginTop: theme.spacing(2),
  },
}))

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [signUpError, setSignUpError] = useState('')
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
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return pattern.test(email)
  }

  const isValidPassword = (password) => {
    return password.length >= 6
  }

  const handleSignUp = () => {
    setEmailError('')
    setPasswordError('')
    setSignUpError('')
    setIsLoading(true)

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email')
      setIsLoading(false)
    } else if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 6 characters long')
      setIsLoading(false)
    } else {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log('User signed up:', user)
          setIsLoading(false)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.error('Sign-up error:', errorCode, errorMessage)
          if (errorCode === 'auth/email-already-in-use') {
            setSignUpError(
              'This email is already in use. Please use a different email.'
            )
          } else {
            setSignUpError(errorMessage)
          }
          setIsLoading(false)
        })
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleSignUp()
  }

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <h1>Join the Community</h1>
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
            className={classes.signUpButton}
            disabled={isLoading}
            startIcon={<PersonAdd />}
          >
            {isLoading ? (
              <div className={classes.loadingContainer}>
                <CircularProgress size={24} />
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>
          <div className={classes.signUpError}>
            <FormHelperText error={!!signUpError}>{signUpError}</FormHelperText>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default SignUp
