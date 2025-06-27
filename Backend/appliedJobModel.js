const mongoose = require("mongoose");

const appliedJobSchema = new mongoose.Schema({
  userEmail: String,
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job"
  }
});

module.exports = mongoose.model("AppliedJob", appliedJobSchema);