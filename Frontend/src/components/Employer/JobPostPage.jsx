import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full Time',
    salary: '',
    description: '',
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', formData); // POST to backend
      setSnackbar({ open: true, message: 'Job posted successfully!', severity: 'success' });

      // Optional: Navigate to job list page
      setTimeout(() => navigate('/job'), 1500);
    } catch (error) {
      console.error('Job post failed:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Failed to post job.',
        severity: 'error',
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Post a New Job
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            margin="normal"
            placeholder="e.g. Frontend Developer"
          />
          <TextField
            fullWidth
            label="Company Name"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            margin="normal"
            placeholder="e.g. Tech Solutions Ltd"
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            margin="normal"
            placeholder="e.g. Mumbai, India"
          />
          <TextField
            fullWidth
            select
            label="Job Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="Full Time">Full Time</MenuItem>
            <MenuItem value="Part Time">Part Time</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
            <MenuItem value="Remote">Remote</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Salary (per annum)"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            required
            margin="normal"
            placeholder="e.g. 800000"
          />
          <TextField
            fullWidth
            label="Job Description"
            name="description"
            multiline
            rows={5}
            value={formData.description}
            onChange={handleChange}
            required
            margin="normal"
            placeholder="Describe the role, requirements, responsibilities..."
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.5 }}
          >
            Post Job
          </Button>
        </Box>
      </Paper>

      {/* Snackbar for feedback */}
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
};

export default JobPostForm;
