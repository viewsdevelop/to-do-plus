import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSignUp = () => {
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
      })
  }

  return (
    <div>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button variant="contained" color="primary" onClick={handleSignUp}>
        Sign Up
      </Button>
    </div>
  )
}

export default SignUp
