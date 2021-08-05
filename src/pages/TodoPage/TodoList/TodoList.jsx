import React from 'react';
import TodoItem from '../TodoItem';

export default function TodoList({
  todos,
  isLoading,
  handleToggleFactory,
  handleDeleteFactory,
}) {
  const isEmpty = todos.length === 0;
  return (
    <ul>
      {(isEmpty ? [...Array(10)] : todos).map((todo = {}, i) => (
        <TodoItem
          {...{ isLoading, todo }}
          handleToggle={handleToggleFactory(todo.id, todo.done)}
          handleDelete={handleDeleteFactory(todo.id)}
        />
      ))}
    </ul>
  );
}
