import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    age: '',
    location: '',
    linkedin: '',
    bio: '',
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/seeker/profile?email=${userEmail}`)
      .then((res) => {
        if (res.data) setProfile(res.data);
      })
      .catch((err) => {
        console.error("Profile fetch failed", err);
        setSnackbar({ open: true, message: 'Failed to load profile', severity: 'error' });
      });
  }, [userEmail]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/seeker/profile', profile);
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });

      // Redirect after a short delay
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      console.error("Update failed", err);
      setSnackbar({ open: true, message: 'Update failed', severity: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d6f0ff] via-[#e9f6ff] to-[#d6f0ff] py-10 px-4 font-sans">
      <Container maxWidth="sm">
        <Box
          sx={{
            p: 5,
            borderRadius: 4,
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: 6,
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={3} color="primary" textAlign="center">
            Edit Profile
          </Typography>

          <form onSubmit={handleUpdate}>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="Full Name"
              value={profile.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              value={profile.email}
              disabled
            />
            <TextField
              fullWidth
              margin="normal"
              name="age"
              label="Age"
              type="number"
              value={profile.age}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="location"
              label="Location"
              value={profile.location}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="linkedin"
              label="LinkedIn Profile"
              value={profile.linkedin}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="bio"
              label="Short Bio"
              multiline
              rows={3}
              value={profile.bio}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                fontWeight: 'bold',
                backgroundColor: '#0070f3',
                '&:hover': {
                  backgroundColor: '#0059c1',
                },
              }}
            >
              Save Changes
            </Button>

            <Button
              variant="text"
              onClick={() => navigate('/profile')}
              sx={{
                mt: 2,
                textTransform: 'none',
                color: '#0070f3',
                fontWeight: 'bold',
              }}
            >
              ← Back to Profile
            </Button>
          </form>
        </Box>
      </Container>

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
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
