const cors = require("cors");
const express = require("express");
const assignmentRoutes = require("./routes/assignmentRoutes");
const path = require("path");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://sql-studio-hrvt.onrender.com"],
    Credential: true,
  }),
);





app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/assignments", assignmentRoutes);

app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
