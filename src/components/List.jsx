import React from 'react'
import ListItem from './ListItem'

function List({ items, handleRemove, handleSave }) {
  return (
    <ul>
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onRemove={handleRemove}
          onSave={handleSave}
        />
      ))}
    </ul>
  )
}

export default List
