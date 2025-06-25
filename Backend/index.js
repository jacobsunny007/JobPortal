const express = require("express");
const cors = require("cors");
require("./db"); // MongoDB connection
const job = require("./jobmodel"); // Job Schema
const Employer = require("./employermodel"); // Employer Schema
const Seeker = require("./Seeker"); // ✅ Fixed naming here

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Register a new job seeker
app.post('/api/seeker/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Seeker.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already used" });
    }

    const newSeeker = new Seeker({ name, email, password }); // ✅ Correct instance
    await newSeeker.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ✅ Job seeker login
app.post('/api/seeker/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const seeker = await Seeker.findOne({ email }); // ✅ Correct model usage
    if (!seeker || seeker.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ✅ Register a new employer
app.post('/api/employer/register', async (req, res) => {
  const { email, password, company } = req.body;

  try {
    const existing = await Employer.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already used" });
    }

    const employer = new Employer({ company, email, password });
    await employer.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ✅ Employer login
app.post('/api/employer/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const employer = await Employer.findOne({ email });
    if (!employer || employer.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      employer: {
        id: employer._id,
        email: employer.email,
        company: employer.company,
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ✅ Create a new job
app.post('/api/jobs', async (req, res) => {
  try {
    const newJob = await job.create(req.body);
    res.status(201).json(newJob);
  } catch (error) {
    console.error("POST job error:", error);
    res.status(500).send(error.message);
  }
});

// ✅ Get all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("GET jobs error:", error);
    res.status(500).send(error.message);
  }
});

// ✅ Delete job by ID
app.delete('/api/jobs/:id', async (req, res) => {
  try {
    await job.findByIdAndDelete(req.params.id);
    res.send("Job deleted successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ✅ Update job by ID
app.put('/api/jobs/:id', async (req, res) => {
  try {
    const updated = await job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ✅ Default route
app.get('/', (req, res) => {
  res.send("API is running...");
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
