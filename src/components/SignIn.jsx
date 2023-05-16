import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'

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
    // Implement the sign in logic using Firebase Authentication SDK
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
