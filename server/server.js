// Import necessary modules
const express = require('express');
const path = require('path');
const { scrapeGasPrice } = require('./Scraper');

// Create the Express app
const app = express();

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Define API routes
app.get('/api/gas-price', async (req, res) => {
  try {
    const gasPrice = await scrapeGasPrice('https://www.gasbuddy.com/home?search=45505&fuel=1&method=all&brandId=125&maxAge=0');

    const jsonData = {
      gasPrice: gasPrice,
    };

    res.json(jsonData);
  } catch (error) {
    console.error('Error fetching gas price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve the React application's static files
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve the React application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
