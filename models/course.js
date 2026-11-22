const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true
    },
    courseCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    description: {
      type: String,
      default: ""
    },
    credits: {
      type: Number,
      required: true,
      min: 1
    },
    faculty: {
      type: String,
      default: "Not Assigned"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
