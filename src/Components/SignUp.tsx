import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Avatar, TextField, Grid, Button, Link, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useLocation, useNavigate } from "react-router-dom";
import useValidation from "../Hooks/useValidation";

export default function SignUp() {


  const navigate = useNavigate();
  const { eventHandler } = useValidation();


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState({

    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleButton = () => {
    navigate('/')
  }

  const validationHandler = async (e: any, alterName?: any) => {
    const val = e.target.value;
    const id = alterName;
    if (id) {
      let prom = new Promise((resolve) => {
        if (true) {
          resolve(eventHandler(id, val));
        }
      });
      prom.then((res) => setError({ ...error, [e.target.name]: res }));
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', formData, {
        headers: {
          'Content-Type': 'application/json', // Assuming you're sending JSON data
          // Add other headers if needed
        }
      });
      console.log('User signed up:', response.data);
      // Optionally, you can redirect the user after successful sign-up
      alert('User signed up successfully!');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up. Please try again later.'); // Display error message
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formData.firstName}

                error={Boolean(error.firstName)}
                helperText={error.firstName}
                onChange={(e) => {
                  validationHandler(e, "alphabet");
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}

                error={Boolean(error.lastName)}
                helperText={error.lastName}
                onChange={(e) => {
                  validationHandler(e, "alphabet");
                }}
                  />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}

                error={Boolean(error.email)}
                helperText={error.email}
                onChange={(e) => {
                  validationHandler(e, "email");
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}

                error={Boolean(error.password)}
                helperText={error.password}
                onChange={(e) => {
                  validationHandler(e, "password");
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, p: 2 }}
                onClick={handleButton}

              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Container>
  );
}
