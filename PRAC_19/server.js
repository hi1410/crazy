// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Schema
const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No: { type: Number, unique: true },
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_marks: Number
});

const Student = mongoose.model('studentmarks', studentSchema);


// ---------------- ROUTES ----------------

// 1. Insert initial data
app.get('/insert', async (req, res) => {
  try {
    await Student.deleteMany(); // reset (optional)

    const data = [
      { Name: "Alice", Roll_No: 1, WAD_Marks: 26, CC_Marks: 30, DSBDA_Marks: 35, CNS_Marks: 28, AI_marks: 32 },
      { Name: "Bob", Roll_No: 2, WAD_Marks: 15, CC_Marks: 18, DSBDA_Marks: 22, CNS_Marks: 19, AI_marks: 17 },
      { Name: "Charlie", Roll_No: 3, WAD_Marks: 40, CC_Marks: 42, DSBDA_Marks: 45, CNS_Marks: 38, AI_marks: 41 }
    ];

    await Student.insertMany(data);
    res.send("Initial data inserted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// 2. View all students
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});


// 3. DSBDA > 20
app.get('/dsbda-more-20', async (req, res) => {
  const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
  res.json(students);
});


// 4. Update Alice
app.get('/update/:name', async (req, res) => {
  const name = req.params.name;

  await Student.updateOne(
    { Name: name },
    { $set: { WAD_Marks: 50 } }
  );

  res.send(`Updated ${name}`);
});


// 5. All subjects > 25
app.get('/all-subjects-25', async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_marks: { $gt: 25 }
  });

  res.json(students);
});


// 6. Math & Science low (<20)
// (Assuming WAD + CC = Math/Science)
app.get('/math-sci-low', async (req, res) => {
  const students = await Student.find({
    $or: [
      { WAD_Marks: { $lt: 20 } },
      { CC_Marks: { $lt: 20 } }
    ]
  });

  res.json(students);
});


// 7. Delete Bob
app.get('/delete/:name', async (req, res) => {
  const name = req.params.name;

  await Student.deleteOne({ Name: name });

  res.send(`Deleted ${name}`);
});


// ---------------- START SERVER ----------------
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});