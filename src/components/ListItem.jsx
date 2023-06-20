import React, { useState } from 'react'

// Material UI / Styles
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import useStyles from '../styles/ListItemStyles'

function ListItem({ item, onRemove, onSave }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)
  const [titleError, setTitleError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)

  const classes = useStyles()

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
    setTitleError(false)
    setDescriptionError(false)
  }

  const handleSaveClick = () => {
    if (!title) {
      setTitleError(true)
    }
    if (!description) {
      setDescriptionError(true)
    }
    if (title && description) {
      const updatedItem = {
        ...item,
        title,
        description,
      }
      onSave(updatedItem)
      setIsEditing(false)
      setTitleError(false)
      setDescriptionError(false)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleSaveClick()
  }

  return (
    <div className={classes.container}>
      <Card
        className={classes.card}
        style={{ display: isVisible ? 'block' : 'none' }}
      >
        <CardContent className={classes.cardContent}>
          {isEditing ? (
            <form onSubmit={handleFormSubmit}>
              <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
                placeholder="Enter a title"
                error={titleError}
                helperText={titleError ? 'Title is required' : ''}
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
                error={descriptionError}
                helperText={descriptionError ? 'Description is required' : ''}
              />
              <div className={classes.buttonContainer}>
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
              </div>
            </form>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  className={classes.task}
                >
                  {item.title}
                </Typography>
                <Typography variant="body1" className={classes.description}>
                  {item.description}
                </Typography>
              </div>
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleRemoveClick}
                >
                  Complete
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ListItem
