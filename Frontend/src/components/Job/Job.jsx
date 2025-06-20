import {
  Button,
  CardContent,
  CardActions,
  Container,
  Grid,
  Typography,
  Box,
  Card,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import { motion } from 'framer-motion';

export default function Job() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

 // const MotionCard = motion.div;

  return (
    
    <Box
  sx={{
    width: '100vw', 
    minHeight: '100vh',
    py: 5,
    backgroundImage: 'linear-gradient(135deg, rgb(62, 91, 103), #203a43, rgb(146, 171, 182))',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  <Container maxWidth="lg">
    <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff' }}>
      Job Listings
    </Typography>

    <Grid container spacing={3} alignItems="stretch" justifyContent="center">
      {jobs.map((job) => (
        <Grid item xs={12} sm={6} md={3} key={job._id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'left' }}>
              <Typography variant="h6" color="primary" gutterBottom>
                {job.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {job.company}
              </Typography>
              <Typography variant="body2" sx={{ color: '#c0c0c0' }}>
                {job.type}
              </Typography>
              <Typography variant="body2" sx={{ my: 1, color: '#c0c0c0' }}>
                {job.location}
              </Typography>
              <Typography variant="body1" sx={{ my: 1 }}>
                {job.salary}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {job.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Posted on: {new Date(job.postedAt).toLocaleDateString()}
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#1565c0',
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#0d47a1',
                  },
                }}
              >
                Apply
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>
  );
}