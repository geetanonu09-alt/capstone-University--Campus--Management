const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/courses", require("./routes/courseroutes"));

app.use("/api/enrollments", require("./routes/enrollmentroutes"));
app.use("/api/attendance", require("./routes/attendanceroutes"));
app.use("/api/announcements", require("./routes/announcementroutes"));
app.use("/api/reports", require("./routes/reportroutes"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "University Campus Management API is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});