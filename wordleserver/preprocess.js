const fs = require('fs');

// Read raw words (format: word1\nword2\n...)
const rawWords = fs.readFileSync('raw_words.txt', 'utf-8').split('\n');
const wordsByLength = {};

rawWords.forEach(word => {
  const trimmed = word.trim().toLowerCase();
  const length = trimmed.length;
  if (!length) return;

  if (!wordsByLength[length]) {
    wordsByLength[length] = [];
  }

  // Avoid duplicates
  if (!wordsByLength[length].includes(trimmed)) {
    wordsByLength[length].push(trimmed);
  }
});

// Save as JSON
fs.writeFileSync('words.json', JSON.stringify(wordsByLength));
console.log('Processed words saved to words.json');