const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const port = 3050;

app.use(cors());

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
