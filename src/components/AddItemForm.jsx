import React, { useState } from 'react'

// Material UI / Styles
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CreateIcon from '@material-ui/icons/Create'
import useStyles from '../styles/AddItemFormStyles'

function AddItemForm(props) {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title) {
      setTitleError(true)
    }
    if (!description) {
      setDescriptionError(true)
    }
    if (title && description) {
      props.onAddItem({ title, description })
      setTitle('')
      setDescription('')
      setTitleError(false)
      setDescriptionError(false)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <div className={classes.header}>
          <CreateIcon className={classes.pencilIcon} />
          <Typography variant="h6">Add New Task</Typography>
        </div>

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            label="Title"
            variant="outlined"
            value={title}
            onChange={handleTitleChange}
            error={titleError}
            helperText={titleError ? 'Title is required' : ''}
          />
          {titleError && <div className="error">{titleError}</div>}
          <TextField
            className={classes.textField}
            label="Description"
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
            error={descriptionError}
            helperText={descriptionError ? 'Description is required' : ''}
          />
          {descriptionError && <div className="error">{descriptionError}</div>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AddItemForm
