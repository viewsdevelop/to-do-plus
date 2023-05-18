import './App.css'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// Components
import List from './components/List'
import AddItemForm from './components/AddItemForm'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

// Firebase
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import firebaseConfig from './firebaseConfig'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const useStyles = makeStyles({
  hero: {
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
  },
})

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

  return (
    <div className={classes.centerContent}>
      <div className={classes.hero}>
        <Typography variant="h1" className={classes.title}>
          ✅ ToDo+
        </Typography>
      </div>
      <div>
        {!user ? (
          <>
            <h1>Sign In</h1>
            <SignIn />
            <h1>Sign Up</h1>
            <SignUp />
          </>
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
    </div>
  )
}

export default App
