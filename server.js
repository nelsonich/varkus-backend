const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/db.config');

// Load Config File
dotenv.config({ path: './.env' });

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Connect to Mongo Database
db().then(() => {
  require('./routes/user.routes')(app);
  require('./routes/loan.routes')(app);

  // simple route
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to varkus application.' });
  });

  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
