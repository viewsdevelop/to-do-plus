import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
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
  button: {
    margin: '5px',
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
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
              placeholder="Enter a title"
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              placeholder="Enter a description"
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSaveClick}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </form>
        ) : (
          <>
            <p className={classes.task}>Task: {item.title}</p>
            <p className={classes.description}>
              Description: {item.description}
            </p>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleEditClick}
            >
              Edit ✏️
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleRemoveClick}
            >
              Complete ✅
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ListItem
