import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Link,
  Snackbar,
  Alert
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

    // ✅ Fixed: Use backend port 5000
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
          borderRadius: 2,
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          {isSignUp ? 'Job Seeker Sign Up' : 'Job Seeker Sign In'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            sx={{ mt: 3, mb: 2 }}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </Box>
        <Typography variant="body2">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Link component="button" variant="body2" onClick={toggleMode}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Link>
        </Typography>
      </Box>

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
