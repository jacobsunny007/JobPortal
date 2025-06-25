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

  // Snackbar states
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');

  // Spinner state
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setForm({
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setIsSignUp(!isSignUp);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading

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
        navigate('/job-post');
      }, 1000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || err.response?.data?.message || 'Something went wrong';
      setSnackMessage(errorMsg);
      setSnackSeverity('error');
      setSnackOpen(true);
      console.error("Backend error:", errorMsg);
    } finally {
      setLoading(false); // Hide loading
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
          background: 'linear-gradient(135deg, #e3f2fd, rgb(122, 95, 95))',
          boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#0d47a1' }}>
          {isSignUp ? 'Employer Sign Up' : 'Employer Sign In'}
        </Typography>

        <Divider sx={{ my: 2, backgroundColor: '#1976d2' }} />

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
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.2,
              fontWeight: 'bold',
              fontSize: '1rem',
              backgroundColor: '#1565c0',
              '&:hover': { backgroundColor: '#0d47a1' },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: '#fff' }} />
            ) : (
              isSignUp ? 'Register' : 'Login'
            )}
          </Button>
        </Box>

        <Typography align="center" sx={{ mt: 3 }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Button onClick={toggleMode} sx={{ textTransform: 'none', fontWeight: 'bold' }}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </Typography>
      </Paper>

      {/* ✅ Snackbar (at top center) */}
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
