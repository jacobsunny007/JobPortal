import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Link,
  Snackbar,
  Alert,
  Divider
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Employee() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignUp
      ? 'http://localhost:5000/api/seeker/register'
      : 'http://localhost:5000/api/seeker/login';

    try {
      const res = await axios.post(endpoint, formData);
      setSnackbar({ open: true, message: 'Success!', severity: 'success' });

      setTimeout(() => {
        navigate('/job');
      }, 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'An error occurred',
        severity: 'error'
      });
    }
  };

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 3,
          bgcolor: '#e3f2fd',
          background: 'linear-gradient(to bottom right, #ffffff, #e3f2fd)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1565c0' }}
        >
          {isSignUp ? 'Job Seeker Sign Up' : 'Job Seeker Sign In'}
        </Typography>

        <Divider sx={{ width: '100%', my: 2, backgroundColor: '#64b5f6' }} />

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          {isSignUp && (
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#43a047',
              '&:hover': {
                backgroundColor: '#2e7d32',
              },
              fontWeight: 'bold',
              py: 1.3,
              fontSize: '1rem',
            }}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ color: '#2e7d32' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Link
            component="button"
            variant="body2"
            onClick={toggleMode}
            sx={{
              fontWeight: 'bold',
              color: '#1b5e20',
              '&:hover': {
                color: '#0d4a1a',
              },
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Link>
        </Typography>
      </Box>

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
