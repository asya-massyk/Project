const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const gestureRoutes = require('./routes/gestureRoutes');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Опції для HTTPS (переконайтесь, що файли server.key та server.cert існують)
const options = {
  key: fs.readFileSync(path.join(__dirname, 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'server.cert'))
};

// Додано налаштування CORS для тестування, якщо це потрібно
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Підключення маршрутів
app.use(gestureRoutes);

// Створення HTTPS сервера
https.createServer(options, app).listen(port, () => {
  console.log(`HTTPS server is running on port ${port}`);
});
