import './App.css'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// Components
import List from './components/List'
import AddItemForm from './components/AddItemForm'

const useStyles = makeStyles({
  hero: {
    backgroundColor: '#F0F0F0',
    padding: '20px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
  },
})

function App() {
  const [items, setItems] = useState([])
  const classes = useStyles()

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
    <div>
      <div className={classes.hero}>
        <Typography variant="h1" className={classes.title}>
          ✅ ToDo+
        </Typography>
      </div>
      <AddItemForm onAddItem={handleAddItem} />
      <List items={items} handleRemove={handleRemove} handleSave={handleSave} />
    </div>
  )
}

export default App
