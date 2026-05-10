const express = require("express");

const app = express();
app.use(express.json());

// Dummy database
let students = [
  { id: 1, name: "Ashutosh", age: 20 },
  { id: 2, name: "Rahul", age: 21 }
];

// Root route
app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 CI/CD Backend is Live</h1>
    <p>Welcome to Student API</p>
    <ul>
      <li>GET /students</li>
      <li>POST /students</li>
      <li>PUT /students/:id</li>
      <li>DELETE /students/:id</li>
    </ul>
  `);
});

// GET all students
app.get("/students", (req, res) => {
  res.json({
    success: true,
    data: students
  });
});

// POST
app.post("/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age
  };
  students.push(newStudent);

  res.json({
    success: true,
    message: "Student added",
    data: newStudent
  });
});

// PUT
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  students = students.map(s =>
    s.id === id ? { ...s, ...req.body } : s
  );

  res.json({
    success: true,
    message: "Student updated"
  });
});

// DELETE
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  students = students.filter(s => s.id !== id);

  res.json({
    success: true,
    message: "Student deleted"
  });
});

// PORT
const PORT = process.env.PORT || 3000;

// ✅ IMPORTANT CHANGE (for Jest testing)
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// ✅ Export app for testing
module.exports = app;