import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  card: {
    marginBottom: '10px',
    backgroundColor: '#FFFA8F',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  task: {
    marginBottom: '5px',
  },
  description: {
    marginTop: '5px',
  },
})

function ListItem({ item, onRemove, onSave }) {
  const classes = useStyles()
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
    <Card
      className={classes.card}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <CardContent className={classes.cardContent}>
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
            <p className={classes.task}>Task: {item.title}</p>
            <p className={classes.description}>
              Description: {item.description}
            </p>
            <button onClick={handleEditClick}>Edit ✏️</button>
            <button onClick={handleRemoveClick}>Complete ✅</button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ListItem
