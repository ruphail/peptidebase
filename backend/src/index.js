const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;  // Changed to 3001

app.get('/', (req, res) => {
  res.json({ message: 'PeptideBase API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});