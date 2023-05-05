import React from 'react'
import ListItem from './ListItem'

function List({ items, handleRemove }) {
  return (
    <ul>
      {items.map((item) => (
        <ListItem key={item.id} item={item} onRemove={handleRemove} />
      ))}
    </ul>
  )
}

export default List
