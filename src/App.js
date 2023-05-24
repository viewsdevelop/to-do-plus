import './App.css'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'

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
    cursor: 'default',
  },
  clickableTitle: {
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
  searchInput: {
    marginBottom: theme.spacing(4),
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '75%',
    },
  },
  welcomeMessage: {
    fontSize: '1.5em',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    },
  },

  authContainer: {
    position: 'relative',
    minHeight: '250px',
  },
  authComponent: {
    position: 'absolute',
    width: '100%',
  },
}))

function App() {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [user, setUser] = useState(null)
  const [isSignInVisible, setIsSignInVisible] = useState(false)
  const [isSignUpVisible, setIsSignUpVisible] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [showAuthenticated, setShowAuthenticated] = useState(false)
  const [isUserLoaded, setIsUserLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const duration = 250
  const classes = useStyles()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const { displayName, uid, email } = userAuth
        setUser({ displayName, uid, email })
        setIsUserLoaded(true)
        setIsSignInVisible(false)
        setIsSignUpVisible(false)
        setTimeout(() => {
          setShowAuthenticated(true)
        }, duration)
      } else {
        setUser(null)
        setIsUserLoaded(true)
        setShowAuthenticated(false)
        setIsSignInVisible(true)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleShowSignUp = () => {
    setIsSignInVisible(false)
    setIsSignUpVisible(true)
  }

  const handleShowSignIn = () => {
    setIsSignInVisible(true)
    setIsSignUpVisible(false)
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
        setUser(null)
        setIsSigningOut(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleLogInButtonClick = () => {
    handleShowSignIn()
  }

  useEffect(() => {
    if (isSigningOut && !user) {
      setTimeout(() => {
        setIsSigningOut(false)
      }, duration)
    }
  }, [isSigningOut, user, duration])

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const fadeTimeout = {
    enter: duration,
    exit: duration,
  }

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredItems(filtered)
  }, [searchQuery, items])

  return (
    <div className={classes.centerContent}>
      <div className={classes.hero}>
        <Typography
          variant="h1"
          className={`${classes.title} ${!user ? classes.clickableTitle : ''}`}
          onClick={user ? null : handleShowSignUp}
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
        <div className={classes.authContainer}>
          <Fade
            in={!user && !isSigningOut && isSignInVisible}
            timeout={duration}
            unmountOnExit
          >
            <div className={classes.authComponent}>
              <SignIn />
            </div>
          </Fade>
          <Fade
            in={!user && !isSigningOut && isSignUpVisible}
            timeout={duration}
            unmountOnExit
          >
            <div className={classes.authComponent}>
              <SignUp />
            </div>
          </Fade>
          <Fade
            in={!!user && !isSigningOut && showAuthenticated}
            timeout={fadeTimeout}
            unmountOnExit
          >
            <div className={classes.authComponent}>
              <>
                {user && (
                  <>
                    <Typography variant="h6">Search Your Items</Typography>

                    <TextField
                      label="Search"
                      variant="outlined"
                      value={searchQuery}
                      onChange={handleSearchQueryChange}
                      className={classes.searchInput}
                    />
                  </>
                )}
                {isUserLoaded && user && showAuthenticated && (
                  <Fade in={true} timeout={fadeTimeout}>
                    <Typography variant="h1" className={classes.welcomeMessage}>
                      Welcome, {user.email}
                    </Typography>
                  </Fade>
                )}

                <AddItemForm onAddItem={handleAddItem} />

                {filteredItems.length === 0 &&
                  items.length > 0 &&
                  searchQuery && (
                    <Typography variant="h5">No Results Found!</Typography>
                  )}

                {filteredItems.length > 0 && (
                  <List
                    items={filteredItems}
                    handleRemove={handleRemove}
                    handleSave={handleSave}
                  />
                )}
              </>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  )
}

export default App
