import React, { useState } from 'react'

function ListItem({ item, onRemove, onSave }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)

  const handleRemoveClick = () => {
    setIsVisible(false)
    onRemove(item.id)
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setTitle(item.title)
    setDescription(item.description)
  }

  const handleSaveClick = () => {
    const updatedItem = {
      ...item,
      title,
      description,
    }
    onSave(updatedItem)
    setIsEditing(false)
  }

  return (
    <div style={{ display: isVisible ? 'block' : 'none' }}>
      {isEditing ? (
        <form>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </form>
      ) : (
        <>
          <p>Task: {item.title}</p>
          <p>Description: {item.description}</p>
          <button onClick={handleEditClick}>Edit ✏️</button>
          <button onClick={handleRemoveClick}>Complete ✅</button>
        </>
      )}
    </div>
  )
}

export default ListItem
