import React, { useState } from 'react';
import {
  TextField, Button, Typography, Container, Box,
  Link, Snackbar, Alert, FormControlLabel,
  Checkbox, InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Employee() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '',
    age: '', location: '', linkedin: '', bio: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp
      ? 'http://localhost:5000/api/seeker/register'
      : 'http://localhost:5000/api/seeker/login';

    try {
      await axios.post(endpoint, formData);
      localStorage.setItem("email", formData.email);
      setSnackbar({ open: true, message: 'Success!', severity: 'success' });
      setTimeout(() => navigate('/job'), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'An error occurred',
        severity: 'error'
      });
    }
  };

  const toggleMode = () => {
    setIsSignUp(prev => !prev);
    setFormData({
      name: '', email: '', password: '',
      age: '', location: '', linkedin: '', bio: ''
    });
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#e3f2fd] p-4">
      <Box className="flex flex-col md:flex-row max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Left Image and Quote */}
        <Box className="md:w-1/2 bg-cover bg-center p-8 flex flex-col justify-between"
             style={{ backgroundImage: `url("https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1050&q=80")` }}>
          <Typography variant="h5" className="text-white font-bold">
            "Empowering your career, one job at a time."
          </Typography>
          <Typography className="text-white mt-4 text-sm">
            Start your journey with us and land your dream job today.
          </Typography>
        </Box>

        {/* Form Section */}
        <Box className="md:w-1/2 p-8">
          <Typography variant="h5" className="font-bold text-gray-800 mb-1">
            {isSignUp ? 'Job Seeker Registration' : 'Job Seeker Login'}
          </Typography>
          <Typography variant="body2" className="text-gray-500 mb-4">
            {isSignUp ? 'Create your job seeker account' : 'Welcome back! Please sign in.'}
          </Typography>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <TextField fullWidth margin="normal" name="name" label="Full Name" value={formData.name} onChange={handleChange} required />
                <TextField fullWidth margin="normal" name="age" label="Age" type="number" value={formData.age} onChange={handleChange} required />
                <TextField fullWidth margin="normal" name="location" label="Location" value={formData.location} onChange={handleChange} required />
                <TextField fullWidth margin="normal" name="linkedin" label="LinkedIn Profile URL" value={formData.linkedin} onChange={handleChange} />
                <TextField fullWidth margin="normal" name="bio" label="Short Bio" multiline rows={3} value={formData.bio} onChange={handleChange} />
              </>
            )}

            <TextField
              fullWidth margin="normal" name="email" label="Email" type="email" value={formData.email} onChange={handleChange} required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth margin="normal" name="password" label="Password" type={showPassword ? 'text' : 'password'} value={formData.password}
              onChange={handleChange} required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {!isSignUp && (
              <Box className="flex justify-between items-center my-1">
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Link href="#" variant="body2">Forgot password?</Link>
              </Box>
            )}

            <Button
              type="submit"
              fullWidth variant="contained"
              sx={{
                mt: 2, mb: 2, py: 1.5, fontWeight: 'bold',
                background: 'linear-gradient(to right, #1976d2, #0d47a1)',
                '&:hover': { background: 'linear-gradient(to right, #1565c0, #0b3c91)' }
              }}
            >
              {isSignUp ? 'Register Account' : 'Sign In'}
            </Button>
          </form>

          <Typography variant="body2">
            {isSignUp ? 'Already have an account?' : 'New to this portal?'}{' '}
            <Link component="button" onClick={toggleMode} sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              {isSignUp ? 'Sign In' : 'Register here'}
            </Link>
          </Typography>

          <Link component="button" onClick={() => navigate('/')} variant="body2" sx={{ display: 'block', mt: 2, color: 'gray' }}>
            ← Back to Home
          </Link>
        </Box>
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
          sx={{ width: '100%' }} elevation={6} variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
