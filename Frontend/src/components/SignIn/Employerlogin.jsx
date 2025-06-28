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
  const [form, setForm] = useState({ companyName: '', email: '', password: '' });
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setForm({ companyName: '', email: '', password: '' });
    setIsSignUp(!isSignUp);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isSignUp
      ? 'http://localhost:5000/api/employer/register'
      : 'http://localhost:5000/api/employer/login';

    const payload = isSignUp
      ? { username: form.companyName, email: form.email, password: form.password, company: form.companyName }
      : { email: form.email, password: form.password };

    try {
      const res = await axios.post(endpoint, payload);
      localStorage.setItem('employer', JSON.stringify(res.data));
      setSnackMessage(`${isSignUp ? 'Registered' : 'Logged in'} successfully`);
      setSnackSeverity('success');
      setSnackOpen(true);
      setTimeout(() => navigate('/d'), 1000);
    } catch (err) {
      const errMsg = err.response?.data?.error || err.response?.data?.message || 'Something went wrong';
      setSnackMessage(errMsg);
      setSnackSeverity('error');
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#e3f2fd', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Paper elevation={6} sx={{ display: 'flex', borderRadius: 4, overflow: 'hidden' }}>
          {/* Left: Form */}
          <Box sx={{ flex: 1, p: 6, bgcolor: 'white' }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#0d47a1', fontWeight: 'bold' }}>
              {isSignUp ? 'Employer Sign Up' : 'Employer Sign In'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
              {isSignUp
                ? 'Create your employer account to post jobs and grow your company.'
                : 'Welcome back! Log in to manage your listings.'}
            </Typography>

            <Divider sx={{ mb: 4, backgroundColor: '#90caf9' }} />

            <Box component="form" onSubmit={handleSubmit}>
              {isSignUp && (
                <TextField
                  fullWidth name="companyName" label="Company Name"
                  variant="outlined" margin="normal"
                  value={form.companyName} onChange={handleChange} required
                />
              )}
              <TextField
                fullWidth name="email" label="Email" variant="outlined"
                margin="normal" value={form.email} onChange={handleChange} required
              />
              <TextField
                fullWidth type="password" name="password" label="Password"
                variant="outlined" margin="normal" value={form.password}
                onChange={handleChange} required
              />

              <Button
                type="submit" fullWidth variant="contained"
                disabled={loading}
                sx={{
                  mt: 4, py: 1.5, fontWeight: 'bold', fontSize: '1rem',
                  background: 'linear-gradient(to right, #1e88e5, #42a5f5)',
                  '&:hover': { background: 'linear-gradient(to right, #1565c0, #1e88e5)' },
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} />
                          : isSignUp ? 'Register' : 'Login'}
              </Button>
            </Box>

            <Typography align="center" sx={{ mt: 3, color: '#666' }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <Button onClick={toggleMode} sx={{ textTransform: 'none', fontWeight: 'bold', color: '#1e88e5' }}>
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </Button>
            </Typography>
          </Box>

          {/* Right: Tech-themed Image + Quote */}
          <Box sx={{
            flex: 1,
            display: { xs: 'none', md: 'block' },
            backgroundImage: 'url("https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1050&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}>
            <Typography
              variant="h6"
              sx={{
                position: 'absolute', bottom: 32, left: 32,
                color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)',
                p: 2, borderRadius: 2, fontStyle: 'italic',
                maxWidth: '80%',
              }}
            >
              "Great vision without great people is irrelevant." – Jim Collins
            </Typography>
          </Box>
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
            variant="filled"
          >
            {snackMessage}
          </MuiAlert>
        </Snackbar>
      </Container>
    </Box>
  );
}
