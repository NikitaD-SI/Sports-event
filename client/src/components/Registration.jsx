import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../assets/css/Registration.module.css";
import Appnavbar from "./Appnavbar";
import {
  TextField,
  Button,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Registration() {
  const initialValues = {
    empid: "",
    username: "",
    email: "",
    role: "Employee",
    password: "",
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
      await axios.post(`http://localhost:4000/create`, values)
        .then((res) => {
          if(res.data){
            setValues(initialValues); 
            toast.success(`Registration Successful !!!`);
            navigate('/login');
          }
        });

    } catch (err) {
      console.log("Error while registration", err);
    }
  };

  return (
    <>
      <Appnavbar />
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card className={styles.container}>
          <h2 style={{ textAlign: "center", fontSize: "35px" }}>Signup</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              name="empid"
              type="number"
              label="Employee Id"
              value={values.empid}
              onChange={handleChange}
              placeholder="Enter Employee Id"
              style={{ width: "100%", marginBottom: "1rem" }}
              required
            />
            <TextField
              name="username"
              type="text"
              label="Name"
              value={values.username}
              onChange={handleChange}
              placeholder="Enter your Name"
              style={{ width: "100%", marginBottom: "1rem" }}
              required
            />
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
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="roles-label">Role</InputLabel>
              <Select
                labelId="roles-label"
                id="demo-simple-select"
                name="role"
                value={values.role}
                label="Role"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1rem" }}
                required
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Employee">Employee</MenuItem>
              </Select>
            </FormControl>

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
              Sign Up
            </Button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Registration;
