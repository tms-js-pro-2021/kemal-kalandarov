import React, { useEffect } from 'react';
import { useTodoContext } from '../TodoContext';
import TodoItem from '../TodoItem';

export default function TodoList() {
  const { todos, isLoading, loadTodos } = useTodoContext();

  useEffect(() => {
    loadTodos();
  }, []);

  const isEmpty = todos.length === 0;
  // TODO: при ошибке рендерятся 10 туду айтемов без данных
  return (
    <ul>
      {(isEmpty ? [...Array(10)] : todos).map((todo = {}, i) => (
        <TodoItem key={todo.id || i} {...{ isLoading, todo }} />
      ))}
    </ul>
  );
}
