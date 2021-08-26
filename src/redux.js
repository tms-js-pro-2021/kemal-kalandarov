import { createSlice, configureStore } from '@reduxjs/toolkit';

export const applicationSlice = createSlice({
  name: 'todo-app',
  initialState: {
    isInitialized: false,
    todos: {
      allIds: [],
      byId: {},
    },
  },
  reducers: {
    initialize: state => ({ ...state, isInitialized: true }),
    setTodos: (state, action) => ({
      ...state,
      todos: {
        byId: action.payload.reduce((allTodos, todo) => {
          const previousTodos = allTodos;
          const currentKey = todo.id;
          const currentValue = todo;
          const newAllTodos = { ...previousTodos, [currentKey]: currentValue };
          console.log(newAllTodos);
          return newAllTodos;
        }, {}),
        allIds: action.payload.map(todo => todo.id),
      },
    }),
    setTodo: (state, { payload }) => ({
      ...state,
      todos: {
        ...state.todos,
        byId: {
          ...state.todos.byId,
          [payload.id]: {
            ...state.todos.byId[payload.id],
            ...payload,
          },
        },
      },
    }),
  },
});

export const store = configureStore({
  reducer: applicationSlice.reducer,
});

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()));
