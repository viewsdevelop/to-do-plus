import React from 'react'

function ListItem({ item }) {
  return (
    <div>
      <p>Title: {item.title}</p>
      <p>Description: {item.description}</p>
      <p>Completed: {item.completed ? '✅' : '❌'}</p>
    </div>
  )
}

export default ListItem
