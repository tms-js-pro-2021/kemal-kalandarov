import React, { createContext, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import api from '../../api';
import useErrorHandler from '../../hooks/useErrorHandler';

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

export default ({ children }) => {
  // const { handleError } = useErrorHandler();

  // const { isLoading, data: todos = [] } = useQuery(
  //   'todos',
  //   () => api.get('/todos').then(res => res.data),
  //   { onError: handleError }
  // );

  return (
    <TodoContext.Provider value={{ isLoading: false }}>
      {children}
    </TodoContext.Provider>
  );
};
