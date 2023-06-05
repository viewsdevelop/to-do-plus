import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'

import List from './List'
import AddItemForm from './AddItemForm'
import SearchBar from './SearchBar'

const useStyles = makeStyles((theme) => ({
  welcomeMessage: {
    fontSize: '1.5em',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    },
  },
  searchBar: {
    marginBottom: theme.spacing(5),
    width: '100%',
  },
  searchResultsWrapper: {
    marginTop: '20px',
  },
}))

function AuthenticatedApp({ fadeTimeout, user }) {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const classes = useStyles()

  const handleAddItem = (newItem) => {
    const newItemWithId = { ...newItem, id: uuidv4() }
    setItems((prevItems) => [...prevItems, newItemWithId])
  }

  const handleRemove = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const handleSave = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    )
  }

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }

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
        </div>
      </div>
    </Fade>
  )
}

export default AuthenticatedApp
