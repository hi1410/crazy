const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// API with filtering
app.get('/api/students', (req, res) => {
  fs.readFile('students.json', 'utf8', (err, data) => {
    if (err) return res.send("Error");

    let students = JSON.parse(data);

    // ⭐ FILTER LOGIC
    const course = req.query.course;

    if (course) {
      students = students.filter(s => s.course === course);
    }

    res.json(students);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});