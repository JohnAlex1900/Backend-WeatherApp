const express = require('express');
const africastalking = require('africastalking');

const app = express();

// Initialize Africa's Talking SDK with your API credentials
const apiKey = '914b4767be8b23667439df44c358871440419f20273c5685898719a66fa1c031';
const username = 'whos.kendi';
const africasTalking = africastalking({ apiKey, username });

// Initialize SMS service
const sms = africasTalking.SMS;

// Set up middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

/

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
