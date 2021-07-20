import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
// import styled, { css } from 'styled-components';
import { TextField, Button, Box } from '@material-ui/core';
import MyButton from './MyButton';
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

function LoginPage() {
  // console.log(props.history.push);
  const { push } = useHistory();
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: values => {
      // eslint-disable-next-line no-alert
      // alert(JSON.stringify(values, null, 2));

      fetch('https://uoxfu.sse.codesandbox.io/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(res => {
        if (res.status === 200) push('/');
        else res.text().then(errorString => alert(errorString));
      });

      formik.resetForm();
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: object({
      login: string().email('имейл не имейл'),
      password: string().required(),
    }),
  });

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
            label="Login"
            name="login"
            value={formik.values.login}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ my: 1 }}
            error={formik.touched.login && !!formik.errors.login}
            helperText={formik.touched.login && formik.errors.login}
          />
          <TextField
            required
            size="small"
            label="Password"
            type="password"
            name="password"
            sx={{ my: 1 }}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button variant="contained" type="submit" sx={{ my: 1 }}>
            login
          </Button>
        </div>
      </form>
      <MyButton
        aa={{}}
        login={formik.values.login}
        onClick={() => push('/')}
        count={123}
      >
        my button
      </MyButton>
    </Box>
  );
}

export default LoginPage;
