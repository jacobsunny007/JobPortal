import React, { useState } from 'react';
import {
  Container, Typography, TextField, MenuItem, Button, Box,
  Paper, Snackbar, Alert, LinearProgress
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FloatingIcon = ({ size, top, left, animationDuration }) => (
  <motion.div
    style={{
      position: 'absolute',
      top,
      left,
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(5px)',
    }}
    animate={{ y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: animationDuration, ease: 'easeInOut' }}
  />
);

const WaveBackground = () => (
  <Box
    component="svg"
    viewBox="0 0 1440 320"
    sx={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      zIndex: 0,
      transform: 'translateY(20%)',
    }}
  >
    <motion.path
      fill="#ffffff33"
      fillOpacity="1"
      d="M0,192L40,186.7C80,181,160,171,240,165.3C320,160,400,160,480,176C560,192,640,224,720,234.7C800,245,880,235,960,218.7C1040,203,1120,181,1200,165.3C1280,149,1360,139,1400,133.3L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
      animate={{
        d: [
          "M0,192L40,186.7C80,181,160,171,240,165.3C320,160,400,160,480,176C560,192,640,224,720,234.7C800,245,880,235,960,218.7C1040,203,1120,181,1200,165.3C1280,149,1360,139,1400,133.3L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z",
          "M0,256L48,229.3C96,203,192,149,288,144C384,139,480,181,576,181.3C672,181,768,139,864,112C960,85,1056,75,1152,106.7C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ]
      }}
      transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
    />
  </Box>
);

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full Time',
    salary: '',
    description: '',
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.title) newErrors.title = 'Required';
      if (!formData.company) newErrors.company = 'Required';
      if (!formData.location) newErrors.location = 'Required';
    } else {
      if (!formData.salary) newErrors.salary = 'Required';
      if (!formData.description) newErrors.description = 'Required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      const employer = JSON.parse(localStorage.getItem('employer'));
      const postedBy = employer?.email;

      const payload = { ...formData, postedBy };

      await axios.post('http://localhost:5000/api/jobs', payload);

      setSnackbar({ open: true, message: 'Job posted successfully!', severity: 'success' });

      setTimeout(() => {
        navigate('/d');
      }, 1000);
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: 'Failed to post job.',
        severity: 'error',
      });
    }
  };

  const floatInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        py: 6,
        minHeight: '100vh',
      }}
    >
      <FloatingIcon size={100} top="10%" left="5%" animationDuration={6} />
      <FloatingIcon size={60} top="70%" left="80%" animationDuration={8} />
      <FloatingIcon size={80} top="40%" left="60%" animationDuration={10} />
      <WaveBackground />

      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: '30px',
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            🚀 Post a New Job
          </Typography>

          <LinearProgress variant="determinate" value={(step / 2) * 100} sx={{ mb: 3, borderRadius: 10 }} />

          <Box component="form" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
                  {['title', 'company', 'location', 'type'].map((field, index) => (
                    <motion.div key={field} variants={floatInVariant} initial="hidden" animate="visible" transition={{ duration: 0.4, delay: index * 0.15 }}>
                      {field === 'type' ? (
                        <TextField
                          select
                          fullWidth
                          label="Job Type"
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        >
                          {['Full Time', 'Part Time', 'Internship', 'Remote'].map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        <TextField
                          fullWidth
                          label={field === 'title' ? 'Job Title' : field === 'company' ? 'Company Name' : 'Location'}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          error={!!errors[field]}
                          helperText={errors[field]}
                          required
                          placeholder={
                            field === 'title'
                              ? 'e.g. Frontend Developer'
                              : field === 'company'
                              ? 'e.g. Tech Solutions Ltd'
                              : 'e.g. Mumbai, India'
                          }
                          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                      )}
                    </motion.div>
                  ))}
                  <Button variant="outlined" onClick={handleNext} fullWidth sx={{ borderRadius: 10 }}>
                    Next
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
                  <TextField
                    fullWidth
                    label="Salary (per annum)"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    error={!!errors.salary}
                    helperText={errors.salary}
                    required
                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Job Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                    required
                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                  />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="outlined" onClick={handleBack} sx={{ px: 3, borderRadius: 10 }}>
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        py: 2.5,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(90deg, #007cf0, #00dfd8)',
                        boxShadow: '0 6px 25px rgba(0,223,216,0.4)',
                        color: 'white',
                        textTransform: 'uppercase',
                        borderRadius: 10,
                      }}
                    >
                      Post Job
                    </Button>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Paper>

        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default JobPostForm;