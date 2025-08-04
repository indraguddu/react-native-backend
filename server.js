const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // for string IDs

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [
  { id: uuidv4(), name: 'Indranil', email: 'indranil@example.com' },
  { id: uuidv4(), name: 'Rahul', email: 'rahul@example.com' }
];

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// ADD user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

  const newUser = { id: uuidv4(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// DELETE user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  users.splice(index, 1);
  res.json({ message: 'User deleted' });
});

// UPDATE user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find(u => u.id === id);

  if (!user) return res.status(404).json({ error: 'User not found' });

  if (name) user.name = name;
  if (email) user.email = email;

  res.json({ message: 'User updated', user });
});

const PORT=process.env.PORT || 3000;

//app.listen(3000, () => console.log('Server running on port 3000'));
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});

// app.listen(3000, '0.0.0.0',()=>{
//   console.log('Server running on port 3000');
// })

