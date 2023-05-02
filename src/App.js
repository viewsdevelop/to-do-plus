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

  return (
    <div>
      <AddItemForm onAddItem={handleAddItem} />
      <List items={items} />
    </div>
  )
}

export default App
