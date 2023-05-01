import React from 'react'

function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <>
          <li key={item.id}>Title: {item.title}</li>
          <li key={item.id}>Description: {item.description}</li>
          <li key={item.id}>Completed: {item.completed ? 'Yes' : 'No'}</li>
        </>
      ))}
    </ul>
  )
}

export default List
