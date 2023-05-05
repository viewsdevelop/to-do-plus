import './App.css'
import React, { useState } from 'react'

// Components
import List from './components/List'
import AddItemForm from './components/AddItemForm'

function App() {
  const [items, setItems] = useState([])

  const handleAddItem = (newItem) => {
    setItems([...items, newItem])
  }

  const handleRemove = (item) => {
    setItems(items.filter((i) => i !== item))
  }

  return (
    <div>
      <AddItemForm onAddItem={handleAddItem} />
      <List items={items} handleRemove={handleRemove} />
    </div>
  )
}

export default App
