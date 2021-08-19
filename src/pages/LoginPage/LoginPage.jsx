import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
// import styled, { css } from 'styled-components';
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import api, { setupApi } from '../../api';
// import { createRef } from 'react';
// import MyButton from './MyButton';
// import './LoginPage.css';

// const LoginPageWrapper = styled(Box)`
//   background: blue;
//   @media (max-width: 600px) {
//     background: green;
//   }
//   ${({ theme }) => css`
//     color: ${theme.palette.primary.main};
//   `}
// `;

// function LoginPage2(props) {
//   const passwordRef = useRef();

//   return <input ref={passwordRef} />;
// }

function LoginPage() {
  const passwordRef = useRef();
  // console.log(props.history.push);
  const [isNewUser, setIsNewUser] = useState(false);

  const { replace } = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      // return crackPassword();
      // eslint-disable-next-line no-alert
      // alert(JSON.stringify(values, null, 2));
      const endpoint = isNewUser ? 'signup' : 'signin';
      api
        .post(`/users/${endpoint}`, values)
        .then(({ data: { token } = {} }) => {
          window.sessionStorage.token = token;
          setupApi(token);
          replace('/');
        })
        .catch(err => {
          alert(err.message);
        });

      formik.resetForm();
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: object({
      email: string().email('имейл не имейл'),
      password: string().required(),
    }),
  });

  useEffect(() => {
    console.log(passwordRef.current);

    return () => {
      console.log('unmount');
    };
  }, []);

  return (
    <Box
      // className="class1"
      style={{
        marginTop: '8px',
        height: '100vh',
        width: '100vw',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <div style={{ width: 200, display: 'flex', flexDirection: 'column' }}>
          <TextField
            size="small"
            required
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ my: 1 }}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            required
            size="small"
            label="Password"
            type="password"
            name="password"
            sx={{ my: 1 }}
            inputProps={{ ref: passwordRef }}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isNewUser}
                onChange={() => setIsNewUser(prev => !prev)}
              />
            }
            label="New user"
          />
          <Button variant="contained" type="submit" sx={{ my: 1 }}>
            {isNewUser ? 'register' : 'login'}
          </Button>
        </div>
      </form>
      {/* <MyButton
        aa={{}}
        email={formik.values.email}
        onClick={() => push('/')}
        count={123}
      >
        my button
      </MyButton> */}
    </Box>
  );
}

export default LoginPage;
