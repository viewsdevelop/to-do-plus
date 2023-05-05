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

  const handleSubmit = (e) => {
    e.preventDefault()
    props.onAddItem({ title, description })
    setTitle('')
    setDescription('')
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
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          className={classes.textField}
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Item
        </Button>
      </form>
    </div>
  )
}

export default AddItemForm
