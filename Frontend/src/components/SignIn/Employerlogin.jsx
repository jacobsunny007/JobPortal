import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Container,
  Paper, Divider, Snackbar, Alert as MuiAlert, CircularProgress
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Employer() {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');

  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setForm({
      companyName: '',
      email: '',
      password: '',
    });
    setIsSignUp(!isSignUp);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isSignUp
      ? 'http://localhost:5000/api/employer/register'
      : 'http://localhost:5000/api/employer/login';

    const payload = isSignUp
      ? {
          username: form.companyName,
          email: form.email,
          password: form.password,
          company: form.companyName,
        }
      : {
          email: form.email,
          password: form.password,
        };

    try {
      const res = await axios.post(endpoint, payload);
      localStorage.setItem('employer', JSON.stringify(res.data));

      setSnackMessage(`${isSignUp ? 'Registered' : 'Logged in'} successfully`);
      setSnackSeverity('success');
      setSnackOpen(true);

      setTimeout(() => {
        navigate('/d');
      }, 1000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || err.response?.data?.message || 'Something went wrong';
      setSnackMessage(errorMsg);
      setSnackSeverity('error');
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={5}
        sx={{
          mt: 10,
          p: 5,
          borderRadius: 4,
          background: 'linear-gradient(to bottom right, #e3f2fd, #ffffff)',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: '#0d47a1', fontWeight: 'bold' }}
        >
          {isSignUp ? 'Employer Sign Up' : 'Employer Sign In'}
        </Typography>

        <Divider sx={{ my: 2, backgroundColor: '#64b5f6' }} />

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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.2,
              fontWeight: 'bold',
              fontSize: '1rem',
              backgroundColor: '#1e88e5',
              '&:hover': { backgroundColor: '#1565c0' },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: '#fff' }} />
            ) : (
              isSignUp ? 'Register' : 'Login'
            )}
          </Button>
        </Box>

        <Typography align="center" sx={{ mt: 3, color: '#2e7d32' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Button
            onClick={toggleMode}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              color: '#2e7d32',
              '&:hover': { color: '#1b5e20' },
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </Typography>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {snackMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}
