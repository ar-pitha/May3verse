const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (index.html)
app.use(express.static('public'));

// Age calculation endpoint
app.get('/age', (req, res) => {
  const birthDate = new Date('2003-05-03T00:00:00');
  const now = new Date();
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();
  let hours = now.getHours() - birthDate.getHours();
  let minutes = now.getMinutes() - birthDate.getMinutes();
  let seconds = now.getSeconds() - birthDate.getSeconds();

  // Adjust for negative values
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  res.json({ years, months, days, hours, minutes, seconds });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});