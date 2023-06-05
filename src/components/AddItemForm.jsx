import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import CreateIcon from '@material-ui/icons/Create'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2),
    backgroundColor: '#fef5ab',
    padding: theme.spacing(2),
    borderRadius: '10px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    width: '250px',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '30px',
      height: '30px',
      backgroundColor: '#FFEE58',
      transform: 'translate(50%, -50%) rotate(45deg)',
      borderTopLeftRadius: '5px',
      boxShadow: '-2px 2px 5px rgba(0, 0, 0, 0.3)',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  pencilIcon: {
    marginRight: theme.spacing(1),
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
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AddItemForm
