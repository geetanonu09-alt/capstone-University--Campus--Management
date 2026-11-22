const Course = require ("../models/course");
// Add Course
exports.addCourse = async (req, res) => {
  try {
    const { courseName, courseCode, description, credits, faculty } = req.body;

    if (!courseName || !courseCode || !credits) {
      return res.status(400).json({
        success: false,
        message: "Course name, code and credits are required"
      });
    }

    const existingCourse = await Course.findOne({ courseCode });

    if (existingCourse) {
      return res.status(409).json({
        success: false,
        message: "Course code already exists"
      });
    }

    const course = await Course.create({
      courseName,
      courseCode,
      description,
      credits,
      faculty
    });

    res.status(201).json({
      success: true,
      message: "Course added successfully",
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// View All Courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      success: true,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
