import React from 'react';

export default function TodoItem({
  isLoading,
  todo,
  handleToggle,
  handleDelete,
}) {
  if (isLoading)
    return (
      <li
        style={{
          width: '100%',
          height: '100px',
          background: 'grey',
          margin: 8,
        }}
      />
    );

  return (
    <li>
      <button
        type="button"
        onClick={handleToggle}
        style={{
          height: 100,
          margin: 8,
          width: '100%',
          display: 'flex',
        }}
      >
        <input type="checkbox" edge="start" checked={todo.done} tabIndex={-1} />
        <h5 style={{ flex: 1 }}>{todo.description}</h5>
        <button type="button">edit</button>
        <button type="button" onClick={handleDelete}>
          delete
        </button>
      </button>
    </li>
  );
}
