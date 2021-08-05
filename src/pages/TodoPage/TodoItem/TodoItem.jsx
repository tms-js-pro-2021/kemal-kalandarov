import React, { useState } from 'react';
import api from '../../../api';
import ClickBoundary from '../../../components/ClickBoundary';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { useTodoContext } from '../TodoContext';
import TodoDialog from '../TodoDialog';

export default function TodoItem({ todo }) {
  const { handleError } = useErrorHandler();
  const { isLoading, setTodos, loadTodos } = useTodoContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    api
      .put(`/todos/${todo.id}`, { done: !todo.done })
      .catch(handleError)
      .finally(() => loadTodos(false));

    setTodos(currentTodos =>
      currentTodos.map(currentTodo => {
        if (currentTodo.id === todo.id) {
          return { ...currentTodo, done: !todo.done };
        }
        return currentTodo;
      })
    );
  };

  const handleDelete = () => {
    api
      .delete(`/todos/${todo.id}`)
      .catch(handleError)
      .finally(() => loadTodos(false));

    // TODO: fix quick delete errors
    setTodos(currentTodos =>
      currentTodos.filter(currentTodo => todo.id !== currentTodo.id)
    );
  };

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
    <li
      itemType="button"
      onClick={handleToggle}
      style={{
        cursor: 'pointer',
        height: 30,
        margin: 8,
        width: 'calc(100% - 32px)',
        border: '1px solid gray',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        boxShadow: '3px 3px 2px 1px rgba(0, 0, 255, .2)',
      }}
    >
      <input type="checkbox" edge="start" checked={todo.done} tabIndex={-1} />
      <h5>{todo.description}</h5>
      <ClickBoundary>
        <button type="button" onClick={() => setIsOpen(true)}>
          edit
        </button>
        <button type="button" onClick={handleDelete}>
          delete
        </button>
      </ClickBoundary>
      <TodoDialog open={isOpen} todo={todo} close={() => setIsOpen(false)} />
    </li>
  );
}
