import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

// Material UI / Styles
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Divider from '@material-ui/core/Divider'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import AuthenticatedAppStyles from '../AuthenticatedAppStyles'

// Components
import List from './List'
import AddItemForm from './AddItemForm'
import SearchBar from './SearchBar'
import App from '../App'

// Firebase
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore'

function AuthenticatedApp({ fadeTimeout, user }) {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const classes = AuthenticatedAppStyles()

  const userItemsCollectionRef =
    user && collection(getFirestore(App), 'users', user.uid, 'items')

  const handleAddItem = async (newItem) => {
    if (userItemsCollectionRef) {
      const newItemWithId = { ...newItem }
      const docRef = await addDoc(userItemsCollectionRef, newItemWithId)
      const docId = docRef.id
      await updateDoc(doc(userItemsCollectionRef, docId), { docId })
    }
  }

  const handleRemove = async (docId) => {
    if (userItemsCollectionRef) {
      await deleteDoc(doc(userItemsCollectionRef, docId))
    }
  }

  const handleSave = async (updatedItem) => {
    if (userItemsCollectionRef) {
      await updateDoc(
        doc(userItemsCollectionRef, updatedItem.docId),
        updatedItem
      )
    }
  }

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    const unsubscribe =
      userItemsCollectionRef &&
      onSnapshot(userItemsCollectionRef, (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setItems(items)
      })

    return () => unsubscribe && unsubscribe()
  }, [user])

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredItems(filtered)
  }, [searchQuery, items])

  return (
    <Fade in={true} timeout={fadeTimeout}>
      <div>
        <Typography variant="h1" className={classes.welcomeMessage}>
          Welcome, {user.email}
        </Typography>

        <Divider variant="middle" style={{ margin: '20px 0' }} />

        <AddItemForm onAddItem={handleAddItem} />

        <SearchBar
          searchQuery={searchQuery}
          handleSearchQueryChange={handleSearchQueryChange}
          classes={{ root: classes.searchBar }}
        />

        <div className={classes.searchResultsWrapper}>
          {filteredItems.length === 0 && items.length > 0 && searchQuery && (
            <Typography variant="h5">No Results Found!</Typography>
          )}

          {filteredItems.length > 0 && (
            <List
              items={filteredItems}
              handleRemove={handleRemove}
              handleSave={handleSave}
            />
          )}

          {items.length === 0 && (
            <div className={classes.addNewContainer}>
              <AddCircleOutlineIcon />
              <Typography variant="h6" className={classes.addNewText}>
                New / Saved Tasks Will Appear Here...
              </Typography>
            </div>
          )}
        </div>
      </div>
    </Fade>
  )
}

export default AuthenticatedApp
