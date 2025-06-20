import React, { useState } from 'react'
import { Box, Button, TextField, Typography, Container, Paper, Divider} from '@mui/material'

export default function Employer(){
  const [isSignUp, setIsSignUp] = useState(false)
  const [form, setForm] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const toggleMode = () => {
    setForm({
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setIsSignUp(!isSignUp)
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isSignUp? 'Sign Up Data:' : 'Login Data:', form)
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={5}
        sx={{
          mt: 10,
          p: 5,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #e3f2fd,rgb(122, 95, 95))',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {isSignUp ? 'Employer Sign Up' : 'Employer Sign In'}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box component="form" onSubmit={handleSubmit}>
          {isSignUp && (
            <TextField
              fullWidth
              label="Company Name"
              variant="outlined"
              margin="normal"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              required
            />
          )}

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {isSignUp && (
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: '#1565c0',
              '&:hover': { backgroundColor: '#0d47a1' },
            }}
          >
            {isSignUp ? 'Register' : 'Login'}
          </Button>
        </Box>

        <Typography align="center" sx={{ mt: 3 }}>
          {isSignUp
            ? 'Already have an account?'
            : "Don't have an account?"}{' '}
          <Button onClick={toggleMode} sx={{ textTransform: 'none' }}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
}