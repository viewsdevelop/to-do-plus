import React from 'react'
import ListItem from './ListItem'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

function List({ items, handleRemove, handleSave }) {
  const classes = useStyles()

  return (
    <>
      <h2>Your List</h2>
      <div className={classes.cardContainer}>
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onRemove={handleRemove}
            onSave={handleSave}
          />
        ))}
      </div>
    </>
  )
}

export default List
