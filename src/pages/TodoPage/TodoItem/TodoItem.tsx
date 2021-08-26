import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../../api';
import ClickBoundary from '../../../components/ClickBoundary';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { applicationSlice, store } from '../../../redux';
import { useTodoContext } from '../TodoContext';
import TodoDialog from '../TodoDialog';

type TodoItemProps = {
  id: string;
  count?: number;
  children?: React.ReactNode;
};

export interface TodoItemType {
  done: boolean;
  description: string;
}

export const TodoItem2: React.FC<TodoItemProps> = ({ id, count }) => {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    setTodos([
      ...todos,
      { done: false, description: '123123' },
      { description: 'dsvfs', done: true },
    ]);
  }, []);

  return (
    <>
      {id}-{count}
    </>
  );
};

export default function TodoItem({ id }: TodoItemProps) {
  const { handleError } = useErrorHandler();
  const { isLoading, setTodos, loadTodos } = useTodoContext();
  const [isOpen, setIsOpen] = useState(false);

  const todo = useSelector(state => state.todos.byId[id] || {});

  const handleToggle = () => {
    api
      .put(`/todos/${id}`, { done: !todo.done })
      .catch(handleError)
      .finally(() => loadTodos(false));

    store.dispatch(applicationSlice.actions.setTodo({ id, done: !todo.done }));

    // setTodos(currentTodos =>
    //   currentTodos.map(currentTodo => {
    //     if (currentTodo.id === todo.id) {
    //       return { ...currentTodo, done: !todo.done };
    //     }
    //     return currentTodo;
    //   })
    // );
  };

  const handleDelete = (event: React.MouseEvent) => {
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
      <input type="checkbox" checked={todo.done} tabIndex={-1} />
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
