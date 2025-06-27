import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Card, CardContent, Grid, Chip,
  IconButton, Avatar, CssBaseline, createTheme, ThemeProvider, CircularProgress,
  Tooltip, Fade, Menu, MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 50 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

const EmployerDashboard = () => {
  const [stats, setStats] = useState({ activeJobs: 0, totalApplications: 0, interviews: 0, hires: 0 });
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [employerProfile, setEmployerProfile] = useState({ name: '', company: '' });
  const navigate = useNavigate();

  const theme = createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [jobsRes, appsRes, interviewsRes, hiresRes, postingsRes, profileRes] = await Promise.all([
          axios.get('/api/jobs/active'),
          axios.get('/api/applications/count'),
          axios.get('/api/interviews/count'),
          axios.get('/api/hires/month'),
          axios.get('/api/jobs/myjobs'),
          axios.get('/api/employer/profile')
        ]);

        setStats({
          activeJobs: jobsRes.data.count ?? 0,
          totalApplications: appsRes.data.count ?? 0,
          interviews: interviewsRes.data.count ?? 0,
          hires: hiresRes.data.count ?? 0
        });

        setJobPostings(Array.isArray(postingsRes.data) ? postingsRes.data : []);
        setEmployerProfile({
          name: profileRes.data.name || 'John Doe',
          company: profileRes.data.company || 'Company Name'
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setJobPostings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleEditProfile = () => {
    handleMenuClose();
    navigate('/edit-profile');
  };
  const handleLogout = () => {
    handleMenuClose();
    navigate('/');
  };

  const StatCard = ({ title, value, color }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} whileHover={{ scale: 1.05 }}>
      <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h4" color={color} fontWeight="bold">{value}</Typography>
        </CardContent>
      </Card>
    </motion.div>
  );

  const HoverButton = ({ children, tooltip, ...props }) => (
    <Tooltip title={tooltip || ''} arrow TransitionComponent={Fade} TransitionProps={{ timeout: 500 }}>
      <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'inline-block' }}>
        <Button
          {...props}
          sx={{
            ...props.sx,
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: 4,
              backgroundColor: props.color ? `${props.color}.dark` : 'grey.300',
              color: props.color ? 'white' : 'black'
            }
          }}
        >
          {children}
        </Button>
      </motion.div>
    </Tooltip>
  );

  const PostingsDisplay = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <CircularProgress size={50} />
          </motion.div>
        </Box>
      );
    }

    if (!Array.isArray(jobPostings) || jobPostings.length === 0) {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <Box
              sx={{ maxWidth: 300, mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary">
              No job postings yet!
            </Typography>
            <HoverButton
              variant="outlined"
              color="primary"
              tooltip="Start by creating your first job"
              onClick={() => navigate('/job-post')}
              sx={{ mt: 2 }}
            >
              + Create your first job
            </HoverButton>
          </Box>
        </motion.div>
      );
    }

    return (
      <AnimatePresence>
        {jobPostings.map((job, index) => (
          <motion.div
            key={job._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card sx={{ mb: 3, p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold">{job.title}</Typography>
              <Typography variant="body2">{job.company} - {job.location}</Typography>
              <Typography variant="body1" mt={1}>{job.description}</Typography>
              <Typography variant="subtitle2" color="green" mt={1}>${job.salaryRange}</Typography>
              <Chip label={`${job.applicationsCount} applications`} sx={{ mt: 1 }} />
              <Box mt={2}>
                <HoverButton variant="outlined" sx={{ mr: 1 }} tooltip="Edit this job">Edit</HoverButton>
                <HoverButton variant="outlined" color="error" tooltip="Delete this job">Delete</HoverButton>
              </Box>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
        <Box>
          <AppBar position="static" color="default">
            <Toolbar>
              <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={() => setProfileOpen(!profileOpen)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>Employer Dashboard</Typography>
              <HoverButton color="inherit" tooltip="View Candidates" onClick={() => navigate('/candidates')}>View Candidates</HoverButton>
              <HoverButton color="inherit" tooltip="Logout" onClick={handleLogout}>Logout</HoverButton>
              <IconButton onClick={toggleDarkMode} color="inherit" sx={{ ml: 1 }}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* 🎯 Hero Image */}
          <Box
            sx={{
              width: '100%',
              maxHeight: 220,
              objectFit: 'contain',
              mb: 4,
              borderRadius: 3,
              boxShadow: 2
            }}
          />

          {/* 🧑‍💼 Profile Card on LEFT */}
          <AnimatePresence>
  {profileOpen && (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 72,
          right: 16, // ⬅ switched from right to left
          width: 280,
          height: 380, // ⬆ slightly taller
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
          bgcolor: 'background.paper',
          zIndex: 10,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
          <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80, fontSize: 32 }}>
            {employerProfile.name ? employerProfile.name[0] : 'U'}
          </Avatar>

          <Typography variant="h6" fontWeight="bold" mt={2}>
            {employerProfile.name || 'Your Name'}
          </Typography>

          <Typography variant="body1" color="text.secondary" fontWeight="bold">
            {employerProfile.company || 'Your Company'}
          </Typography>

          {/* Buttons below profile info */}
          <Box mt={3} display="flex" flexDirection="column" gap={1} width="100%">
            <motion.div whileHover={{ scale: 1.03 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleEditProfile}
                sx={{ borderRadius: 2 }}
              >
                Edit Profile
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={handleLogout}
                sx={{ borderRadius: 2 }}
              >
                Logout
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </motion.div>
  )}
</AnimatePresence>


          {/* 📊 Dashboard Stats and Jobs */}
          <Box sx={{ p: 4, backgroundColor: darkMode ? 'background.default' : '#f9fafb', minHeight: '100vh' }}>
            <Grid container spacing={3} mb={4}>
              <Grid item xs={12} sm={6} md={3}><StatCard title="Active Jobs" value={stats.activeJobs} color="primary" /></Grid>
              <Grid item xs={12} sm={6} md={3}><StatCard title="Total Applications" value={stats.totalApplications} color="secondary" /></Grid>
              <Grid item xs={12} sm={6} md={3}><StatCard title="Interviews" value={stats.interviews} color="error" /></Grid>
              <Grid item xs={12} sm={6} md={3}><StatCard title="Hires This Month" value={stats.hires} color="success" /></Grid>
            </Grid>

            <HoverButton
              variant="contained"
              color="success"
              sx={{ mb: 3 }}
              tooltip="Create a new job posting"
              onClick={() => navigate('/job-post')}
            >
              + Post New Job
            </HoverButton>

            <Typography variant="h5" mb={2} fontWeight="bold" display="flex" alignItems="center" gap={1}>
              <Box
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/6194/6194029.png"
                sx={{ width: 32, height: 32 }}
                alt="Job Icon"
              />
              Your Job Postings
            </Typography>

            <PostingsDisplay />
          </Box>
        </Box>
      </motion.div>
    </ThemeProvider>
  );
};

export default EmployerDashboard;