import React from 'react'
import ListItem from './ListItem'

function List({ items, handleRemove }) {
  return (
    <ul>
      {items.map((item, index) => (
        <ListItem key={index} item={item} onRemove={handleRemove} />
      ))}
    </ul>
  )
}

export default List
