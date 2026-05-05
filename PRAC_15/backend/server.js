const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// API
app.get('/api/products', (req, res) => {
  const filePath = path.join(__dirname, 'products.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log("FILE ERROR:", err);
      return res.send("Error reading file");
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});