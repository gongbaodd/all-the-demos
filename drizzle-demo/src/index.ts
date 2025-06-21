import express from 'express';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

const app = express();
const port = 3000;

app.use(express.json()); // For parsing application/json

app.get('/', (req, res) => {
  res.send('Hello from Dockerized Express with Drizzle and SQLite!');
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const allUsers = await db.select().from(users).all();
    res.json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Route to create a new user
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    const newUser = await db.insert(users).values({ name, email }).returning().get();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Route to get a user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    const user = await db.select().from(users).where(eq(users.id, id)).get();
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});