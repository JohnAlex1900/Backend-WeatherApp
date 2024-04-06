/*const express = require("express");
//const fetch = require("node-fetch");
const cors = require("cors");
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const africastalking = require('africastalking');
const app = express();
//middleware

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());



const port = 3050;

// Initialize Africa's Talking SDK with your API credentials
const apiKey = '914b4767be8b23667439df44c358871440419f20273c5685898719a66fa1c031';
const username = 'whos.kendi';
const africasTalking = africastalking({ apiKey, username });
const sms = africasTalking.SMS;

app.use(cors());

app.get('/', (req,res) => {
    res.render('index');
})
// Route to handle weather request
app.get(`/weather`, async (req, res) => {
  const location = req.query.location;
  console.log(location);
  const apiKey = "5db42d3f38360e8b56d641897e7ee3e9";
  const openWeatherMapUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(openWeatherMapUrl, {
      method: "POST",
      mode: "no-cors",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});
// Define a route to handle form submissions

app.post('/send-sms', (req, res) => {
  console.log(req.body);

  const { name, phoneNumber ,location} = req.body;

//const location = req.query.location;
  console.log(location);
  const apiKey = "5db42d3f38360e8b56d641897e7ee3e9";
  const openWeatherMapUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = /*await fetch(openWeatherMapUrl, {
      method: "POST",
      mode: "no-cors",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = /*await response.json();
    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
  // Define message parameters
  const options = {
    to: phoneNumber,
    message: `Hello ${name}, welcome to Grow Guardian!`,
  };

  // Send the message
  sms.send(options)
    .then(response => {
      console.log('Message sent successfully');
      console.log(response);
      res.status(200).json({ success: true, message: 'Message sent successfully' });
    })
    .catch(error => {
      console.error('Error sending message');
      console.error(error);
      res.status(500).json({ success: false, message: 'Error sending message' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/
//require('dotenv').config();
import express from "express";
import cors from "cors";
import ejs from 'ejs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import africastalking from 'africastalking';
import fetch from 'node-fetch';
import dotenv from 'dotenv/config'; // Directly import the config

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3050;

// Initialize Africa's Talking SDK with your API credentials
const apiKey = process.env.AFRICASTALKING_API_KEY; // Use environment variable
const username = process.env.AFRICASTALKING_USERNAME; // Use environment variable
const africasTalking = africastalking({ apiKey, username });
const sms = africasTalking.SMS;

app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle weather request
app.get('/weather', async (req, res) => {
  const location = req.query.location;
  console.log(location);
  const openWeatherMapUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

  try {
    const response = await fetch(openWeatherMapUrl, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

// Define a route to handle form submissions
app.post('/send-sms', async (req, res) => {
  const { name, phoneNumber, location } = req.body;

  const openWeatherMapUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

  try {
    const response = await fetch(openWeatherMapUrl, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData = await response.json();
    console.log(weatherData);

    // Define message parameters
    const message = `Hello ${name}, welcome to Grow Guardian! The current weather in ${location} is ${weatherData.weather[0].description} with a temperature of ${weatherData.main.temp}°C..This is the  best time to plant Peas`;
    const options = {
      to: phoneNumber,
      message: message,
    };

    // Send the message
    const smsResponse = await sms.send(options);
    console.log('Message sent successfully', smsResponse);
    res.status(200).json({ success: true, message: 'Message sent successfully', data: smsResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error occurred" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
