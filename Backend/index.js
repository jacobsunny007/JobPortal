const express = require("express");
const cors = require("cors");
require("./db"); // Connects to MongoDB
const job = require("./model"); // Import job model

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

//  POST: Create a new job
app.post('/api/jobs', async (req, res) => {
  try {
    const newJob = await job.create(req.body);
    res.status(201).json(newJob);
  } catch (error) {
    console.error(" POST error:", error);
    res.status(500).send(error.message);
  }
});

// ✅ GET: Get all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(" GET error:", error);
    res.status(500).send(error.message);
  }
});

// ✅ DELETE: Delete a job by ID
app.delete('/api/jobs/:id', async (req, res) => {
  try {
    await job.findByIdAndDelete(req.params.id);
    res.send("Job deleted successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ✅ PUT: Update a job by ID
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

// Start server
app.listen(port, () => {
  console.log(` Server is running on http://localhost:${port}`);
});