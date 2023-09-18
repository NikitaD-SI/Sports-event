import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styles from '../assets/css/Login.module.css';
import Navbar from "./Appnavbar";
import {
  TextField,
  Button,
  Card,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from "axios";
import { toast } from 'react-toastify';


function Login() {
  const initialValues = {
    email: "",
    password: ""
  };

  const [values, setValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4000/login`, values)
        .then((res) => {
          if (res.data) {

            const response = res.data;
            if (response.data === 'User Not Found') {
              toast.error(`User not found`);
              return;
            }
            else if (response.data === "Password Incorrect") {
              toast.error(`Password Incorrect`);
              return;
            }
            else {
              setValues(initialValues);
              toast.success(`Welcome to Sports Events !!!`);
              window.localStorage.setItem("auth", response.data.jsontoken);
              window.localStorage.setItem("user", JSON.stringify(response.data.user));
              if (response.data.user.role === 'Admin') {
                navigate('/home');
              }
              else {
                navigate('/employee-events');
              }
            }

          }
        })
    }
    catch (err) {
      console.log("Error while registration", err);

    }

  };

  return (
    <>
      <Navbar />
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        <Card className={styles.container}>
          <h2 style={{ textAlign: "center", fontSize: "35px" }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              type="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={{ width: "100%", marginBottom: "1rem" }}
              required
            />

            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              placeholder="Create a password"
              style={{ width: "100%", marginBottom: "1rem" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              required
            />

            <Button type="submit" color="secondary" variant="contained" style={{ width: "100%", background: "linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%)", padding: "10px 0" }}>
              Login In
            </Button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <span>If u donn't have an account?</span><br />
            <Link to="/registration">Register</Link>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Login;
