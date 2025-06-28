import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Grid,
  Paper,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', formData);

      setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });

      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Invalid credentials',
        severity: 'error',
      });
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e3f2fd, #fce4ec)',
        padding: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 420,
          backgroundColor: '#ffffff',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Admin Logo or Title */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 4,
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1976d2',
            letterSpacing: 1,
            fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
          }}
        >
          Admin Panel
        </Box>

        <Typography
          variant="h6"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ color: '#333' }}
        >
          Administrator Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Admin Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              }
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.2,
              fontWeight: 'bold',
              fontSize: '1rem',
              background: 'linear-gradient(to right, #1976d2, #2196f3)',
              '&:hover': {
                background: 'linear-gradient(to right, #1565c0, #1e88e5)',
              },
              borderRadius: 2,
            }}
          >
            Login
          </Button>

          <Typography variant="body2" align="center" mt={2} sx={{ color: '#666' }}>
            <Link component="button" underline="hover" color="primary">
              Forgot password?
            </Link>
          </Typography>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
