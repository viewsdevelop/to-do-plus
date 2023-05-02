import React from 'react'

function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <div>
          <p>Title: {item.title}</p>
          <p>Description: {item.description}</p>
          <p>Completed: {item.completed ? '✅' : '❌'}</p>
        </div>
      ))}
    </ul>
  )
}

export default List
