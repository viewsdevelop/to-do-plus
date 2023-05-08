import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(1),
  },
}))

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
    <div className={classes.root}>
      <h2>Add New Task</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          label="Task"
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
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </form>
    </div>
  )
}

export default AddItemForm
