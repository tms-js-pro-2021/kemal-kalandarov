import React, { useState } from 'react';
import { Page } from '../../components';
import TodoContext from './TodoContext';
import TodoDialog from './TodoDialog';
import TodoList from './TodoList/TodoList.tsx';
// import TodoList from './TodoList/TodoList';

const ARG_VALUES = {
  A: 'a',
  B: 'b',
  C: 'c',
};
/**
 *
 * @param {'completed'|'b'|'c'} arg1
 * @returns
 */
function func123(arg1) {
  console.log(arg1);
  return 0;
}

export default function TodoPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TodoContext>
      <Page title="Todos">
        <button
          type="button"
          data-testid="add-todo"
          onClick={() => setIsOpen(true)}
        >
          add todo
        </button>
        <TodoList />
        <TodoDialog open={isOpen} close={() => setIsOpen(false)} />
      </Page>
    </TodoContext>
  );
}
