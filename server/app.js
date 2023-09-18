
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const { Sequelize, DataTypes } = require('sequelize'); 
require('dotenv').config();

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const authRoutes = require('./routes/authRoutes');
app.use('/',authRoutes);


sequelize.sync().then(() => {
  console.log('Connected to the database');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});