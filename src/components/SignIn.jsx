import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSignIn = () => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('User signed in:', user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error('Sign-in error:', errorCode, errorMessage)
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
      <Button variant="contained" color="primary" onClick={handleSignIn}>
        Sign In
      </Button>
    </div>
  )
}

export default SignIn
