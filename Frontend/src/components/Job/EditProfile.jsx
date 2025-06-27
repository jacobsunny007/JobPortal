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

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    // Fetch profile on mount
    axios.get(`http://localhost:5000/api/seeker/profile?email=${userEmail}`)
      .then((res) => {
        if (res.data) {
          setProfile(res.data);
        }
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
      await axios.put(`http://localhost:5000/api/seeker/profile?email=${userEmail}, profile`);
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (err) {
      console.error("Update failed", err);
      setSnackbar({ open: true, message: 'Update failed', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: '#f0f6ff',
          boxShadow: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Edit Your Profile
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
              backgroundColor: '#0070f3',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#0056c1',
              },
            }}
          >
            Save Changes
          </Button>
        </form>
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
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}