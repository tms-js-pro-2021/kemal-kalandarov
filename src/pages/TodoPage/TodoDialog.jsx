import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { object, string } from 'yup';

import api from '../../api';
import useErrorHandler from '../../hooks/useErrorHandler';
import { useTodoContext } from './TodoContext';

export default function TodoDialog({ todo, close, ...props }) {
  const { loadTodos, setTodos } = useTodoContext();
  const { handleError } = useErrorHandler();

  const formik = useFormik({
    initialValues: {
      description: todo?.description || '',
    },
    onSubmit: values => {
      if (todo) {
        // edit
        api
          .put(`/todos/${todo.id}`, values)
          .catch(handleError)
          .finally(() => loadTodos(false));

        setTodos(currentTodos =>
          currentTodos.map(currentTodo => {
            if (currentTodo.id === todo.id) {
              return { ...currentTodo, ...values };
            }
            return currentTodo;
          })
        );
      } else {
        api
          .post(`/todos`, values)
          .catch(handleError)
          .finally(() => loadTodos(false));

        const newTodo = {
          ...values,
          id: Date.now(),
          done: false,
          liked: false,
        };
        setTodos(currentTodos => [newTodo, ...currentTodos]);
      }

      formik.resetForm();
      close();
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: object({
      description: string().required(),
    }),
  });

  return (
    <Dialog onClose={close} {...props}>
      <DialogTitle>{`${todo ? 'Edit' : 'Add'} Todo`}</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 2 }}
          size="small"
          required
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && !!formik.errors.description}
          helperText={formik.touched.description && formik.errors.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>cancel</Button>
        <Button variant="contained" onClick={formik.handleSubmit}>
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
