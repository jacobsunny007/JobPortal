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
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Employee() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    location: '',
    linkedin: '',
    bio: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showPassword, setShowPassword] = useState(false);

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

      // ✅ Save email in localStorage after login/register
      localStorage.setItem("email", formData.email);

      setSnackbar({ open: true, message: 'Success!', severity: 'success' });

      setTimeout(() => {
        navigate('/job'); // ✅ Redirect to dashboard
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
    setFormData({
      name: '',
      email: '',
      password: '',
      age: '',
      location: '',
      linkedin: '',
      bio: '',
    });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 10,
          p: 4,
          bgcolor: 'white',
          boxShadow: 3,
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          {isSignUp ? 'Job Seeker Registration' : 'Job Seeker Portal'}
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'gray' }}>
          {isSignUp ? 'Create your job seeker account' : 'Sign In'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <TextField
                fullWidth
                margin="normal"
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                name="age"
                label="Age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                name="linkedin"
                label="LinkedIn Profile URL"
                value={formData.linkedin}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                name="bio"
                label="Short Bio"
                multiline
                rows={3}
                value={formData.bio}
                onChange={handleChange}
              />
            </>
          )}

          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {!isSignUp && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                my: 1,
              }}
            >
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <Link href="#" variant="body2" sx={{ fontWeight: 500 }}>
                Forgot password?
              </Link>
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: '#00966E',
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#007E5E',
              },
            }}
          >
            {isSignUp ? 'Register Account' : 'Sign In'}
          </Button>
        </Box>

        <Typography variant="body2">
          {isSignUp ? 'Already have an account?' : 'New seeker?'}{' '}
          <Link
            component="button"
            onClick={toggleMode}
            sx={{ fontWeight: 'bold', color: '#00966E' }}
          >
            {isSignUp ? 'Sign In' : 'Register here'}
          </Link>
        </Typography>

        <Link
          component="button"
          onClick={() => navigate('/')}
          variant="body2"
          sx={{ display: 'block', mt: 2, color: 'gray' }}
        >
          ← Back to Home
        </Link>
      </Box>

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