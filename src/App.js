import './App.css'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'

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
  welcomeMessage: {
    fontSize: '1.5em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    },
  },
  authContainer: {
    position: 'relative',
    minHeight: '250px', // set this according to your needs
  },
  authComponent: {
    position: 'absolute',
    width: '100%',
  },
}))

function App() {
  const [items, setItems] = useState([])
  const [user, setUser] = useState(null)
  const [isSignInVisible, setIsSignInVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const { displayName, uid, email } = userAuth
        setUser({ displayName, uid, email })
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleShowSignUp = () => {
    setIsSignInVisible(false)
  }

  const handleShowSignIn = () => {
    setIsSignInVisible(true)
  }

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

  const handleLogInButtonClick = () => {
    handleShowSignIn()
  }

  const duration = 250
  const classes = useStyles()

  return (
    <div className={classes.centerContent}>
      <div className={classes.hero}>
        <Typography
          variant="h1"
          className={classes.title}
          onClick={handleShowSignUp}
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
        {!user ? (
          <div className={classes.authContainer}>
            <Fade in={isSignInVisible} timeout={duration} unmountOnExit>
              <div className={classes.authComponent}>
                <SignIn />
              </div>
            </Fade>
            <Fade in={!isSignInVisible} timeout={duration} unmountOnExit>
              <div className={classes.authComponent}>
                <SignUp />
              </div>
            </Fade>
          </div>
        ) : (
          <>
            <Typography variant="h1" className={classes.welcomeMessage}>
              Welcome, {user.email}!
            </Typography>
            <AddItemForm onAddItem={handleAddItem} />
            <List
              items={items}
              handleRemove={handleRemove}
              handleSave={handleSave}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App
