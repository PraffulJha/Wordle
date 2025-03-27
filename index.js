const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const wordsByLength = require('./words.json');

//allow all type of users  just for testing purpose
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET']
}))
// Middleware to parse query parameters
app.use(express.urlencoded({ extended: true }));

// Endpoint: GET /words?length=N
app.get('/words', (req, res) => {
  const length = parseInt(req.query.length, 10);


  if (isNaN(length) || length <= 0) {
    return res.status(400).json({ error: 'Invalid length. Must be a positive integer.' });
  }

  // Check if words of this length exist
  const words = wordsByLength[length];
  if (!words || words.length < 25) {
    return res.status(404).json({ error: 'Not enough words of the specified length.' });
  }

  // Select 25 random unique words
  const shuffled = shuffle([...words]); // Clone array to avoid mutation
  const selectedWords = shuffled.slice(0, 25);

  res.json({ words: selectedWords });
});

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});