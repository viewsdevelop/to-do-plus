import './App.css'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// Components
import List from './components/List'
import AddItemForm from './components/AddItemForm'

function App() {
  const [items, setItems] = useState([])

  const handleAddItem = (newItem) => {
    const newItemWithId = { ...newItem, id: uuidv4() }
    setItems([...items, newItemWithId])
  }

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div>
      <AddItemForm onAddItem={handleAddItem} />
      <List items={items} handleRemove={handleRemove} />
    </div>
  )
}

export default App
