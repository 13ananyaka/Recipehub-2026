const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/notifications', require('./routes/notificationRoutes'));

app.listen(process.env.PORT, () =>
  console.log(`Notification Service running on ${process.env.PORT}`)
);
