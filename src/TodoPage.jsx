import React, { useEffect, useState } from 'react';
import {
  Alert,
  AppBar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  Toolbar,
  Typography,
  Container,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';

// TODO: styles
// показать тему

export default function TodoPage() {
  const { replace } = useHistory();
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleLogout = () => {
    window.sessionStorage.token = '';
    replace('/login');
  };

  const loadTodos = (isLoadingShown = true) => {
    if (isLoadingShown) setIsLoading(true);
    fetch('https://tms-js-pro-back-end.herokuapp.com/api/todos', {
      method: 'GET',
      headers: {
        Authorization: `Token ${window.sessionStorage.token}`,
      },
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            setTodos(data);
          });
        } else if (res.status === 401) {
          replace('/login');
        } else {
          throw new Error(res.statusText);
        }
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        if (isLoadingShown) setIsLoading(false);
      });
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (!error) return;

    setIsAlertOpen(true);
  }, [error]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" color="inherit" component="div">
            Todos
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
      {error && (
        <Collapse in={isAlertOpen}>
          <Alert
            sx={{ m: 2 }}
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setIsAlertOpen(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        </Collapse>
      )}
      <Container>
        <List>
          {isLoading
            ? [...Array(10)].map((_, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemButton dense sx={{ height: 100, m: 2 }}>
                    <Skeleton width="100%" height="100px" />
                  </ListItemButton>
                </ListItem>
              ))
            : todos.map(todo => {
                const handleToggle = () => {
                  fetch(
                    `https://tms-js-pro-back-end.herokuapp.com/api/todos/${todo.id}`,
                    {
                      method: 'PUT',
                      headers: {
                        Authorization: `Token ${window.sessionStorage.token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ done: !todo.done }),
                    }
                  ).then(() => {
                    loadTodos(false);
                  });
                };

                const handleDelete = () => {
                  fetch(
                    `https://tms-js-pro-back-end.herokuapp.com/api/todos/${todo.id}`,
                    {
                      method: 'DELETE',
                      headers: {
                        Authorization: `Token ${window.sessionStorage.token}`,
                      },
                    }
                  ).then(() => {
                    loadTodos(false);
                  });
                };

                return (
                  <ListItem key={todo.id} disablePadding>
                    <ListItemButton
                      component={Paper}
                      onClick={handleToggle}
                      dense
                      sx={{ height: 100, m: 2 }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={todo.done}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <Typography sx={{ flex: 1 }} variant="h6">
                        {todo.description}
                      </Typography>
                      <IconButton
                        sx={{ mr: 2 }}
                        edge="end"
                        aria-label="comments"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={handleDelete}
                        edge="end"
                        aria-label="comments"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                );
              })}
        </List>
      </Container>
    </Box>
  );
}
