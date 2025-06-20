const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    title:String,
    company:String,
    location:String,
    type: String,
    salary: String  ,
    description: String,
    postedAt: { type: Date, default: Date.now }

});

const jobModel = mongoose.model("job",jobSchema);

module.exports = jobModel;