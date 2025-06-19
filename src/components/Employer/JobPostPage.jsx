import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Paper,
} from '@mui/material';

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full Time',
    salary: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Posted:', formData);
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
    </Container>
  );
};

export default JobPostForm;