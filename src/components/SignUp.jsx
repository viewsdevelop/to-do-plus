import React, { useState } from 'react'
import { TextField, Button, FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const useStyles = makeStyles((theme) => ({
  signUpButton: {
    marginTop: theme.spacing(4),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
    margin: '0 auto',
  },
  signUpError: {
    marginTop: theme.spacing(2),
  },
}))

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [signUpError, setSignUpError] = useState('')

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

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email')
    } else if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 6 characters long')
    } else {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log('User signed up:', user)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.error('Sign-up error:', errorCode, errorMessage)
          setSignUpError(errorMessage)
        })
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleSignUp()
  }

  return (
    <div className={classes.container}>
      <h1>Sign Up</h1>
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
          className={classes.signUpButton}
        >
          Sign Up
        </Button>
        <div className={classes.signUpError}>
          <FormHelperText error={!!signUpError}>{signUpError}</FormHelperText>
        </div>
      </form>
    </div>
  )
}

export default SignUp
