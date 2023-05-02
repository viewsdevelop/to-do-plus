import React from 'react'

function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <div>Title: {item.title}</div>
          <div>Description: {item.description}</div>
          <div>Completed: {item.completed ? '✅' : '❌'}</div>
        </li>
      ))}
    </ul>
  )
}

export default List
