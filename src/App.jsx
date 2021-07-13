import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { object, string } from "yup";
import { TextField, Button, Box } from "@material-ui/core";

export default function App() {
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: object({
      login: string().email("имейл не имейл"),
      password: string().required(),
    }),
  });

  return (
    <Box
      m={2}
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeItems: "center",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <div style={{ width: 200, display: "flex", flexDirection: "column" }}>
          <TextField
            required
            label="Login"
            name="login"
            value={formik.values.login}
            onChange={formik.handleChange}
            sx={{ m: 1 }}
            error={!!formik.errors.login}
            helperText={formik.errors.login}
          />
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            sx={{ m: 1 }}
            error={!!formik.errors.login}
            helperText={formik.errors.password}
          />
          <Button variant="contained" type="submit" sx={{ m: 1 }}>
            login
          </Button>
        </div>
      </form>
    </Box>
  );
}
