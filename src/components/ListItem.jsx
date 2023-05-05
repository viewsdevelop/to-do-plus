import React, { useState } from 'react'

function ListItem({ item, onRemove }) {
  const [isVisible, setIsVisible] = useState(true)

  const handleRemoveClick = () => {
    setIsVisible(false)
    onRemove(item.id)
  }

  return (
    <div style={{ display: isVisible ? 'block' : 'none' }}>
      <p>Task: {item.title}</p>
      <p>Description: {item.description}</p>
      <button onClick={handleRemoveClick}>Complete ✅</button>
    </div>
  )
}

export default ListItem
