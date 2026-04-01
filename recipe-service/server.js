const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/recipes', require('./routes/recipeRoutes'));

app.listen(process.env.PORT, () =>
  console.log(`Recipe Service running on ${process.env.PORT}`)
);
