const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// serve frontend
app.use(express.static(__dirname));

// API
app.get('/api/employees', (req, res) => {
  fs.readFile('employees.json', 'utf8', (err, data) => {
    if (err) return res.send("Error");
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});