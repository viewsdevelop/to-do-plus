import './App.css'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'

// Components
import List from './components/List'
import AddItemForm from './components/AddItemForm'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

// Firebase
import { initializeApp } from 'firebase/app'
import { getAuth, signOut } from 'firebase/auth'
import firebaseConfig from './firebaseConfig'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

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
}))

function App() {
  const [items, setItems] = useState([])
  const [user, setUser] = useState(null)

  const classes = useStyles()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User is signed in
        const { displayName, uid, email } = userAuth
        setUser({ displayName, uid, email })
      } else {
        // User is signed out
        setUser(null)
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  const handleAddItem = (newItem) => {
    const newItemWithId = { ...newItem, id: uuidv4() }
    setItems([...items, newItemWithId])
  }

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleSave = (updatedItem) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === updatedItem.id) {
          return updatedItem
        }
        return item
      })
    })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Successfully signed out
      })
      .catch((error) => {
        // Handle sign out error
        console.log(error)
      })
  }

  return (
    <div className={classes.centerContent}>
      <div className={classes.hero}>
        <Typography variant="h1" className={classes.title}>
          ✅ ToDo+
        </Typography>
        {user && (
          <Button
            variant="contained"
            color="primary"
            className={classes.logOutButton}
            onClick={handleSignOut}
          >
            Log Out
          </Button>
        )}
      </div>
      <div className={classes.cardContainer}>
        {!user ? (
          <Card className={classes.cardContent}>
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                className={classes.signInTitle}
              >
                Sign In
              </Typography>
              <Box
                className={classes.signInForm}
                display="flex"
                flexDirection="column"
                alignItems="center"
                mb={{ xs: 4, sm: 0 }} // Add margin-bottom on small screens
              >
                <SignIn />
              </Box>
            </CardContent>
          </Card>
        ) : (
          <>
            <h1>Welcome, {user.email}!</h1>
            <AddItemForm onAddItem={handleAddItem} />
            <List
              items={items}
              handleRemove={handleRemove}
              handleSave={handleSave}
            />
          </>
        )}
      </div>
      {!user && (
        <div className={classes.cardContainer}>
          <Box boxShadow={1}>
            <Card className={classes.cardContent}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.signUpTitle}
                >
                  Sign Up
                </Typography>
                <Box
                  className={classes.signUpForm}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mb={{ xs: 4, sm: 0 }}
                >
                  <SignUp />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </div>
      )}
    </div>
  )
}

export default App
